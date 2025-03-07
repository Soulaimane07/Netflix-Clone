import requests
from bs4 import BeautifulSoup
import logging
import os
import json
import re


movies_list = []
series_list = []

def download_image(url, save_path):
    """Downloads an image from a given URL and saves it to the specified path."""
    if not url:
        print(f"Skipping download: No URL provided for {save_path}")
        return False  # Image missing, skip the show

    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Raises an error for HTTP errors (e.g., 404, 500)

        # Ensure directory exists
        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        # Save the image
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)

        # print(f"Image downloaded: {save_path}")
        return True  # Image successfully downloaded
    except requests.exceptions.RequestException as e:
        # print(f"Failed to download {url}: {e}")
        return False  # Image download failed

def save_to_json(data, filename):
    """Save scraped data to a JSON file."""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    logging.info(f"Data saved to {filename}")


def ScrappingData(url):
    """Scrapes movie and series data from Hulu and categorizes them."""
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Failed to retrieve webpage: {e}")
        return

    soup = BeautifulSoup(response.content, 'html.parser')
    movie_items = soup.find_all('div', class_='GridCollection__item')

    for item in movie_items:
        title_element = item.find('span', class_='css-1c0j34c')
        title = title_element.text.strip() if title_element else 'No Title'
        
        cardimage = item.find('img')
        cardimage_src = cardimage.get('data-src') if cardimage else None

        details_element = item.find('a')
        details_url = details_element.get('href') if details_element else None

        if not cardimage_src or "data:" in cardimage_src:
            continue  # Skip invalid image URLs
        
        # If this is a movie, scrape its details
        if details_url and "movie" in details_url:
            ScrappingDetails(title, cardimage_src, f'https://www.hulu.com{details_url}', "movies")
        elif details_url and "series" in details_url:
            # If this is a series, scrape its details
            ScrappingDetails(title, cardimage_src, f'https://www.hulu.com{details_url}', "series")


def ScrappingDetails(title, cardimage_url, url, type):
    """Scrapes detailed information about a series, including images and description."""
    print(f"\nFetching details for: {title}")

    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Failed to retrieve details page: {e}")
        return

    soup = BeautifulSoup(response.content, 'html.parser')
    movies_details = soup.find('div', class_='DetailEntityMasthead')

    if not movies_details:
        print(f"Could not find details for {title}")
        return

    # Extract description
    description_element = movies_details.find('p', class_='DetailEntityMasthead__description')
    description = description_element.text.strip() if description_element else "No description available"

    # Extract year
    year_element = soup.find('span', class_='DetailEntityMetadata__tags css-10pktn0')
    year = int(year_element.text.strip()) if year_element and year_element.text.strip().isdigit() else 0  # Convert to int if valid

    # Extract background image
    bgimage_element = movies_details.find('picture', class_="DetailEntityBackground__picture")
    if bgimage_element:
        bgimage_element = bgimage_element.find('source')
        bgimage_url = bgimage_element.get('srcset') if bgimage_element else None
        bgimage_url = bgimage_url.split(',')[0].split(' ')[0] if bgimage_url else None
    else:
        bgimage_url = None

    # Extract logo image
    logoimage_element = movies_details.find('picture', class_="DetailEntityMasthead__title-art__image")
    logoimage_url = logoimage_element.find('img').get('src') if logoimage_element and logoimage_element.find('img') else None

    # Sanitize title for filenames
    clean_name = re.sub(r'[^\w\s]', '', title).replace(' ', '_')

    # Attempt to download images
    all_downloads_success = (
        download_image(logoimage_url, f"./Hulu/{type}/logo/{clean_name}.jpg") and
        download_image(cardimage_url, f"./Hulu/{type}/card/{clean_name}.jpg") and
        download_image(bgimage_url, f"./Hulu/{type}/bg/{clean_name}.jpg")
    )

    if all_downloads_success:
        entry = {
            "title": title,
            "bgimage": f"./Hulu/{type}/bg/{clean_name}.jpg",
            "cardimage": f"./Hulu/{type}/card/{clean_name}.jpg",
            "logoimage": f"./Hulu/{type}/logo/{clean_name}.jpg",
            "description": description, 
            "rating": None, 
            "seasons": 0, 
            "trailer": f"./Hulu/{type}/trailer/{clean_name}.mp4", 
            "year": year,
            "networkid": 23, 
        }

        print(entry)

        if type == "movies":
            movies_list.append(entry)
        else:
            series_list.append(entry)
    else:
        print(f"Skipping {title} due to image download failure.\n")




if __name__ == "__main__":
    url = 'https://www.hulu.com/network/cartoon-network-84334a00-8787-41c2-8be9-e0a3922edd7c'
    ScrappingData(url)

    print("\nMovies List:", len(movies_list))
    print("\nSeries List:", len(series_list))

    save_to_json(movies_list, "./Hulu/movies/movies.json")
    save_to_json(series_list, "./Hulu/series/series.json")

