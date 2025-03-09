import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Zoek de gebruiker in de database
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Ongeldige gebruikersnaam of wachtwoord' },
        { status: 401 }
      );
    }

    // Converteer het binaire wachtwoord naar een string
    const hashedPassword = Buffer.from(user.password).toString();

    // Verifieer het wachtwoord
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Ongeldige gebruikersnaam of wachtwoord' },
        { status: 401 }
      );
    }

    // Verwijder het wachtwoord uit de response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      message: 'Succesvol ingelogd'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden tijdens het inloggen' },
      { status: 500 }
    );
  }
} 