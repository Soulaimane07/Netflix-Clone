import mysql.connector
import json

def truncate(value, max_length):
    return value[:max_length] if value and len(value) > max_length else value

def save_series_to_mysql(series_list):
    """Saves series data to MySQL database."""
    connection = None  
    try:
        connection = mysql.connector.connect(
            host="localhost",
            port=3307,
            user="root",
            password="root",
            database="netflix"
        )
        cursor = connection.cursor()

        insert_query = """
        INSERT INTO series (title, bgimage, cardimage, logoimage, description, rating, seasons, trailer, year, networkid) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        for series in series_list:
            cursor.execute(insert_query, (
                series["title"], 
                series["bgimage"], 
                series["cardimage"], 
                series["logoimage"], 
                truncate(series["description"], 255),  # Ensure truncate is properly used
                series.get("rating", "N/A"),
                series.get("seasons", 0), 
                series["trailer"], 
                series.get("year", 0), 
                series["networkid"]
            ))

        connection.commit()
        print(f"{len(series_list)} series inserted successfully.")

    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

# Load JSON data
with open("./Hulu/series/series.json", "r", encoding="utf-8") as f:
    series_data = json.load(f)

save_series_to_mysql(series_data)
