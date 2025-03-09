import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { RaidType } from "@prisma/client"

interface CSVReservation {
  ID: string
  Item: string
  Boss: string
  Attendee: string
  Class: string
  Specialization: string
  Comment?: string
  "Date (GMT)": string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { raidType, reservations } = body as { raidType: RaidType; reservations: CSVReservation[] }

    // Verwerk elke reservering
    const results = await Promise.all(
      reservations.map(async (res) => {
        // Zoek of maak de speler
        const player = await prisma.player.upsert({
          where: { name: res.Attendee },
          update: {
            playerClass: res.Class,
            role: res.Specialization,
          },
          create: {
            name: res.Attendee,
            playerClass: res.Class,
            role: res.Specialization,
          },
        })

        // Zoek bestaande reservering voor deze speler en raid
        const existingReservation = await prisma.reservation.findFirst({
          where: {
            playerId: player.id,
            raidType: raidType,
            item: res.Item,
            boss: res.Boss,
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

        if (!existingReservation) {
          // Maak nieuwe reservering
          return prisma.reservation.create({
            data: {
              playerId: player.id,
              raidType: raidType,
              item: res.Item,
              boss: res.Boss,
              points: 10,
              date: new Date(res["Date (GMT)"]),
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
        }

        return existingReservation
      })
    )

    return NextResponse.json({
      message: `${results.length} reserveringen verwerkt`,
      results,
    })
  } catch (error) {
    console.error("Error importing reservations:", error)
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het importeren van de reserveringen" },
      { status: 500 }
    )
  }
} 