import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const db = await prisma.$connect();
    
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

    const reservations = await Promise.race([reservationsPromise, timeoutPromise]);

    return NextResponse.json(
      { data: reservations, error: null },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { 
        data: [], 
        error: error instanceof Error ? error.message : 'Er is een fout opgetreden bij het ophalen van de reserveringen' 
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
} 