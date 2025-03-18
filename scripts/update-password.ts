import { PrismaClient } from '@prisma/client';
import { Buffer } from 'buffer';

const prisma = new PrismaClient();

async function updatePassword() {
  try {
    // Haal alle gebruikers op
    const users = await prisma.user.findMany();
    
    for (const user of users) {
      // Converteer het wachtwoord naar een Buffer en dan terug naar een string
      const passwordBuffer = Buffer.from(user.password as string);
      const passwordString = passwordBuffer.toString('utf-8');
      
      // Update de gebruiker met het nieuwe wachtwoord
      await prisma.user.update({
        where: { id: user.id },
        data: { password: passwordString }
      });
      
      console.log(`Wachtwoord bijgewerkt voor gebruiker: ${user.username}`);
    }
    
    console.log('Alle wachtwoorden zijn bijgewerkt');
  } catch (error) {
    console.error('Fout bij het bijwerken van wachtwoorden:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePassword(); 