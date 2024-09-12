import requests
from bs4 import BeautifulSoup
import mysql.connector




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
                newName = title.replace('\'', '').replace(' ', '+')
                
                # download_image(cardimage_src, f"./Hulu/cards/{newName}.jpg")

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



        bgimage_element = moviedetails.find('picture', class_="DetailEntityBackground__picture")
        bgimage_element = bgimage_element.find('source')
        bgimage_url = bgimage_element.get('srcset') if bgimage_element else None

        parts = bgimage_url.split(',')
        bgimage_url = parts[0].strip().split(' ')[0]
        
        logoimage_element = moviedetails.find('picture', class_="DetailEntityMasthead__title-art__image")
        if logoimage_element : 
            logoimage_element = logoimage_element.find('img') 
            logoimage_url = logoimage_element.get('src') if logoimage_element else None



        work = {
            "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/" + newName + ".jpg",
            "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/" + newName + ".jpg",
            "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/" + newName + ".jpg",
            "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/" + newName + ".mp4",
            "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/" + newName + ".mp4",
            "description": description[:200],
            "rating": "18+",
            "title": data["name"],
            "year": year,
            # "seasons": 0,
            "network": 7, 
            "genres": [
                
            ]
        }



        if logoimage_element:
        #  print()
        #  print(logoimage_url)
        #  print(bgimage_url)
        #  print(data['cardimage'])
        #  download_image(card, f"./Hulu/card/{newName}.jpg")
        #  download_image(bg, f"./Hulu/bg/{newName}.jpg")
        #  download_image(logo, f"./Hulu/logo/{newName}.jpg")

         insert_Data(work, newName, data['cardimage'], bgimage_url, logoimage_url)
    else:
        print(f'Failed to retrieve the webpage: {response.status_code}')









def download_image(url, save_path):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                f.write(response.content)
            print(f"Image downloaded successfully and saved at: {save_path}")
        else:
            print(f"Failed to download image. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")





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







def insert_Data(data, newName, card, bg, logo ):
    cursor, cnx = connect_to_mysqlDB()
    if cursor is None or cnx is None:
        return

    insert_stmt = """
        INSERT INTO movies (bgimage, cardimage, logoimage, trailer, video, description, rating, title, year, networkid)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    # insert_stmt = """
    #     INSERT INTO series (bgimage, cardimage, logoimage, trailer, description, rating, title, year, networkid, seasons)
    #     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    # """

    try:
        cursor.execute(insert_stmt, (
            data["bgimage"], data["cardimage"], data["logoimage"],
            data["trailer"], data["video"], data["description"],
            data["rating"], data["title"], data["year"], 
            str(data["network"])
        ))
        cnx.commit()



        print()
        print(data)
        download_image(card, f"./Hulu/card/{newName}.jpg")
        download_image(bg, f"./Hulu/bg/{newName}.jpg")
        download_image(logo, f"./Hulu/logo/{newName}.jpg")

        
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        cnx.close()






















if __name__ == "__main__":
    url = 'https://www.hulu.com/hub/adventure-movies/collections/6430'
    ScrappingData(url)
