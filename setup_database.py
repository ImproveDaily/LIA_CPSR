from pymongo import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus
from datetime import datetime
from bson.objectid import ObjectId

# Database credentials
username = "liawow"
password = quote_plus("ucbPyQ-@G_5K8Pr")
host = "liawow.7jay4.mongodb.net"
database = "lia_cpsr"

# Bouw de connection string
db_url = f"mongodb+srv://{username}:{password}@{host}/{database}?retryWrites=true&w=majority"

try:
    # Maak verbinding met MongoDB
    client = MongoClient(
        db_url,
        server_api=ServerApi('1'),
        connectTimeoutMS=60000,
        socketTimeoutMS=60000,
        serverSelectionTimeoutMS=60000
    )
    
    # Selecteer de database
    db = client[database]
    
    # 1. Maak een test speler aan
    player_id = ObjectId()
    player = {
        "_id": player_id,
        "name": "TestSpeler",
        "playerClass": "Warrior",
        "role": "Tank",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    print("\nMaak Player collection aan...")
    result = db.Player.insert_one(player)
    print(f"Player aangemaakt met ID: {result.inserted_id}")

    # 2. Maak een test gebruiker aan
    user = {
        "_id": ObjectId(),
        "username": "testuser",
        "password": "hashedpassword123",  # In productie zou dit gehashed moeten zijn
        "role": "user",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    print("\nMaak User collection aan...")
    result = db.User.insert_one(user)
    print(f"User aangemaakt met ID: {result.inserted_id}")

    # 3. Maak een test reservering aan
    reservation = {
        "_id": ObjectId(),
        "playerId": player_id,  # Referentie naar de test speler
        "item": "Thunderfury",
        "boss": "Ragnaros",
        "date": datetime.utcnow(),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    print("\nMaak Reservation collection aan...")
    result = db.Reservation.insert_one(reservation)
    print(f"Reservation aangemaakt met ID: {result.inserted_id}")

    # 4. Maak een test punt aan
    point = {
        "_id": ObjectId(),
        "playerId": player_id,  # Referentie naar de test speler
        "amount": 100,
        "reason": "Boss kill",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    print("\nMaak Point collection aan...")
    result = db.Point.insert_one(point)
    print(f"Point aangemaakt met ID: {result.inserted_id}")

    # 5. Maak een test raid aan
    raid = {
        "_id": ObjectId(),
        "name": "Molten Core",
        "date": datetime.utcnow(),
        "killedBosses": ["Ragnaros", "Majordomo"],
        "notes": "Succesvolle raid",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    print("\nMaak Raid collection aan...")
    result = db.Raid.insert_one(raid)
    print(f"Raid aangemaakt met ID: {result.inserted_id}")

    # Toon alle collections en hun documenten
    print("\nDatabase overzicht:")
    for collection in db.list_collection_names():
        count = db[collection].count_documents({})
        print(f"{collection}: {count} documenten")

except Exception as e:
    print(f"Error: {str(e)}")
finally:
    if 'client' in locals():
        client.close()
        print("\nDatabase verbinding gesloten.") 