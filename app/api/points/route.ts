import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const points = await prisma.point.findMany({
      include: {
        player: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(points)
  } catch (error) {
    console.error('Error fetching points:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het ophalen van de punten.' },
      { status: 500 }
    )
  }
} 