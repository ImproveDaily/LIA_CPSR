const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createTestUser() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('lia_cpsr');
    
    // Verwijder bestaande gebruiker
    await db.collection('User').deleteOne({ username: 'testadmin' });
    
    // Hash het wachtwoord
    const password = 'test123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Maak de gebruiker aan
    const result = await db.collection('User').insertOne({
      username: 'testadmin',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Test gebruiker aangemaakt:', result);
    
    // Controleer de aangemaakte gebruiker
    const user = await db.collection('User').findOne({ username: 'testadmin' });
    console.log('Aangemaakte gebruiker:', user);
  } catch (error) {
    console.error('Fout bij aanmaken testgebruiker:', error);
  } finally {
    await client.close();
  }
}

createTestUser(); 