import mysql.connector

# JSON data
data = [
    {"id": 1, "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/The+Mother.jpg", "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/The+Mother.jpg", "description": "A military-trained assassin comes out of hiding to protect the daughter she's never met from ruthless criminals gunning for revenge.", "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/The+Mother.jpg", "rating": "16+", "title": "The Mother", "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/The+Mother.mp4", "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/The+Mother.mp4", "year": 2023, "networkid": 1},
    {"id": 2, "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Under+Paris.jpg", "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Under+Paris.jpg", "description": "In order to save Paris from an international bloodbath, a grieving scientist is forced to face her tragic past when a giant shark appears in the Seine.", "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Under+Paris.jpg", "rating": "18+", "title": "Under Paris", "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Under+Paris.mp4", "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Under+Paris.mp4", "year": 2024, "networkid": 1},
    {"id": 5, "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Badland+Hunters.jpg", "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Badland+Hunters.jpg", "description": "After a deadly earthquake turns Seoul into a lawless badland, a fearless huntsman springs into action to rescue a teenager abducted by a mad doctor.", "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Badland+Hunters.jpg", "rating": "18+", "title": "Badland Hunters", "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Badland+Hunters.mp4", "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Badland+Hunters.mp4", "year": 2024, "networkid": 1},
    {"id": 6, "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Extraction+2.jpg", "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Extraction+2.jpg", "description": "Back from the brink of death, highly skilled commando Tyler Rake takes on another dangerous mission: saving the imprisoned family of a ruthless gangster.", "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Extraction+2.jpg", "rating": "18+", "title": "Extraction 2", "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Extraction+2.mp4", "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Extraction+2.mp4", "year": 2023, "networkid": 1},
    {"id": 7, "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Lift.jpg", "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Lift.jpg", "description": "A professional thief and his expert crew attempt the ultimate heist: stealing $500 million in gold from a vault on a plane — 40,000 feet in the air.", "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Lift.jpg", "rating": "16+", "title": "Lift", "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Lift.mp4", "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Lift.mp4", "year": 2024, "networkid": 1},
    {"id": 8, "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Trigger+Warning.jpg", "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Trigger+Warning.jpg", "description": "A Special Forces commando uncovers a dangerous conspiracy when she returns to her hometown looking for answers into her beloved father's death.", "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Trigger+Warning.jpg", "rating": "18+", "title": "Trigger Warning", "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Trigger+Warning.mp4", "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Trigger+Warning.mp4", "year": 2024, "networkid": 1},
    {"id": 9, "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Nowhere.jpg", "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Nowhere.jpg", "description": "Pregnant, alone and drifting in the sea, a woman trapped in a shipping container tries to survive after fleeing a devastated totalitarian country.", "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Nowhere.jpg", "rating": "16+", "title": "Nowhere", "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Nowhere.mp4", "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Nowhere.mp4", "year": 2023, "networkid": 1},
    {"id": 10, "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Vanished+into+the+Night.jpg", "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Vanished+into+the+Night.jpg", "description": "A father, immersed in a difficult divorce process, embarks on a dangerous mission when his children disappear from their isolated country house.", "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Vanished+into+the+Night.jpg", "rating": "16+", "title": "Vanished into the Night", "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Vanished+into+the+Night.mp4", "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Vanished+into+the+Night.mp4", "year": 2024, "networkid": 1},
    {"id": 11, "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/The+Abyss.jpg", "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/The+Abyss.jpg", "description": "As the Swedish town of Kiruna sinks, Frigga finds herself torn between her family and her job as security chief at the world's largest underground mine.", "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/The+Abyss.jpg", "rating": "18+", "title": "The Abyss", "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/The+Abyss.mp4", "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/The+Abyss.mp4", "year": 2024, "networkid": 1},
    {
    "id": 12,
    "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Mea+Culpa.jpg",
    "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Mea+Culpa.jpg",
    "description": "A criminal defense attorney must choose between family, duty and her own dangerous desires when she takes on the case of an artist accused of murder.",
    "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Mea+Culpa.jpg",
    "rating": "18+",
    "title": "Mea Culpa",
    "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Mea+Culpa.mp4",
    "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Mea+Culpa.mp4",
    "year": 2024,
    "networkid": 1
  },
  {
    "id": 13,
    "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Leave+the+World+Behind.jpg",
    "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Leave+the+World+Behind.jpg",
    "description": "A family's getaway to a luxurious rental home takes an ominous turn when a cyberattack knocks out their devices — and two strangers appear at their door.",
    "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Leave+the+World+Behind.jpg",
    "rating": "16+",
    "title": "Leave the World Behind",
    "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Leave+the+World+Behind.mp4",
    "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Leave+the+World+Behind.mp4",
    "year": 2023,
    "networkid": 1
  },
  {
    "id": 14,
    "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Reptile.jpg",
    "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Reptile.jpg",
    "description": "A hardened detective uncovers a complex web of deception as he digs for the truth behind the brutal murder of a young real estate agent.",
    "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Reptile.jpg",
    "rating": "16+",
    "title": "Reptile",
    "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Reptile.mp4",
    "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Reptile.mp4",
    "year": 2023,
    "networkid": 1
  },
  {
    "id": 15,
    "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Damsel.jpg",
    "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Damsel.jpg",
    "description": "A young woman's marriage to a charming prince turns into a fierce fight for survival when she's offered up as a sacrifice to a fire-breathing dragon.",
    "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Damsel.jpg",
    "rating": "13+",
    "title": "Damsel",
    "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Damsel.mp4",
    "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Damsel.mp4",
    "year": 2024,
    "networkid": 1
  },
  {
    "id": 18,
    "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/A+Family+Affair.jpg",
    "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/A+Family+Affair.jpg",
    "description": "The only thing worse than being the assistant to a high-maintenance movie star who doesn't take you seriously? Finding out he's smitten with your mom.",
    "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/A+Family+Affair.jpg",
    "rating": "16+",
    "title": "A Family Affair",
    "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/A+Family+Affair.mp4",
    "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/A+Family+Affair.mp4",
    "year": 2024,
    "networkid": 1
  },
  {
    "id": 19,
    "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Atlas.jpg",
    "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Atlas.jpg",
    "description": "A brilliant counterterrorism analyst with a deep distrust of AI discovers it might be her only hope when a mission to capture a renegade robot goes awry.",
    "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Atlas.jpg",
    "rating": "13+",
    "title": "Atlas",
    "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Atlas.mp4",
    "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Atlas.mp4",
    "year": 2024,
    "networkid": 1
  },
  {
    "id": 20,
    "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Mother+of+the+Bride.jpg",
    "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Mother+of+the+Bride.jpg",
    "description": "A doting mom jets off to a tropical island resort for her daughter's wedding — only to discover the groom's father is the ex she hasn't seen in decades.",
    "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Mother+of+the+Bride.jpg",
    "rating": "16+",
    "title": "Mother of the Bride",
    "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Mother+of+the+Bride.mp4",
    "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Mother+of+the+Bride.mp4",
    "year": 2024,
    "networkid": 1
  },
  {
    "id": 24,
    "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Locked+In.jpg",
    "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Locked+In.jpg",
    "description": "A kindly nurse tries to unlock the secrets of a coma patient's injuries — and discovers the bitter rivalry, infidelity, betrayal and murder behind them.",
    "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Locked+In.jpg",
    "rating": "16+",
    "title": "Locked In",
    "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Locked+In.mp4",
    "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Locked+In.mp4",
    "year": 2023,
    "networkid": 1
  },
  {
    "id": 27,
    "bgimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/bg/Beverly+Hills+Cop+Axel+F.jpg",
    "cardimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/card/Beverly+Hills+Cop+Axel+F.jpg",
    "description": "Forty years after his unforgettable first case in Beverly Hills, Detroit cop Axel Foley returns to do what he does best: solve crimes and cause chaos.",
    "logoimage": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/logo/Beverly+Hills+Cop+Axel+F.png",
    "rating": "18+",
    "title": "Beverly Hills Cop: Axel F",
    "trailer": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/trailer/Beverly+Hills+Cop+Axel+F.mp4",
    "video": "https://netflix-movies-series.s3.eu-west-3.amazonaws.com/movies/video/Beverly+Hills+Cop+Axel+F.mp4",
    "year": 2024,
    "networkid": 1
  }
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
