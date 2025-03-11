from pymongo import MongoClient

def main():
    try:
        # Database URL
        database_url = "mongodb+srv://liawow:ucbPyQ%40G5K8Pr@liawow.7jay4.mongodb.net/lia_cpsr"
        
        # Maak verbinding met MongoDB
        client = MongoClient(database_url)
        
        # Selecteer de database
        db = client.lia_cpsr
        
        # Tel het aantal reserveringen
        reservation_count = db.Reservation.count_documents({})
        print(f"Aantal reserveringen in de database: {reservation_count}")
        
        # Haal alle reserveringen op
        print("\nAlle reserveringen:")
        reservations = db.Reservation.find({})
        for reservation in reservations:
            print(reservation)
            
    except Exception as e:
        print(f"Fout bij verbinden met MongoDB: {str(e)}")

if __name__ == "__main__":
    main() 