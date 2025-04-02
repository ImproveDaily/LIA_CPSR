import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface Reservation {
  id: string
  playerId: string
  player: {
    name: string
    playerClass: string
    role: string
  }
  item: string
  boss: string
  raid: string
  createdAt: Date
}

export async function GET(request: Request) {
  try {
    const db = await prisma.$connect();
    console.log('Database connected successfully');
    
    // Timeout na 5 seconden
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database query timeout')), 5000);
    });

    const reservationsPromise = prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        player: {
          select: {
            name: true,
            playerClass: true,
            role: true,
          },
        },
      },
    });

    const reservations = await Promise.race([reservationsPromise, timeoutPromise]) as Reservation[];
    
    // Haal unieke raids op uit de reservaties
    const raids = [...new Set(reservations.map((r: Reservation) => r.raid))].sort();

    console.log(`Successfully fetched ${reservations.length} reservations`);
    
    return NextResponse.json(
      { 
        data: {
          reservations,
          raids
        },
        error: null,
        message: 'Reservations successfully fetched'
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { 
        data: {
          reservations: [],
          raids: []
        },
        error: {
          message: error instanceof Error ? error.message : 'Er is een fout opgetreden bij het ophalen van de reserveringen',
          statusCode: 500
        }
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } finally {
    try {
      await prisma.$disconnect();
      console.log('Database disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting from database:', error);
    }
  }
} 