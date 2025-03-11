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
    for (const record of validRecords) {
      const player = await prisma.player.findFirst({
        where: { name: record.Attendee }
      })

      if (player) {
        // Controleer of er al een reservering bestaat voor deze combinatie
        const existingReservation = await prisma.reservation.findFirst({
          where: {
            playerId: player.id,
            item: record.Item,
            boss: record.Boss,
            raid: raid
          }
        })

        if (!existingReservation) {
          // Maak nieuwe reservering aan
          await prisma.reservation.create({
            data: {
              playerId: player.id,
              item: record.Item,
              boss: record.Boss,
              raid: raid,
              date: new Date(record["Date (GMT)"])
            }
          })

          // Voeg punten toe als ze nog niet bestaan voor deze combinatie
          try {
            await prisma.point.create({
              data: {
                playerId: player.id,
                amount: 10,
                item: record.Item,
                boss: record.Boss,
                raid: raid,
                reason: raid
              }
            })
          } catch (error) {
            // Als er al punten bestaan voor deze combinatie (unique constraint error), negeer de error
            if (!(error instanceof Error && error.message.includes("unique constraint"))) {
              throw error
            }
          }
        }
      }
    }

    return new NextResponse(JSON.stringify({
      message: "Import voltooid",
      totalRecords: validRecords.length,
      results: validRecords
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