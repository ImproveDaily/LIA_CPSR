import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const raid = searchParams.get('raid') || 'Molten Core'

    const reservations = await prisma.reservation.findMany({
      where: {
        raid: raid
      },
      include: {
        player: true,
      },
      orderBy: {
        date: 'desc'
      }
    })

    // Haal alle beschikbare raids op
    const uniqueRaids = await prisma.reservation.groupBy({
      by: ['raid']
    })

    return NextResponse.json({
      data: {
        reservations: reservations || [],
        raids: uniqueRaids.map(r => r.raid)
      },
      error: null
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=1, stale-while-revalidate=59'
      }
    })
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json(
      { 
        data: {
          reservations: [],
          raids: []
        },
        error: 'Er is een fout opgetreden bij het ophalen van de reserveringen.'
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    )
  }
} 