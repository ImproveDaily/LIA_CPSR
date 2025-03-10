import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const raid = searchParams.get('raid')

    const query = raid ? { raid } : {}

    const reservations = await prisma.reservation.findMany({
      where: query,
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
      reservations,
      raids: uniqueRaids.map(r => r.raid)
    })
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het ophalen van de reserveringen.' },
      { status: 500 }
    )
  }
} 