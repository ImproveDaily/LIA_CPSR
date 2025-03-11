import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Vind alle punten
    const points = await prisma.point.findMany()
    
    // Groepeer punten op unieke combinatie
    const groupedPoints = points.reduce((acc, point) => {
      const key = `${point.playerId}-${point.item || ''}-${point.boss || ''}-${point.raid || ''}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(point)
      return acc
    }, {} as Record<string, typeof points>)

    // Verwerk dubbele punten
    for (const [key, duplicates] of Object.entries(groupedPoints)) {
      if (duplicates.length > 1) {
        console.log(`Verwerken van dubbele punten voor combinatie: ${key}`)
        
        // Behoud het punt met de hoogste waarde, verwijder de rest
        const sorted = duplicates.sort((a, b) => b.amount - a.amount)
        const [keeper, ...others] = sorted
        
        // Verwijder de dubbele punten
        for (const duplicate of others) {
          await prisma.point.delete({
            where: { id: duplicate.id }
          })
        }
      }
    }

    console.log('Dubbele punten zijn succesvol opgeruimd')
  } catch (error) {
    console.error('Fout bij opruimen van dubbele punten:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 