import requests
from bs4 import BeautifulSoup
import requests
import os

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

def ScrappingData(url):
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        movie_items = soup.find_all('div', class_='GridCollection__item')
        
        movies_data = []
        
        for movie in movie_items:
            title_element = movie.find('span', class_='css-1c0j34c')
            title = title_element.text.strip() if title_element else 'No Title'
            
            cardimage = movie.find('img')
            cardimage_src = cardimage.get('data-src') if cardimage else None

            details_element = movie.find('a')
            details_url = details_element.get('href') if details_element else None
            
            if "data:" in cardimage_src:
                continue  # Skip movies with invalid image URLs
            else:
                movies_data.append({
                    'title': title,
                    'cardimage_url': cardimage_src,
                    'details_url': details_url  # Add details_url to the dictionary
                })
        
                if "series" in details_url: 
                    # download_image(cardimage_src, f"./Hulu/card/{title}.jpg")
                    ScrappingDetails(title, 'https://www.hulu.com' + details_url)

    else:
        print(f'Failed to retrieve the webpage: {response.status_code}')

def ScrappingDetails(title, url):
    print()
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        moviedetails = soup.find('div', class_='DetailEntityMasthead cu-masthead DetailEntityMasthead--with-ribbon')
        
        bgimage_element = moviedetails.find('picture', class_="DetailEntityBackground__picture")
        bgimage_element = bgimage_element.find('source')
        bgimage_url = bgimage_element.get('srcset') if bgimage_element else None

        parts = bgimage_url.split(',')
        first_part = parts[0].strip().split(' ')[0]
        # download_image(first_part, f"./Hulu/bg/{title}.jpg")
        
        logoimage_element = moviedetails.find('picture', class_="DetailEntityMasthead__title-art__image")
        if logoimage_element : 
            logoimage_element = logoimage_element.find('img')
            logoimage_url = logoimage_element.get('src') if logoimage_element else None
            print(logoimage_url)
            download_image(logoimage_url, f"./Hulu/logo/{title}.jpg")
            print()
    else:
        print(f'Failed to retrieve the webpage: {response.status_code}')

if __name__ == "__main__":
    url = 'https://www.hulu.com/network/cartoon-network-84334a00-8787-41c2-8be9-e0a3922edd7c'
    ScrappingData(url)