from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus

password = quote_plus("ucbPyQ-@G_5K8P")
uri = f"mongodb+srv://liawow:{password}@liawow.7jay4.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    
    # Create a test document
    db = client.lia_cpsr
    result = db.players.insert_one({
        "name": "TestSpeler",
        "playerClass": "Warrior",
        "role": "Tank"
    })
    print(f"Inserted document with id: {result.inserted_id}")
    
    # Find all players
    players = list(db.players.find({}))
    print(f"Found {len(players)} players:")
    for player in players:
        print(player)
        
except Exception as e:
    print(e) 