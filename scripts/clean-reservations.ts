import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const deletedReservations = await prisma.reservation.deleteMany({})
    console.log(`${deletedReservations.count} reserveringen zijn verwijderd.`)
  } catch (error) {
    console.error('Fout bij het verwijderen van reserveringen:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 