import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { RaidType } from "@prisma/client"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Niet geautoriseerd" }),
        { 
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }

    const { searchParams } = new URL(request.url)
    const raidType = searchParams.get("raidType") as RaidType

    if (!raidType) {
      return new NextResponse(
        JSON.stringify({ error: "RaidType is verplicht" }),
        { 
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        raidType,
      },
      include: {
        player: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return new NextResponse(JSON.stringify(reservations), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return new NextResponse(
      JSON.stringify({ error: "Er is een fout opgetreden" }),
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Niet geautoriseerd" }),
        { 
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }

    const body = await request.json()
    const { playerId, raidType, item, boss, points = 0 } = body

    if (!playerId || !raidType || !item || !boss) {
      return new NextResponse(
        JSON.stringify({ error: "Alle velden zijn verplicht" }),
        { 
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }

    const reservation = await prisma.reservation.create({
      data: {
        playerId,
        raidType,
        item,
        boss,
        points,
      },
      include: {
        player: true,
      },
    })

    return new NextResponse(JSON.stringify(reservation), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return new NextResponse(
      JSON.stringify({ error: "Er is een fout opgetreden" }),
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
} 