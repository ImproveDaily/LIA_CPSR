import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupUsers() {
  try {
    // Haal alle gebruikers op
    const users = await prisma.user.findMany();
    
    // Maak een map van username naar user ID's
    const userMap = new Map<string, string[]>();
    users.forEach(user => {
      const existingIds = userMap.get(user.username) || [];
      userMap.set(user.username, [...existingIds, user.id]);
    });

    // Loop door de map en verwijder dubbele gebruikers
    for (const [username, ids] of userMap.entries()) {
      if (ids.length > 1) {
        console.log(`Gevonden ${ids.length} dubbele gebruikers voor ${username}`);
        
        // Behoud de eerste gebruiker, verwijder de rest
        const [keepId, ...deleteIds] = ids;
        
        for (const id of deleteIds) {
          await prisma.user.delete({
            where: { id }
          });
          console.log(`Verwijderd dubbele gebruiker met ID: ${id}`);
        }
      }
    }

    console.log('Opschonen voltooid');
  } catch (error) {
    console.error('Fout bij opschonen gebruikers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupUsers(); 