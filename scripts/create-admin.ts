import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const username = 'admin'
  const password = 'admin123'
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    // Verwijder eerst bestaande admin gebruiker als die bestaat
    await prisma.user.deleteMany({
      where: { username }
    })

    // Maak nieuwe admin gebruiker
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: 'ADMIN'
      }
    })
    console.log('Admin gebruiker aangemaakt:', user)
  } catch (error) {
    console.error('Error bij aanmaken admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 