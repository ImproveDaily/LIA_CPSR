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
    // Lees het CSV bestand en raid uit de request
    const formData = await req.formData()
    const file = formData.get("file") as File
    const raid = formData.get("raid") as string

    console.log("Ontvangen raid:", raid)

    if (!file) {
      return new NextResponse("Geen bestand geüpload", { status: 400 })
    }

    if (!raid) {
      return new NextResponse("Geen raid geselecteerd", { status: 400 })
    }

    // Converteer het bestand naar tekst
    const csvText = await file.text()
    
    // Parse het CSV bestand
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true
    })

    console.log("Aantal records gevonden:", records.length)
    console.log("Eerste record:", records[0])

    // Valideer en verwerk elke rij
    const validRecords: CSVRow[] = []
    const errors: string[] = []

    for (const [index, record] of records.entries()) {
      try {
        const validRecord = csvRowSchema.parse(record)
        validRecords.push(validRecord)
      } catch (error: any) {
        console.log(`Validatie error voor record ${index}:`, error.message)
        errors.push(`Rij ${index + 1}: ${error.message}`)
      }
    }

    console.log("Aantal valide records:", validRecords.length)
    if (validRecords.length > 0) {
      console.log("Eerste valide record:", validRecords[0])
    }

    if (errors.length > 0) {
      console.log("Validatie errors:", errors)
      return new NextResponse(JSON.stringify({ errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      })
    }

    // Verwerk de gevalideerde records
    const results = await Promise.all(
      validRecords.map(async (record) => {
        try {
          // Zoek speler
          const existingPlayer = await prisma.player.findFirst({
            where: { name: record.Attendee }
          });

          let player;
          
          // Update of maak nieuwe speler
          try {
            if (existingPlayer) {
              player = await prisma.player.update({
                where: { id: existingPlayer.id },
                data: {
                  playerClass: record.Class,
                  role: record.Specialization
                }
              });
            } else {
              player = await prisma.player.create({
                data: {
                  name: record.Attendee,
                  playerClass: record.Class,
                  role: record.Specialization
                }
              });
            }
          } catch (error) {
            console.error("Error bij speler aanmaken/updaten:", error);
            throw error;
          }

          console.log("Speler aangemaakt/bijgewerkt:", player);

          // Maak een nieuwe reservering
          let reservation;
          try {
            reservation = await prisma.reservation.create({
              data: {
                playerId: player.id,
                item: record.Item,
                boss: record.Boss,
                raid: raid,
                date: new Date(record["Date (GMT)"])
              }
            });
          } catch (error) {
            console.error("Error bij reservering aanmaken:", error);
            throw error;
          }

          console.log("Reservering aangemaakt:", reservation);

          // Als er punten zijn in het commentaar, voeg deze toe
          if (record.Comment) {
            const pointsMatch = record.Comment.match(/\+(\d+)/);
            if (pointsMatch) {
              const points = parseInt(pointsMatch[1]);
              try {
                const point = await prisma.point.create({
                  data: {
                    playerId: player.id,
                    amount: points,
                    reason: `Reservering voor ${record.Item} van ${record.Boss} in ${raid}`
                  }
                });
                console.log("Punten toegevoegd:", point);
              } catch (error) {
                console.error("Error bij punten toevoegen:", error);
                // We gaan door zelfs als punten toevoegen mislukt
              }
            }
          }

          return {
            success: true,
            player: record.Attendee,
            item: record.Item,
            raid: raid
          };
        } catch (error: any) {
          console.error("Error bij verwerken record:", error)
          return {
            success: false,
            player: record.Attendee,
            item: record.Item,
            error: error.message
          }
        }
      })
    )

    const successfulResults = results.filter(r => r.success)
    console.log("Aantal succesvolle imports:", successfulResults.length)

    return new NextResponse(JSON.stringify({
      message: "Import voltooid",
      totalRecords: validRecords.length,
      results
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })

  } catch (error: any) {
    console.error("Import error:", error)
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
} 