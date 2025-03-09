import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check of de gebruiker admin is
    const session = await getServerSession(authOptions)
    if (!session || session.user.username !== 'admin') {
      return NextResponse.json(
        { error: "Alleen administrators kunnen punten aanpassen" },
        { status: 403 }
      )
    }

    const { change } = await request.json()
    
    // Haal de huidige reservering op
    const reservation = await prisma.reservation.findUnique({
      where: { id: params.id },
    })

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservering niet gevonden" },
        { status: 404 }
      )
    }

    // Update de punten
    const updatedReservation = await prisma.reservation.update({
      where: { id: params.id },
      data: {
        points: reservation.points + change,
      },
      include: {
        player: {
          select: {
            name: true,
            playerClass: true,
            role: true,
          },
        },
      },
    })

    return NextResponse.json(updatedReservation)
  } catch (error) {
    console.error("Error updating points:", error)
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het bijwerken van de punten" },
      { status: 500 }
    )
  }
} 