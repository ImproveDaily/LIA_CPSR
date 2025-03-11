import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Vind alle spelers
    const players = await prisma.player.findMany()
    
    // Groepeer spelers op naam
    const groupedPlayers = players.reduce((acc, player) => {
      if (!acc[player.name]) {
        acc[player.name] = []
      }
      acc[player.name].push(player)
      return acc
    }, {} as Record<string, typeof players>)

    // Verwerk dubbele spelers
    for (const [name, duplicates] of Object.entries(groupedPlayers)) {
      if (duplicates.length > 1) {
        console.log(`Verwerken van dubbele speler: ${name}`)
        
        // Behoud de eerste speler, verwijder de rest
        const [keeper, ...others] = duplicates
        
        // Update alle reserveringen en punten naar de eerste speler
        for (const duplicate of others) {
          await prisma.reservation.updateMany({
            where: { playerId: duplicate.id },
            data: { playerId: keeper.id }
          })
          
          await prisma.point.updateMany({
            where: { playerId: duplicate.id },
            data: { playerId: keeper.id }
          })
          
          // Verwijder de dubbele speler
          await prisma.player.delete({
            where: { id: duplicate.id }
          })
        }
      }
    }

    console.log('Dubbele spelers zijn succesvol opgeruimd')
  } catch (error) {
    console.error('Fout bij opruimen van dubbele spelers:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 