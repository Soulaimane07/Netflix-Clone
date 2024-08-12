import mysql.connector

# New JSON data
data = [
    {"id": 1, "bgurl": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Networks/Netflix/1687868067805.jpg", "logourl": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Networks/Netflix/1696160154845.png", "name": "Netflix", "videourl": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Networks/Netflix/1687875204094.mp4"},
    {"id": 2, "bgurl": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Networks/Disney/1687868213924.png", "logourl": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Networks/Disney/1696160619326.png", "name": "Disney", "videourl": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Networks/Disney/1687875609291.mp4"},
    {"id": 3, "bgurl": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Networks/Marvel/1266196-i-e504fc793d61.webp", "logourl": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Networks/Marvel/1696161299780.png", "name": "Marvel", "videourl": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Networks/Marvel/1687875033185.mp4"},
    {"id": 5, "bgurl": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Networks/CN/CN.webp", "logourl": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Networks/CN/CN.png", "name": "Cartoon Network", "videourl": "https://netflix-datafiles.s3.eu-west-3.amazonaws.com/Networks/CN/CN.mp4"}
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
    cursor.execute("INSERT INTO networks (id, bgurl, logourl, name, videourl) VALUES (%s, %s, %s, %s, %s)", (item['id'], item['bgurl'], item['logourl'], item['name'], item['videourl']))

# Commit changes
conn.commit()

# Close connection
cursor.close()
conn.close()
