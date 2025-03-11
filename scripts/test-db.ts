import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Alle spelers ophalen
    const players = await prisma.player.findMany()
    console.log('Spelers in database:', players)

    // Alle reserveringen ophalen met speler informatie
    const reservations = await prisma.reservation.findMany({
      include: {
        player: true
      }
    })
    console.log('\nReserveringen in database:', reservations)

  } catch (error) {
    console.error('Database error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 