import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    console.log("GET /api/points - Starting request");
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session) {
      console.log("No session found");
      return NextResponse.json(
        { error: "Niet ingelogd" },
        { status: 401 }
      );
    }

    // Haal alle punten op
    console.log("Fetching points from database");
    const points = await prisma.point.findMany({
      include: {
        player: true
      }
    });
    console.log("Found points:", points);

    // Bereken punten per speler
    const pointsMap = new Map<string, { name: string, points: number, items: { item: string, points: number }[] }>();
    
    points.forEach((point) => {
      const current = pointsMap.get(point.playerId) || { 
        name: point.player.name, 
        points: 0,
        items: []
      };
      
      // Update items
      const existingItem = current.items.find(i => i.item === point.item);
      if (existingItem) {
        existingItem.points += point.amount;
      } else {
        current.items.push({ item: point.item, points: point.amount });
      }
      
      // Update total points
      current.points += point.amount;
      
      pointsMap.set(point.playerId, current);
    });
    
    const pointsArray = Array.from(pointsMap.entries()).map(([id, data]) => ({
      playerId: id,
      playerName: data.name,
      totalPoints: data.points,
      items: data.items
    }));

    console.log("Returning points array:", pointsArray);
    return NextResponse.json(pointsArray);
  } catch (error: any) {
    console.error("Error in GET /api/points:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de punten" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    console.log("POST /api/points - Starting request");
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session) {
      console.log("No session found");
      return NextResponse.json(
        { error: "Niet ingelogd" },
        { status: 401 }
      );
    }

    const { playerId, amount, item } = await request.json();
    console.log("Request body:", { playerId, amount, item });

    if (!playerId || !amount || !item) {
      console.log("Missing parameters");
      return NextResponse.json(
        { error: "Ontbrekende parameters" },
        { status: 400 }
      );
    }

    // Maak een nieuwe point record
    console.log("Creating new point record");
    const point = await prisma.point.create({
      data: {
        playerId,
        amount,
        item,
        reason: amount > 0 ? "Punten toegevoegd" : "Punten afgetrokken"
      }
    });
    console.log("Created point:", point);

    return NextResponse.json(point);
  } catch (error: any) {
    console.error("Error in POST /api/points:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het toevoegen van punten" },
      { status: 500 }
    );
  }
} 