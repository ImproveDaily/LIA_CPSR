import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-static'
export const revalidate = false

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
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=1, stale-while-revalidate=59'
        }
      }
    );

  } catch (error: any) {
    console.error("Points error:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
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
      const playerId = point.playerId.toString();
      if (!acc[playerId]) {
        acc[playerId] = {
          totalPoints: 0,
          items: {}
        };
      }
      
      const itemKey = point.item || 'unknown';
      if (!acc[playerId].items[itemKey]) {
        acc[playerId].items[itemKey] = 0;
      }
      
      acc[playerId].items[itemKey] += point.amount;
      acc[playerId].totalPoints += point.amount;
      
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
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=1, stale-while-revalidate=59'
        }
      }
    );

  } catch (error: any) {
    console.error("Points error:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );
  }
} 