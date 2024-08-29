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

            details_element = work.find('a')
            details_url = details_element.get('href') if details_element else None

            # if "data:" in cardimage_src:
            #     continue 
            
            # print({name, profile_src, details_url})
            ScrappingDetails(name, profile_src, 'https://www.themoviedb.org' + details_url)
    else:
        print(f'Failed to retrieve the webpage: {response.status_code}')



def ScrappingDetails(name, profile, details):
    response = requests.get(details)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        actordetails = soup.find('div', class_='content_wrapper')
        facts = actordetails.find('section', class_="facts")
        factss = facts.find('p', class_="full")
        description = factss.get_text(strip=True) if factss else None
        
        # gendre = actordetails.find('div', class_="title-info-synopsis")
        # description = description_element.get_text(strip=True) if description_element else None

        # rating = rating_element.get_text(strip=True) if rating_element else None

        # year_element = actordetails.find('span', class_="item-year")
        # year = year_element.get_text(strip=True) if year_element else None
        
        # birth = actordetails.find('span', class_="test_dur_str")
        # season = season_element.get_text(strip=True) if season_element else None

        # download_image(profile, f"./Actors/profiles/{name}.jpg")
        # print(facts)
        print(description)
        

        # actor = {
        #     "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/actors/" + name + ".jpg",
        #     "name": name,
        #     "birthdate": year,
        #     "biography": season,
        #     "genre": gendre
        # }

        # insert_Data(work)
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



if __name__ == "__main__":
    for i in range(100):
        url = f'https://www.themoviedb.org/person?page={i}'
        ScrappingData(url)