import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupDuplicates() {
  try {
    // Haal alle spelers op
    const players = await prisma.player.findMany();
    
    // Groepeer spelers op naam
    const playersByName = new Map<string, typeof players>();
    players.forEach(player => {
      const existing = playersByName.get(player.name) || [];
      existing.push(player);
      playersByName.set(player.name, existing);
    });
    
    // Verwerk dubbele spelers
    for (const [name, duplicates] of playersByName.entries()) {
      if (duplicates.length > 1) {
        // Behoud de eerste speler, verwijder de rest
        const [keep, ...remove] = duplicates;
        console.log(`Behouden speler: ${keep.name} (${keep.id})`);
        
        for (const player of remove) {
          console.log(`Verwerken speler: ${player.name} (${player.id})`);
          
          // Update alle reservaties van deze speler
          await prisma.reservation.updateMany({
            where: { playerId: player.id },
            data: { playerId: keep.id }
          });
          
          // Update alle points van deze speler
          await prisma.point.updateMany({
            where: { playerId: player.id },
            data: { playerId: keep.id }
          });
          
          // Verwijder de speler
          await prisma.player.delete({
            where: { id: player.id }
          });
        }
      }
    }
    
    console.log('Opschoning voltooid');
  } catch (error) {
    console.error('Fout bij het opschonen van dubbele spelers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupDuplicates(); 