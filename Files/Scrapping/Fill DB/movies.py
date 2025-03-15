import mysql.connector

# JSON data
data = [
    {"id": 1, "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/The+Mother.jpg", "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/The+Mother.jpg", "description": "A military-trained assassin comes out of hiding to protect the daughter she's never met from ruthless criminals gunning for revenge.", "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/The+Mother.jpg", "rating": "16+", "title": "The Mother", "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/The+Mother.mp4", "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/The+Mother.mp4", "year": 2023, "networkid": 1},
  
]

# Database connection parameters
config = {
    'host': 'netflix-relational.cjqo6ywc0hfl.eu-west-3.rds.amazonaws.com',
    'user': 'admin',
    'password': 'password1234',
    'database': 'netflix'
}

try:
    # Connect to the database
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()

    # Insert data
    insert_query = """
    INSERT INTO movies (id, bgimage, cardimage, description, logoimage, rating, title, trailer, video, year, networkid)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ON DUPLICATE KEY UPDATE
    bgimage = VALUES(bgimage),
    cardimage = VALUES(cardimage),
    description = VALUES(description),
    logoimage = VALUES(logoimage),
    rating = VALUES(rating),
    title = VALUES(title),
    trailer = VALUES(trailer),
    video = VALUES(video),
    year = VALUES(year),
    networkid = VALUES(networkid);
    """

    # Iterate through data and insert
    for movie in data:
        cursor.execute(insert_query, (
            movie['id'], movie['bgimage'], movie['cardimage'], movie['description'], movie['logoimage'],
            movie['rating'], movie['title'], movie['trailer'], movie['video'], movie['year'], movie['networkid']
        ))

    # Commit the transaction
    connection.commit()

except Error as e:
    print(f"Error: {e}")

finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
