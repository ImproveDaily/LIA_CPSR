import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupDuplicateUsers() {
  try {
    // Haal alle gebruikers op
    const users = await prisma.user.findMany();
    
    // Groepeer gebruikers op gebruikersnaam
    const usersByUsername = new Map<string, typeof users>();
    users.forEach(user => {
      const existing = usersByUsername.get(user.username) || [];
      existing.push(user);
      usersByUsername.set(user.username, existing);
    });
    
    // Verwerk dubbele gebruikers
    for (const [username, duplicates] of usersByUsername.entries()) {
      if (duplicates.length > 1) {
        // Behoud de eerste gebruiker, verwijder de rest
        const [keep, ...remove] = duplicates;
        console.log(`Behouden gebruiker: ${keep.username} (${keep.id})`);
        
        for (const user of remove) {
          console.log(`Verwijderen gebruiker: ${user.username} (${user.id})`);
          await prisma.user.delete({
            where: { id: user.id }
          });
        }
      }
    }
    
    console.log('Opschoning voltooid');
  } catch (error) {
    console.error('Fout bij het opschonen van dubbele gebruikers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupDuplicateUsers(); 