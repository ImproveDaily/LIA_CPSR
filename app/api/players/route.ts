import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-static'
export const revalidate = false

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      include: {
        reservations: true,
        points: true,
      },
    });
    return NextResponse.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json(
      { error: 'Error fetching players' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const player = await prisma.player.create({
      data: {
        name: body.name,
        playerClass: body.playerClass,
        role: body.role,
      },
    });
    return NextResponse.json(player);
  } catch (error) {
    console.error('Error creating player:', error);
    return NextResponse.json(
      { error: 'Error creating player' },
      { status: 500 }
    );
  }
} 