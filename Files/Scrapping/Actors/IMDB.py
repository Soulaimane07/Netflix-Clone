import requests
from bs4 import BeautifulSoup
import mysql.connector
import re





def ScrappingData(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        actors_items = soup.find_all('div', class_='results_profile_card')
        
        for work in actors_items:
            box = work.find('p', class_='name')
            name_element = box.find('a')
            name = name_element.text.strip() if name_element else 'No Title'
            
            profile = work.find('img')
            profile_src = profile.get('src') if profile else None

            details_element = work.find('a', class_="result")
            details_url = details_element.get('href') if details_element else None

            ScrappingDetails(name, profile_src, 'https://www.themoviedb.org' + details_url)
    else:
        print(f'Failed to retrieve the webpage: {response.status_code}')



def ScrappingDetails(name, profile, details):
    response = requests.get(details)
    if response.status_code == 200:
        insert_Data(name, profile)
    else:
        print(f'Failed to retrieve the webpage: {response.status_code}')






def insert_Data(name, profile):
    def connect_to_mysqlDB():
        config = {
            'user': 'admin',
            'password': 'password1234',
            'host': 'netflix-relational.cjqo6ywc0hfl.eu-west-3.rds.amazonaws.com',
            'database': 'netflix'
        }
        try:
            cnx = mysql.connector.connect(**config)
            cursor = cnx.cursor()
            return cursor, cnx
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            return None, None
    

    cursor, cnx = connect_to_mysqlDB()
    if cursor is None or cnx is None:
        return

    insert_stmt = """
        INSERT INTO actors (name, image)
        VALUES (%s, %s)
    """

    try:
        cursor.execute(insert_stmt, (
            name, f'https://netflix-datafiles.s3.eu-west-3.amazonaws.com/actors/{name.replace(' ', '+')}.jpg'
        ))
        cnx.commit()
        print(name, profile)
        download_image(profile, f"./Actors/profiles/{name}.jpg")
        print()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        cnx.close()



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



if __name__ == "__main__":
    for i in range(100):
        url = f'https://www.themoviedb.org/person?page={i}'
        ScrappingData(url)