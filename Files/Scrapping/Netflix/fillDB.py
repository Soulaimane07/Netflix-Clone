import requests
from bs4 import BeautifulSoup
import mysql.connector

def connect_to_mysqlDB():
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'localhost',
        'database': 'netflix'
    }
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        return cursor, cnx
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None, None

def insert_Data(data):
    cursor, cnx = connect_to_mysqlDB()
    if cursor is None or cnx is None:
        return

    insert_stmt = """
        INSERT INTO movies (bgimage, cardimage, logoimage, trailer, video, description, rating, title, year)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    try:
        cursor.execute(insert_stmt, (
            data["bgimage"], data["cardimage"], data["logoimage"],
            data["trailer"], data["video"], data["description"],
            data["rating"], data["title"], data["year"]
        ))
        cnx.commit()
        print(data)
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        cnx.close()

def ScrappingData(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        movie_items = soup.find_all('li', class_='nm-content-horizontal-row-item')
        for movie in movie_items:
            title_element = movie.find('span', class_='nm-collections-title-name')
            title = title_element.text.strip() if title_element else 'No Title'
            
            cardimage = movie.find('img')
            cardimage_src = cardimage.get('src') if cardimage else None

            details_element = movie.find('a')
            details_url = details_element.get('href') if details_element else None

            if "data:" in cardimage_src:
                continue 
            
            newName = title.replace(' ', '+')
            ScrappingDetails({
                'name': title,
                'cardimage': cardimage_src,
            }, details_url, newName)
    else:
        print(f'Failed to retrieve the webpage: {response.status_code}')

def ScrappingDetails(data, url, newName):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        moviedetails = soup.find('div', class_='hero-container')
        
        description_element = moviedetails.find('div', class_="title-info-synopsis")
        description = description_element.get_text(strip=True) if description_element else None

        rating_element = moviedetails.find('span', class_="maturity-number")
        rating = rating_element.get_text(strip=True) if rating_element else None

        year_element = moviedetails.find('span', class_="item-year")
        year = year_element.get_text(strip=True) if year_element else None
        
        season_element = moviedetails.find('span', class_="test_dur_str")
        season = season_element.get_text(strip=True) if season_element else None

        

        work = {
            "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/" + newName + ".jpg",
            "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/" + newName + ".jpg",
            "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/" + newName + ".jpg",
            "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/" + newName + ".mp4",
            "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/" + newName + ".mp4",
            "description": description,
            "rating": rating,
            "title": data["name"],
            "year": year,
            "season": season
        }

        if season == None :
            insert_Data(work)
    else:
        print(f'Failed to retrieve the webpage: {response.status_code}')

if __name__ == "__main__":
    url = 'https://www.netflix.com/ma-en/browse/genre/839338'
    ScrappingData(url)
