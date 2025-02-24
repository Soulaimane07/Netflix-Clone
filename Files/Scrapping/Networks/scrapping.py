import os
import requests
import json
import mysql.connector
from bs4 import BeautifulSoup

# Function to download an image and check if the download was successful
def download_image(image_url, network_name):
    try:
        # Send a GET request to download the image
        img_response = requests.get(image_url, headers=headers)

        # Ensure the image was fetched successfully
        if img_response.status_code == 200:
            # Create a directory to store the images
            os.makedirs("./Networks/images", exist_ok=True)
            # Define the image path (you can customize the naming)
            image_path = os.path.join("./Networks/images", f"{network_name}.jpg")

            # Write the image content to the file
            with open(image_path, "wb") as file:
                file.write(img_response.content)
            print(f"Image for {network_name} downloaded successfully!")
            return image_path  # Return the image path if downloaded successfully
        else:
            print(f"Failed to download image for {network_name}")
            return None  # Return None if download failed
    except Exception as e:
        print(f"Error downloading image for {network_name}: {e}")
        return None

# Function to save data to MySQL
def save_data_to_mysql(networks):
    connection = None  # Initialize connection variable to handle exceptions properly
    try:
        # Connect to the MySQL database
        connection = mysql.connector.connect(
            host="localhost",  # Use localhost
            port=3307,         # Specify the correct port number
            user="root",       # Your MySQL username
            password="root",   # Your MySQL password
            database="netflix" # Your MySQL database name
        )

        cursor = connection.cursor()

        # Prepare SQL query to insert network data
        insert_query = """
        INSERT INTO networks (name, bgurl, logourl, videourl) 
        VALUES (%s, %s, %s, %s)
        """

        # Insert each network's data into the database
        for network in networks:
            cursor.execute(insert_query, (
                network['name'], 
                network['bgurl'], 
                network['logourl'], 
                network['videourl']
            ))

        # Commit the transaction
        connection.commit()

        print("Data successfully inserted into MySQL.")

    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        # Close the connection
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

# Define the target URL
url = "https://www.hulu.com/hub/networks"

# Set headers to mimic a browser request
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

# Send a GET request
response = requests.get(url, headers=headers)

# Check if the request was successful
if response.status_code == 200:
    soup = BeautifulSoup(response.text, "html.parser")

    # Find all network tiles
    network_tiles = soup.find_all("div", class_="Tile cu-tile")

    # Extract network names, URLs, and images
    networks = []
    for tile in network_tiles:
        name_tag = tile.find("span", class_="css-1c0j34c")
        link_tag = tile.find("a", class_="Tile__thumbnail")
        img_tag = tile.find("img", class_="Tile__image")

        if name_tag and link_tag:
            network_name = name_tag.text.strip()
            network_url = "https://www.hulu.com" + link_tag["href"]

            # Normalize the network name (replace spaces with underscores)
            normalized_name = network_name.replace(" ", "_")

            # Check if the image exists and try 'data-src' if 'src' is missing
            if img_tag:
                network_image_url = img_tag.get("src") or img_tag.get("data-src")
            else:
                network_image_url = None

            # Skip duplicates based on network name
            if any(network['name'] == network_name for network in networks):
                print(f"Duplicate found for {network_name}, skipping entry.")
                continue

            # Download the image and check if it was successful
            if network_image_url:
                image_path = download_image(network_image_url, normalized_name)
                if image_path:
                    networks.append({
                        "name": network_name,
                        "bgurl": f"https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/networks/bg/{normalized_name}.jpg",
                        "logourl": f"https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/networks/logo/{normalized_name}.jpg",
                        "videourl": f"https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/networks/videos/{normalized_name}.jpg"
                    })
                else:
                    print(f"Image for {network_name} not downloaded, skipping entry.")
            else:
                print(f"No image available for {network_name}")

    # Save the networks data to MySQL
    if networks:
        save_data_to_mysql(networks)

    # Print the results
    for network in networks:
        print(f"Name: {network['name']}")
        print(f"Image: {network['bgurl']}")
        print("-" * 40)

else:
    print(f"Failed to retrieve the page, status code: {response.status_code}")
