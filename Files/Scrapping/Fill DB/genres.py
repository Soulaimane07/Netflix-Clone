import mysql.connector
import json

# JSON data
data = [
    {"id": 1, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/adventure.jpg", "title": "Adventure"},
    {"id": 2, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/action.jpg", "title": "Action"},
    {"id": 3, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/animation.jpg", "title": "Animation"},
    {"id": 4, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/comedy.jpg", "title": "Comedy"},
    {"id": 5, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/crime.jpg", "title": "Crime"},
    {"id": 6, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/drama.jpg", "title": "Drama"},
    {"id": 7, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/fantasy.jpg", "title": "Fantasy"},
    {"id": 8, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/horror.jpg", "title": "Horror"},
    {"id": 9, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/mystry.jpg", "title": "Mystery"},
    {"id": 11, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/scifi.jpg", "title": "Sci-fi"},
    {"id": 10, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/romance.jpg", "title": "Romance"},
    {"id": 12, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/thriller.jpg", "title": "Thriller"},
    {"id": 13, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/family.jpg", "title": "Family"},
    {"id": 14, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/kids.jpg", "title": "Kids"},
    {"id": 15, "image": "https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/genres/cartoons.jpg", "title": "Cartoons"}
]

# Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="netflix",
    port="3307"
)
cursor = conn.cursor()

# Insert data
for item in data:
    cursor.execute("INSERT INTO gendres (id, image, title) VALUES (%s, %s, %s)", (item['id'], item['image'], item['title']))

# Commit changes
conn.commit()

# Close connection
cursor.close()
conn.close()
