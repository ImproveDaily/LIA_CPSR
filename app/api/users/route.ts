import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const dynamic = 'force-static'
export const revalidate = false

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, role } = body;

    // Hash het wachtwoord
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Maak de gebruiker aan
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: role || 'user', // Standaard rol is 'user' als er geen rol is opgegeven
      },
    });

    // Verwijder het wachtwoord uit de response
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het aanmaken van de gebruiker' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het ophalen van de gebruikers' },
      { status: 500 }
    );
  }
} 