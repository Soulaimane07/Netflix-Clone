import mysql.connector
from mysql.connector import Error

# JSON data
genre_data = [
    {"movie_id": 30, "genres_id": 2},
    {"movie_id": 30, "genres_id": 4},

    {"movie_id": 29, "genres_id": 2},
    {"movie_id": 29, "genres_id": 4},
    {"movie_id": 29, "genres_id": 12},

    {"movie_id": 28, "genres_id": 4},
    {"movie_id": 28, "genres_id": 10},

    {"movie_id": 27, "genres_id": 4},
    {"movie_id": 27, "genres_id": 2},
    {"movie_id": 27, "genres_id": 5},
    {"movie_id": 27, "genres_id": 6},
    {"movie_id": 27, "genres_id": 12},

    {"movie_id": 26, "genres_id": 4},
    {"movie_id": 26, "genres_id": 10},
    
    {"movie_id": 25, "genres_id": 2},
    {"movie_id": 25, "genres_id": 4},
    {"movie_id": 25, "genres_id": 10},

    {"movie_id": 24, "genres_id": 4},
    {"movie_id": 24, "genres_id": 10},

    {"movie_id": 23, "genres_id": 4},
    {"movie_id": 23, "genres_id": 2},
    {"movie_id": 23, "genres_id": 12},

    {"movie_id": 22, "genres_id": 2},
    {"movie_id": 22, "genres_id": 5},
    {"movie_id": 22, "genres_id": 6},
    {"movie_id": 22, "genres_id": 12},

    {"movie_id": 21, "genres_id": 7},
    {"movie_id": 21, "genres_id": 2},
    {"movie_id": 21, "genres_id": 1},

    {"movie_id": 20, "genres_id": 2},
    {"movie_id": 20, "genres_id": 5},
    {"movie_id": 20, "genres_id": 6},
    {"movie_id": 20, "genres_id": 9},
    {"movie_id": 20, "genres_id": 12},

    {"movie_id": 19, "genres_id": 2},
    {"movie_id": 19, "genres_id": 4}
]



try:
    # Connect to the database
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="netflix",
        port="3307"
    )
    cursor = conn.cursor()

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
    conn.commit()

except Error as e:
    print(f"Error: {e}")

finally:
    if conn.is_connected():
        cursor.close()
        conn.close()
