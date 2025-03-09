from pymongo import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus

# Database credentials
username = "liawow"
password = quote_plus("ucbPyQ-@G_5K8Pr")
host = "liawow.7jay4.mongodb.net"
database = "lia_cpsr"

# Bouw de connection string
uri = f"mongodb+srv://{username}:{password}@{host}/?retryWrites=true&w=majority"

try:
    # Maak verbinding met MongoDB met de nieuwe server API
    client = MongoClient(
        uri,
        server_api=ServerApi('1'),
        serverSelectionTimeoutMS=5000
    )
    
    # Stuur een ping om de verbinding te bevestigen
    client.admin.command('ping')
    print("\nVerbinding succesvol!")
    
    # Selecteer de database
    db = client[database]
    print(f"\nVerbonden met database: {database}")
    
    # Toon beschikbare collections
    print("\nBeschikbare collections:")
    collections = db.list_collection_names()
    for collection in collections:
        print(f"- {collection}")
    
    # Toon een voorbeeld document uit elke collection
    print("\nVoorbeeld documenten:")
    for collection in collections:
        print(f"\n{collection}:")
        doc = db[collection].find_one()
        if doc:
            # Print alleen de veldnamen en hun types
            for key, value in doc.items():
                print(f"  {key}: {type(value).__name__}")
    
    # Toon aantal documenten per collection
    print("\nAantal documenten per collection:")
    for collection in collections:
        count = db[collection].count_documents({})
        print(f"- {collection}: {count} documenten")

except Exception as e:
    print(f"Error: {str(e)}")
finally:
    if 'client' in locals():
        client.close()
        print("\nDatabase verbinding gesloten.") 