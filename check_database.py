from pymongo import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus

# Database credentials
username = "liawow"
password = quote_plus("ucbPyQ-@G_5K8Pr")  # URL encode het wachtwoord
host = "liawow.7jay4.mongodb.net"
database = "lia_cpsr"

# Bouw de connection string
db_url = f"mongodb+srv://{username}:{password}@{host}/{database}?retryWrites=true&w=majority"

try:
    # Maak verbinding met MongoDB met de aanbevolen instellingen voor Atlas
    client = MongoClient(
        db_url,
        server_api=ServerApi('1'),  # Gebruik de stabiele API v1
        connectTimeoutMS=60000,     # 60 seconden timeout
        socketTimeoutMS=60000,      # 60 seconden socket timeout
        serverSelectionTimeoutMS=60000  # 60 seconden server selectie timeout
    )
    
    # Test de verbinding
    client.admin.command('ping')
    print("\nVerbinding succesvol!")

    # Selecteer de database
    db = client[database]
    print(f"\nVerbonden met database: {database}")

    # Toon alle collections
    print("\nBeschikbare collections:")
    collections = db.list_collection_names()
    for collection in collections:
        print(f"- {collection}")

    # Voor elke collection, toon een voorbeeld document
    print("\nVoorbeeld documenten:")
    for collection in collections:
        doc = db[collection].find_one()
        if doc:
            print(f"\n{collection}:")
            for key, value in doc.items():
                print(f"  {key}: {type(value).__name__}")
        else:
            print(f"\n{collection}: Geen documenten gevonden")

    # Toon aantal documenten per collection
    print("\nAantal documenten per collection:")
    for collection in collections:
        count = db[collection].count_documents({})
        print(f"- {collection}: {count} documenten")

except Exception as e:
    print(f"Error: {str(e)}")
finally:
    # Sluit de verbinding netjes af
    if 'client' in locals():
        client.close() 