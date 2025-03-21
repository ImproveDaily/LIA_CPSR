import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { playerId, amount, item, boss, raid } = await req.json();

    // Stel een reden samen op basis van de ontvangen parameters
    let reason = amount > 0 ? "Punten toegevoegd" : "Punten afgetrokken";
    
    // Voeg raid en boss toe aan de reden als ze beschikbaar zijn
    if (raid) {
      reason += ` (${raid}`;
      if (boss) {
        reason += ` - ${boss}`;
      }
      reason += ")";
    }

    // Maak een nieuwe point record
    const point = await prisma.point.create({
      data: {
        playerId,
        amount,
        item,
        reason,
        boss,
        raid
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
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const playerId = searchParams.get('playerId');
    const item = searchParams.get('item');
    const boss = searchParams.get('boss');
    const raid = searchParams.get('raid');
    
    if (!playerId || !item) {
      return new NextResponse(
        JSON.stringify({ error: "PlayerId en item zijn verplicht" }),
        { status: 400 }
      );
    }

    // Zoek eerst de punten die overeenkomen met de criteria
    const pointsToDelete = await prisma.point.findFirst({
      where: {
        playerId: playerId,
        item: item,
      }
    });

    if (!pointsToDelete) {
      return new NextResponse(
        JSON.stringify({ error: "Geen punten gevonden voor deze criteria" }),
        { status: 404 }
      );
    }

    // Verwijder de gevonden punten
    await prisma.point.delete({
      where: {
        id: pointsToDelete.id
      }
    });

    return new NextResponse(
      JSON.stringify({ 
        message: "Punten succesvol verwijderd" 
      }),
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );
  } catch (error: any) {
    console.error("Points deletion error:", error);
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
    const { searchParams } = new URL(req.url)
    const raid = searchParams.get('raid') || 'MC'

    // Haal alle punten op
    const points = await prisma.point.findMany({
      where: {
        reason: {
          contains: raid
        }
      },
      include: {
        player: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Groepeer punten per speler
    const pointsByPlayer = points.reduce((acc, point) => {
      const playerId = point.playerId.toString();
      if (!acc[playerId]) {
        acc[playerId] = {
          playerId,
          playerName: point.player.name,
          totalPoints: 0,
          items: []
        };
      }

      acc[playerId].totalPoints += point.amount;
      if (point.item) {
        const existingItem = acc[playerId].items.find((i: { item: string, points: number }) => i.item === point.item);
        if (existingItem) {
          existingItem.points += point.amount;
        } else {
          acc[playerId].items.push({ item: point.item, points: point.amount });
        }
      }

      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json(
      Object.values(pointsByPlayer),
      {
        headers: {
          'Cache-Control': 'public, s-maxage=1, stale-while-revalidate=59'
        }
      }
    );
  } catch (error) {
    console.error("Points error:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de punten." },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );
  }
} 