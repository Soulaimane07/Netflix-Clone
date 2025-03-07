import mysql.connector

# Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="netflix",
    port="3307"
)
cursor = conn.cursor()

# Genre data
genre_data = [
    (100, 6), (100, 12), (100, 9), (100, 2),
    (101, 6), (101, 5), (101, 1), (101, 2),
    (102, 5), (102, 6), (102, 1), (102, 2),
    (103, 2), (103, 1), (103, 6),
    (104, 1), (104, 2), (104, 6), (104, 10),
    (105, 2), (105, 5), (105, 6), (105, 9),
    (106, 1), (106, 2), (106, 6), (106, 12),
    (107, 6), (107, 8), (107, 11), (107, 12),
    (108, 7), (108, 8), (108, 11), (108, 6),
    (109, 12), (109, 6),
]

# Insert statement
insert_genre_query = """
INSERT INTO series_genres (series_id, genres_id) VALUES (%s, %s)
"""

# Insert data
cursor.executemany(insert_genre_query, genre_data)
conn.commit()

print(f"Inserted {cursor.rowcount} rows into genres table.")

# Close the connection
cursor.close()
conn.close()
