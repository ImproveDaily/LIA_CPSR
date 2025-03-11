import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Update alle reserveringen
    const result = await prisma.reservation.updateMany({
      where: {},
      data: {
        raid: "Blackwing Lair" // Standaard raid
      }
    })

    console.log('Reserveringen bijgewerkt:', result)
  } catch (error) {
    console.error('Error bij updaten reserveringen:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 