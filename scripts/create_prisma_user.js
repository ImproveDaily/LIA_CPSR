const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createUser() {
  try {
    // Hash het wachtwoord
    const password = 'test123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Verwijder bestaande gebruiker als die bestaat
    try {
      await prisma.user.delete({
        where: {
          username: 'testadmin'
        }
      });
    } catch (e) {
      // Gebruiker bestaat niet, dat is prima
    }

    // Maak nieuwe gebruiker aan
    const user = await prisma.user.create({
      data: {
        username: 'testadmin',
        password: hashedPassword,
        role: 'admin'
      }
    });

    console.log('Gebruiker aangemaakt:', {
      id: user.id,
      username: user.username,
      role: user.role
    });
  } catch (error) {
    console.error('Fout bij aanmaken gebruiker:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser(); 