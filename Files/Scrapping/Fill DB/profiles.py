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

# Prepare profile data (IDs 1 to 133)
data = [(i, f"https://streaming-movies-datafiles.s3.us-east-1.amazonaws.com/profiles/{i}.png") for i in range(1, 134)]

# Insert data using executemany (efficient batch insert)
cursor.executemany("INSERT INTO profiles (id, image) VALUES (%s, %s)", data)

# Commit changes
conn.commit()

# Close connection
cursor.close()
conn.close()

print("Profiles inserted successfully!")
