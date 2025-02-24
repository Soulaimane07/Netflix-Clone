import requests
from bs4 import BeautifulSoup
import re
import logging
import os
import json

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Use a session for optimized requests
session = requests.Session()

import mysql.connector

def insert_data_to_mysql(work, category):
    """Insert movie or series data into MySQL"""
    try:
        # Establish the connection to the MySQL database
        connection = mysql.connector.connect(
            host="localhost",  # Use localhost
            port=3307,         # Specify the correct port number
            user="root",       # Your MySQL username
            password="root",   # Your MySQL password
            database="netflix" # Your MySQL database name
        )

        cursor = connection.cursor()

        if category == 'movie':
            query = """
                INSERT INTO movies (title, description, rating, year, bgimage, cardimage, logoimage, trailer, video, networkid)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                work['title'],
                work['description'],
                work['rating'],
                work['year'],
                work['bg_image'],
                work['card_image'],
                work['logo_image'],
                work['trailer'],
                work['video'],
                work['networkid']
            )
        elif category == 'series':
            query = """
                INSERT INTO series (title, description, rating, year, seasons, bgimage, cardimage, logoimage, trailer, networkid)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                work['title'],
                work['description'],
                work['rating'],
                work['year'],
                work['seasons'],
                work['bg_image'],
                work['card_image'],
                work['logo_image'],
                work['trailer'],
                work['networkid']
            )

        # Execute the query
        cursor.execute(query, values)

        # Commit the transaction
        connection.commit()
        logging.info(f"Inserted {category}: {work['title']} into the database.")

    except mysql.connector.Error as err:
        logging.error(f"Error inserting {category} data into MySQL: {err}")
    finally:
        # Close the connection
        cursor.close()
        connection.close()



def scrape_data(url):
    """Scrape movie and series data from Netflix"""
    try:
        response = session.get(url, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        logging.error(f"Failed to retrieve the webpage: {e}")
        return
    
    soup = BeautifulSoup(response.content, 'lxml')
    work_items = soup.find_all('li', class_='nm-content-horizontal-row-item')
    
    movies = []
    series = []
    
    for work in work_items:
        title_element = work.find('span', class_='nm-collections-title-name')
        title = title_element.text.strip() if title_element else 'No Title'
        
        card_image = work.find('img')
        card_image_src = card_image.get('src') if card_image else None
        
        details_element = work.find('a')
        details_url = details_element.get('href') if details_element else None
        
        if not card_image_src or "data:" in card_image_src:
            continue  # Skip placeholders
        
        clean_name = re.sub(r'[^\w\s]', '', title).replace(' ', '_')
        work_data = scrape_details({
            'name': title,
            'card_image': card_image_src,
        }, details_url, clean_name)
        
        if work_data:
            if work_data["category"] == "movie":
                movies.append(work_data)
            else:
                series.append(work_data)
    
    save_to_json(movies, "./Netflix/movie/movie.json")
    save_to_json(series, "./Netflix/series/series.json")


def scrape_details(data, url, clean_name):
    """Scrape details of a specific movie or series"""
    try:
        response = session.get(url, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        logging.error(f"Failed to retrieve details page: {e}")
        return None
    
    soup = BeautifulSoup(response.content, 'lxml')
    details_section = soup.find('div', class_='hero-container')
    
    if not details_section:
        logging.warning("Details section not found.")
        return None
    
    description = details_section.find('div', class_='title-info-synopsis')
    rating = details_section.find('span', class_='maturity-number')
    year = details_section.find('span', class_='item-year')
    season = details_section.find('span', class_='test_dur_str')
    
    bg_image = details_section.find('picture')
    bg_image_url = bg_image.find('source').get('srcset') if bg_image else None
    
    logo_image = details_section.find('img', class_='logo')
    logo_image_url = logo_image.get('src') if logo_image else None
    
    category = "movie" if not season else "series"
    
    # Clean and convert the season value to an integer
    seasons = 0  # Default to 0 if no seasons info is found
    if season:
        season_text = season.get_text(strip=True)
        # Extract numbers from the string
        seasons = int(re.sub(r'\D', '', season_text)) if season_text else 0
    
    work = {
        "title": data["name"],
        "description": description.get_text(strip=True) if description else None,
        "rating": rating.get_text(strip=True) if rating else None,
        "year": int(year.get_text(strip=True)) if year else None,
        "seasons": seasons,  # Ensure seasons is an integer
        "category": category,
        "bg_image": f"https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/{category}/bg/{clean_name}.jpg",
        "card_image": f"https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/{category}/card/{clean_name}.jpg",
        "logo_image": f"https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/{category}/logo/{clean_name}.jpg",
        "networkid": 58,
        "trailer": f"https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/{category}/trailer/{clean_name}.jpg",
        "video": f"https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/{category}/video/{clean_name}.jpg"
    }
    
    logging.info(f"Scraped {category}: {work['title']}")
    
    # Download images
    # download_image(data["card_image"], f"./Netflix/{category}/card/{clean_name}.jpg")
    # download_image(bg_image_url, f"./Netflix/{category}/bg/{clean_name}.jpg")
    # download_image(logo_image_url, f"./Netflix/{category}/logo/{clean_name}.jpg")

    # Insert data into MySQL
    insert_data_to_mysql(work, category)  # Inserting movie/series into MySQL
    print()
    return work


def download_image(url, save_path):
    """Download an image and save it locally."""
    if not url:
        logging.warning(f"No URL provided for {save_path}")
        return
    
    try:
        response = session.get(url, timeout=10)
        response.raise_for_status()
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        with open(save_path, 'wb') as f:
            f.write(response.content)
        logging.info(f"Downloaded image: {save_path}")
    except requests.RequestException as e:
        logging.error(f"Failed to download {url}: {e}")


def save_to_json(data, filename):
    """Save scraped data to a JSON file."""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    logging.info(f"Data saved to {filename}")


if __name__ == "__main__":
    netflix_url = 'https://www.netflix.com/ma-en/browse/genre/839338'
    scrape_data(netflix_url)
