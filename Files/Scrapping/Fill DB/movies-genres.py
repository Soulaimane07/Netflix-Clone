import mysql.connector
from mysql.connector import Error

# JSON data
genre_data = [
    {"movie_id": 1, "genres_id": 2},
    {"movie_id": 1, "genres_id": 12},
    {"movie_id": 2, "genres_id": 2},
    {"movie_id": 2, "genres_id": 8},
    {"movie_id": 27, "genres_id": 2},
    {"movie_id": 27, "genres_id": 4},
    {"movie_id": 5, "genres_id": 2},
    {"movie_id": 5, "genres_id": 11},
    {"movie_id": 6, "genres_id": 2},
    {"movie_id": 6, "genres_id": 12},
    {"movie_id": 7, "genres_id": 2},
    {"movie_id": 7, "genres_id": 4},
    {"movie_id": 7, "genres_id": 5},
    {"movie_id": 7, "genres_id": 6},
    {"movie_id": 7, "genres_id": 12},
    {"movie_id": 8, "genres_id": 2},
    {"movie_id": 8, "genres_id": 5},
    {"movie_id": 8, "genres_id": 12},
    {"movie_id": 9, "genres_id": 6},
    {"movie_id": 9, "genres_id": 12},
    {"movie_id": 10, "genres_id": 6},
    {"movie_id": 11, "genres_id": 2},
    {"movie_id": 11, "genres_id": 6},
    {"movie_id": 11, "genres_id": 12},
    {"movie_id": 12, "genres_id": 5},
    {"movie_id": 12, "genres_id": 6},
    {"movie_id": 12, "genres_id": 12},
    {"movie_id": 13, "genres_id": 6},
    {"movie_id": 13, "genres_id": 9},
    {"movie_id": 13, "genres_id": 12},
    {"movie_id": 14, "genres_id": 5},
    {"movie_id": 14, "genres_id": 6},
    {"movie_id": 14, "genres_id": 9},
    {"movie_id": 14, "genres_id": 12},
    {"movie_id": 15, "genres_id": 1},
    {"movie_id": 15, "genres_id": 2},
    {"movie_id": 15, "genres_id": 7},
    {"movie_id": 18, "genres_id": 4},
    {"movie_id": 18, "genres_id": 6},
    {"movie_id": 18, "genres_id": 10},
    {"movie_id": 19, "genres_id": 1},
    {"movie_id": 19, "genres_id": 2},
    {"movie_id": 19, "genres_id": 6},
    {"movie_id": 19, "genres_id": 11},
    {"movie_id": 19, "genres_id": 12},
    {"movie_id": 20, "genres_id": 4},
    {"movie_id": 20, "genres_id": 6},
    {"movie_id": 20, "genres_id": 10},
    {"movie_id": 24, "genres_id": 6},
    {"movie_id": 24, "genres_id": 11},
    {"movie_id": 24, "genres_id": 12}
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
    INSERT INTO movies_genres (movie_id, genres_id)
    VALUES (%s, %s)
    ON DUPLICATE KEY UPDATE
    genres_id = VALUES(genres_id);
    """

    # Iterate through data and insert
    for genre in genre_data:
        cursor.execute(insert_query, (genre['movie_id'], genre['genres_id']))

    # Commit the transaction
    connection.commit()

except Error as e:
    print(f"Error: {e}")

finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
