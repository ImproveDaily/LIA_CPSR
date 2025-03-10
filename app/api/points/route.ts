import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { playerId, amount, item } = await req.json();

    // Maak een nieuwe point record
    const point = await prisma.point.create({
      data: {
        playerId,
        amount,
        item,
        reason: amount > 0 ? "Punten toegevoegd" : "Punten afgetrokken"
      }
    });

    return new NextResponse(
      JSON.stringify({ 
        message: "Punten succesvol bijgewerkt",
        point 
      }),
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Points error:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Haal alle punten op voor een speler
    const { searchParams } = new URL(req.url);
    const playerId = searchParams.get("playerId");

    if (!playerId) {
      return new NextResponse(
        JSON.stringify({ error: "Player ID is required" }),
        { status: 400 }
      );
    }

    const points = await prisma.point.findMany({
      where: {
        playerId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    // Groepeer punten per item
    const pointsByItem = points.reduce((acc, point) => {
      if (!acc[point.item]) {
        acc[point.item] = 0;
      }
      acc[point.item] += point.amount;
      return acc;
    }, {} as Record<string, number>);

    // Bereken totaal punten
    const totalPoints = points.reduce((sum, point) => sum + point.amount, 0);

    return new NextResponse(
      JSON.stringify({ 
        points,
        totalPoints,
        pointsByItem
      }),
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Points error:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
} 