"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, FileUp, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

type CSVReservation = {
  ID: string
  Item: string
  Boss: string
  Attendee: string
  Class: string
  Specialization: string
  Comment: string | null
  "Date (GMT)": string
}

export function ReservationImport() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle")
  const [importMessage, setImportMessage] = useState("")
  const [importedData, setImportedData] = useState<CSVReservation[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setImportStatus("idle")
      setImportMessage("")
    }
  }

  const handleImport = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to import",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setImportStatus("idle")

    try {
      // Read the file
      const text = await file.text()

      // Parse CSV
      const result = parseCSV(text)

      if (result.length === 0) {
        setImportStatus("error")
        setImportMessage("No valid data found in the CSV file")
      } else {
        setImportedData(result)
        setImportStatus("success")
        setImportMessage(`Successfully imported ${result.length} reservations`)

        // Here you would typically save this data to your database
        console.log("Imported data:", result)

        toast({
          title: "Import successful",
          description: `Imported ${result.length} reservations`,
        })
      }
    } catch (error) {
      console.error("Import error:", error)
      setImportStatus("error")
      setImportMessage("Failed to parse the CSV file. Please ensure it's in the correct format.")

      toast({
        title: "Import failed",
        description: "There was an error processing the CSV file",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Simple CSV parser
  const parseCSV = (text: string): CSVReservation[] => {
    const lines = text.split("\n")
    if (lines.length <= 1) {
      throw new Error("CSV file is empty or has only headers")
    }

    const headers = lines[0].split(",").map((h) => h.trim())

    const results: CSVReservation[] = []

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue

      const values = lines[i].split(",").map((v) => v.trim())

      if (values.length !== headers.length) {
        console.warn(`Line ${i} has ${values.length} values, expected ${headers.length}`)
        continue
      }

      const reservation = {} as any

      headers.forEach((header, index) => {
        reservation[header] = values[index]
      })

      results.push(reservation as CSVReservation)
    }

    return results
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="csv-file">Upload Reservation CSV</Label>
        <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
        <p className="text-xs text-muted-foreground">Upload the CSV export from raidres.fly.dev</p>
      </div>

      <Button onClick={handleImport} disabled={!file || isUploading} className="w-full max-w-sm">
        {isUploading ? (
          "Importing..."
        ) : (
          <>
            <FileUp className="mr-2 h-4 w-4" />
            Import Reservations
          </>
        )}
      </Button>

      {importStatus === "success" && (
        <Alert
          variant="default"
          className="max-w-sm bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
        >
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{importMessage}</AlertDescription>
        </Alert>
      )}

      {importStatus === "error" && (
        <Alert variant="destructive" className="max-w-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{importMessage}</AlertDescription>
        </Alert>
      )}

      {importedData.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-medium">Preview of imported data:</h3>
          <div className="rounded-md border p-2">
            <p className="text-xs text-muted-foreground">{importedData.length} reservations imported</p>
            <ul className="mt-2 text-xs">
              {importedData.slice(0, 3).map((res, index) => (
                <li key={index} className="mb-1">
                  {res.Attendee} ({res.Class}) - {res.Item} from {res.Boss}
                </li>
              ))}
              {importedData.length > 3 && (
                <li className="text-muted-foreground">...and {importedData.length - 3} more</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

