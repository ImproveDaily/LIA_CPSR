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
    // Lees het CSV bestand uit de request
    const formData = await req.formData()
    const file = formData.get("file") as File
    if (!file) {
      return new NextResponse("Geen bestand geüpload", { status: 400 })
    }

    // Converteer het bestand naar tekst
    const csvText = await file.text()
    
    // Parse het CSV bestand
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true
    })

    // Valideer en verwerk elke rij
    const validRecords: CSVRow[] = []
    const errors: string[] = []

    for (const [index, record] of records.entries()) {
      try {
        const validRecord = csvRowSchema.parse(record)
        validRecords.push(validRecord)
      } catch (error: any) {
        errors.push(`Rij ${index + 1}: ${error.message}`)
      }
    }

    if (errors.length > 0) {
      return new NextResponse(JSON.stringify({ errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      })
    }

    // Verwerk de gevalideerde records
    const results = await Promise.all(
      validRecords.map(async (record) => {
        try {
          // Zoek of maak speler
          const player = await prisma.player.upsert({
            where: { name: record.Attendee },
            update: {
              class: record.Class,
              specialization: record.Specialization
            },
            create: {
              name: record.Attendee,
              class: record.Class,
              specialization: record.Specialization
            }
          })

          // Maak een nieuwe reservering
          const reservation = await prisma.reservation.create({
            data: {
              itemId: parseInt(record.ID),
              itemName: record.Item,
              boss: record.Boss,
              playerId: player.id,
              points: record.Comment ? parseInt(record.Comment.match(/\+(\d+)/)?.[1] || "0") : 0,
              date: new Date(record["Date (GMT)"])
            }
          })

          return {
            success: true,
            player: record.Attendee,
            item: record.Item
          }
        } catch (error: any) {
          return {
            success: false,
            player: record.Attendee,
            item: record.Item,
            error: error.message
          }
        }
      })
    )

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