import mysql.connector
import json

# JSON data
data = [
    {"id": 1, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/1687804354562.webp", "title": "Adventure"},
    {"id": 2, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/wp9655792.jpg", "title": "Action"},
    {"id": 3, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/animation-movies-1197-x-704-wallpaper-nlgddr8e66de5g41.jpg", "title": "Animation"},
    {"id": 4, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/d8e63160f5e22347-1200x675.jpg", "title": "Comedy"},
    {"id": 5, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/crime.png", "title": "Crime"},
    {"id": 6, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/drama.jpg", "title": "Drama"},
    {"id": 7, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/fantasy.jpg", "title": "Fantasy"},
    {"id": 8, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/horror.jpg", "title": "Horror"},
    {"id": 9, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/mystry.jpg", "title": "Mystery"},
    {"id": 10, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/romance.jpg", "title": "Romance"},
    {"id": 11, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/scifi.png", "title": "Sci-fi"},
    {"id": 12, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/thriller.jpg", "title": "Thriller"},
    {"id": 13, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/thriller.jpg", "title": "Family"},
    {"id": 14, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/thriller.jpg", "title": "Kids"},
    {"id": 15, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Gendres/thriller.jpg", "title": "Cartoons"}
]

# Database connection
conn = mysql.connector.connect(
    host="netflix-relational.cjqo6ywc0hfl.eu-west-3.rds.amazonaws.com",
    user="admin",
    password="password1234",
    database="netflix"
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
