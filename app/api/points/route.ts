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
    // Haal alle punten op
    const points = await prisma.point.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    // Groepeer punten per speler en item
    const pointsByPlayer = points.reduce((acc, point) => {
      if (!acc[point.playerId]) {
        acc[point.playerId] = {
          totalPoints: 0,
          items: {}
        };
      }
      
      if (!acc[point.playerId].items[point.item]) {
        acc[point.playerId].items[point.item] = 0;
      }
      
      acc[point.playerId].items[point.item] += point.amount;
      acc[point.playerId].totalPoints += point.amount;
      
      return acc;
    }, {} as Record<string, { totalPoints: number, items: Record<string, number> }>);

    // Haal speler informatie op
    const players = await prisma.player.findMany({
      where: {
        id: {
          in: Object.keys(pointsByPlayer)
        }
      }
    });

    // Combineer speler informatie met punten
    const result = players.map(player => ({
      playerId: player.id,
      playerName: player.name,
      totalPoints: pointsByPlayer[player.id].totalPoints,
      items: Object.entries(pointsByPlayer[player.id].items).map(([item, points]) => ({
        item,
        points
      }))
    }));

    return new NextResponse(
      JSON.stringify(result),
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