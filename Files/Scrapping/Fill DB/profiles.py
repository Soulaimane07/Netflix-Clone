import mysql.connector

# New JSON data
data = [
    {"id": 2, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/profiles/1687812104870.png"},
    {"id": 3, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/profiles/1687812112160.png"},
    {"id": 4, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/profiles/1687812117102.png"},
    {"id": 5, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/profiles/1687812130148.png"},
    {"id": 6, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/profiles/1687812135219.png"},
    {"id": 7, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/profiles/1687812143263.png"},
    {"id": 8, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/profiles/1687812148608.png"},
    {"id": 9, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/profiles/1687812154100.png"},
    {"id": 10, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/profiles/1687812159934.png"},
    {"id": 11, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/profiles/1687812164933.png"},
    {"id": 12, "image": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/profiles/1687812170747.png"}
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
    cursor.execute("INSERT INTO profiles (id, image) VALUES (%s, %s)", (item['id'], item['image']))

# Commit changes
conn.commit()

# Close connection
cursor.close()
conn.close()
