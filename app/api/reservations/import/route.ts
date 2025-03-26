import { NextResponse } from "next/server"
import { parse } from "csv-parse/sync"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

// Schema voor CSV validatie
const csvRowSchema = z.object({
  ID: z.string(),
  Item: z.string(),
  Boss: z.string(),
  Attendee: z.string(),
  Class: z.string(),
  Specialization: z.string(),
  Comment: z.string().optional(),
  "Date (GMT)": z.string()
})

type CSVRow = z.infer<typeof csvRowSchema>

export async function POST(req: Request) {
  try {
    const { reservations } = await req.json();
    
    if (!Array.isArray(reservations)) {
      return NextResponse.json(
        { error: "Ongeldig formaat: verwacht een array van reservaties" },
        { status: 400 }
      );
    }

    // Timeout na 30 seconden
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Import timeout')), 30000);
    });

    const importPromise = Promise.all(
      reservations.map(async (reservation) => {
        const { playerId, item, boss, raid, date } = reservation;
        
        // Controleer of de speler bestaat
        const player = await prisma.player.findUnique({
          where: { id: playerId }
        });

        if (!player) {
          throw new Error(`Speler niet gevonden: ${playerId}`);
        }

        return prisma.reservation.create({
          data: {
            playerId,
            item,
            boss,
            raid,
            date: new Date(date)
          }
        });
      })
    );

    const results = await Promise.race([importPromise, timeoutPromise]) as Array<{
      id: string;
      playerId: string;
      item: string;
      boss: string;
      raid: string;
      date: Date;
      createdAt: Date;
      updatedAt: Date;
    }>;

    return NextResponse.json(
      { 
        message: `${results.length} reservaties succesvol geïmporteerd`,
        data: results 
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );

  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Er is een fout opgetreden bij het importeren van de reservaties' 
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
} 