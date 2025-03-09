const { MongoClient } = require('mongodb');

async function checkUsers() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('lia_cpsr');
    
    const users = await db.collection('User').find().toArray();
    console.log('Gebruikers in database:', users);
  } catch (error) {
    console.error('Fout bij ophalen gebruikers:', error);
  } finally {
    await client.close();
  }
}

checkUsers(); 