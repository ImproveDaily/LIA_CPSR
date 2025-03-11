const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Verbonden met MongoDB');

        const db = client.db('test');
        const collection = db.collection('User');

        // Verwijder de bestaande testadmin gebruiker
        await collection.deleteOne({ username: 'testadmin' });

        // Maak een nieuwe testadmin gebruiker aan zonder wachtwoord
        const result = await collection.insertOne({
            username: 'testadmin',
            password: '', // Leeg wachtwoord
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('Testadmin gebruiker aangepast:', result);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

main(); 