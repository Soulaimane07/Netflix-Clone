import mysql.connector

def connect_to_mysqlDB():
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'localhost',
        'database': 'netflix'
    }
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        return cursor, cnx
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None, None

def insert_series_genres(series_ids, genre_ids):
    cursor, cnx = connect_to_mysqlDB()
    if cursor is None or cnx is None:
        return

    # Create a list of values for the INSERT statement
    values = [(series_id, genre_id) for series_id in series_ids for genre_id in genre_ids]

    # Create the SQL INSERT statement
    insert_stmt = "INSERT INTO series_genres (series_id, genres_id) VALUES (%s, %s)"
    
    try:
        cursor.executemany(insert_stmt, values)
        cnx.commit()
        print(f"Inserted {cursor.rowcount} rows into series_genres.")
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        cnx.close()

# Example series IDs (1 to 50)
series_ids = list(range(3, 54))  # List of series IDs from 1 to 50
genre_ids = [13, 14, 15]  # Genre IDs to insert

insert_series_genres(series_ids, genre_ids)
