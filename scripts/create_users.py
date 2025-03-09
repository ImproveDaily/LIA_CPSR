from pymongo import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus
from datetime import datetime
from bson.objectid import ObjectId
import bcrypt

# Database credentials
username = "liawow"
password = quote_plus("ucbPyQ-@G_5K8Pr")
host = "liawow.7jay4.mongodb.net"
database = "lia_cpsr"

# Bouw de connection string
db_url = f"mongodb+srv://{username}:{password}@{host}/{database}?retryWrites=true&w=majority"

def create_user(db, username, password, role="user"):
    # Check of gebruiker al bestaat
    if db.User.find_one({"username": username}):
        print(f"Gebruiker {username} bestaat al!")
        return None
    
    # Hash het wachtwoord
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    
    user = {
        "_id": ObjectId(),
        "username": username,
        "password": hashed,
        "role": role,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    result = db.User.insert_one(user)
    return result.inserted_id

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
    
    # Maak een admin gebruiker aan
    admin_id = create_user(db, "admin", "Admin123!", "admin")
    if admin_id:
        print(f"Admin gebruiker aangemaakt met ID: {admin_id}")
    
    # Maak een normale gebruiker aan
    user_id = create_user(db, "gebruiker", "Gebruiker123!")
    if user_id:
        print(f"Normale gebruiker aangemaakt met ID: {user_id}")
    
    # Toon alle gebruikers (zonder wachtwoorden)
    print("\nAangemaakte gebruikers:")
    users = db.User.find({}, {"password": 0})
    for user in users:
        print(f"Username: {user['username']}, Role: {user['role']}")

except Exception as e:
    print(f"Error: {str(e)}")
finally:
    if 'client' in locals():
        client.close()
        print("\nDatabase verbinding gesloten.") 