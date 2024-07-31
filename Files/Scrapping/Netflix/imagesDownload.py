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
        
        movie_items = soup.find_all('li', class_='nm-content-horizontal-row-item')
        
        movies_data = []
        
        for movie in movie_items:
            title_element = movie.find('span', class_='nm-collections-title-name')
            title = title_element.text.strip() if title_element else 'No Title'
            
            image_element = movie.find('img')
            image_url = image_element.get('src') if image_element else None

            details_element = movie.find('a')
            details_url = details_element.get('href') if details_element else None
            
            if "data:" in image_url:
                continue  # Skip movies with invalid image URLs
            else:
                movies_data.append({
                    'title': title,
                    'image_url': image_url,
                    'details_url': details_url  # Add details_url to the dictionary
                })

        
        
                ScrappingDetails(title, details_url)
                download_image(image_url, f"./card/{title}.jpg")

    else:
        print(f'Failed to retrieve the webpage: {response.status_code}')

def ScrappingDetails(title, url):
    print()
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        moviedetails = soup.find('div', class_='hero-container')
        
        bgimage_element = moviedetails.find('picture')
        bgimage_element = bgimage_element.find('source')
        bgimage_url = bgimage_element.get('srcset') if bgimage_element else None
        download_image(bgimage_url, f"./bg/{title}.jpg")

        logoimage_element = moviedetails.find('img', class_="logo")
        logoimage_url = logoimage_element.get('src') if logoimage_element else None

        download_image(logoimage_url, f"./logo/{title}.jpg")
    else:
        print(f'Failed to retrieve the webpage: {response.status_code}')

if __name__ == "__main__":
    url = 'https://www.netflix.com/ma-en/browse/genre/839338' 
    ScrappingData(url)