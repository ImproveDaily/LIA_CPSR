import { prisma } from '../lib/db';

async function main() {
  try {
    // Test player toevoegen
    const player = await prisma.player.create({
      data: {
        name: 'TestSpeler',
        playerClass: 'Warrior',
        role: 'Tank',
      },
    });
    console.log('Test speler toegevoegd:', player);

    // Alle spelers ophalen
    const players = await prisma.player.findMany();
    console.log('Alle spelers:', players);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 