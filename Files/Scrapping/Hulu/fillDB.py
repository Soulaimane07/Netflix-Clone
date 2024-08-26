import requests
from bs4 import BeautifulSoup
import mysql.connector











def connect_to_mysqlDB():
    config = {
        'user': 'admin',
        'password': 'password1234',
        'host': 'netflix-relational.cjqo6ywc0hfl.eu-west-3.rds.amazonaws.com',
        'database': 'netflix',
        'port': 3306
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
        INSERT INTO series (bgimage, cardimage, logoimage, trailer, description, rating, title, year, networkid, seasons)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    try:
        cursor.execute(insert_stmt, (
            data["bgimage"], data["cardimage"], data["logoimage"],
            data["trailer"], data["description"],
            data["rating"], data["title"], data["year"], 
            str(data["network"]), data["seasons"]
        ))
        cnx.commit()
        print()
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
        movie_items = soup.find_all('div', class_='GridCollection__item')
        

        for movie in movie_items:
            title_element = movie.find('span', class_='css-1c0j34c')
            title = title_element.text.strip() if title_element else 'No Title'
            
            cardimage = movie.find('img', class_='Tile__image')
            cardimage_src = cardimage.get('data-src') if cardimage else None

            details_element = movie.find('a', class_='Tile__thumbnail')
            details_url = details_element.get('href') if details_element else None

            if True: 
                newName = title.replace(' ', '+')
                
                ScrappingDetails({
                    'name': title,
                    'cardimage': cardimage_src,
                }, 'https://www.hulu.com' + details_url, newName)
    else:
        print(f'Failed to retrieve the webpage: {response.status_code}')








def ScrappingDetails(data, url, newName):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        moviedetails = soup.find('div', class_='DetailEntityMasthead')
        
        description_element = moviedetails.find('span', class_="DetailEntityMasthead__description-truncated css-18868ls")
        description = description_element.get_text(strip=True) if description_element else None

        rating_element = moviedetails.find('span', class_="maturity-number")
        rating = rating_element.get_text(strip=True) if rating_element else None

        year_element = moviedetails.find('span', class_="DetailEntityMetadata__tags css-10pktn0")
        year = year_element.get_text(strip=True) if year_element else None

        work = {
            "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/series/bg/" + newName + ".jpg",
            "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/series/card/" + newName + ".jpg",
            "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/series/logo/" + newName + ".jpg",
            "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/series/trailer/" + newName + ".mp4",
            "description": description[:200],
            "rating": "18+",
            "title": data["name"],
            "year": year,
            "seasons": 0,
            "network": 7, 
            "genres": [
                
            ]
        }

        # print()
        # print(work)
        insert_Data(work)
    else:
        print(f'Failed to retrieve the webpage: {response.status_code}')








if __name__ == "__main__":
    url = 'https://www.hulu.com/hub/tv/collections/8'
    ScrappingData(url)
