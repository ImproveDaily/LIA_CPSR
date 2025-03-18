// Een eenvoudig script om de database-verbinding te testen
import { PrismaClient } from '@prisma/client';

async function testConnection() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  
  try {
    console.log('Poging om verbinding te maken met de database...');
    console.log('Database URL (deels verborgen voor veiligheid):', 
      process.env.DATABASE_URL?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    // Als we het User model willen testen:
    try {
      console.log('Proberen gebruikers op te halen...');
      const users = await prisma.user.findMany({ take: 1 });
      console.log('Gebruikers query succesvol!');
      console.log(`Aantal gebruikers gevonden: ${users.length}`);
      if (users.length > 0) {
        console.log('Eerste gebruiker (zonder wachtwoord):', {
          id: users[0].id,
          username: users[0].username,
          role: users[0].role
        });
      }
    } catch (err) {
      console.error('Fout bij ophalen gebruikers:', err);
    }
    
  } catch (error) {
    console.error('Kon geen verbinding maken met de database:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 