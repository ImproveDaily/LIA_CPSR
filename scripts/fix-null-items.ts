import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixNullItems() {
  try {
    // Haal eerst alle points op
    const points = await prisma.point.findMany();
    
    // Filter points met null item
    const pointsWithNullItem = points.filter(point => point.item === null);
    
    // Update elke point met null item
    for (const point of pointsWithNullItem) {
      await prisma.point.update({
        where: { id: point.id },
        data: { item: "Onbekend Item" }
      });
    }

    console.log(`Aangepaste records: ${pointsWithNullItem.length}`);
  } catch (error) {
    console.error('Fout bij het aanpassen van null items:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixNullItems(); 