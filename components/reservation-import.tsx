"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, FileUp, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RAIDS, type Raid } from "@/lib/constants"

type CSVReservation = {
  ID: string
  Item: string
  Boss: string
  Attendee: string
  Class: string
  Role: string
  Comment: string | null
  "Date (GMT)": string
}

export function ReservationImport() {
  const [file, setFile] = useState<File | null>(null)
  const [selectedRaid, setSelectedRaid] = useState<Raid | "">("")
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
        title: "Geen bestand geselecteerd",
        description: "Selecteer een CSV bestand om te importeren",
        variant: "destructive",
      })
      return
    }

    if (!selectedRaid) {
      toast({
        title: "Geen raid geselecteerd",
        description: "Selecteer eerst een raid voordat je het bestand importeert",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setImportStatus("idle")

    try {
      // Maak een FormData object met het bestand en raid
      const formData = new FormData()
      formData.append("file", file)
      formData.append("raid", selectedRaid)

      // Stuur het bestand naar de API
      const response = await fetch("/api/reservations/import", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Er is een fout opgetreden bij het importeren")
      }

      setImportedData(result.results.filter((r: any) => r.success))
      setImportStatus("success")
      setImportMessage(`${result.results.filter((r: any) => r.success).length} reserveringen succesvol geïmporteerd`)

      toast({
        title: "Import succesvol",
        description: `${result.results.filter((r: any) => r.success).length} reserveringen geïmporteerd`,
      })

      // Toon waarschuwingen voor mislukte imports
      const failures = result.results.filter((r: any) => !r.success)
      if (failures.length > 0) {
        toast({
          title: "Waarschuwing",
          description: `${failures.length} reserveringen konden niet worden geïmporteerd`,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Import error:", error)
      setImportStatus("error")
      setImportMessage(error.message || "Er is een fout opgetreden bij het importeren van het bestand")

      toast({
        title: "Import mislukt",
        description: error.message || "Er is een fout opgetreden bij het verwerken van het CSV bestand",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="raid-select">Selecteer Raid</Label>
        <Select 
          value={selectedRaid} 
          onValueChange={(value: string) => {
            if (RAIDS.includes(value as Raid) || value === "") {
              setSelectedRaid(value as Raid | "")
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Kies een raid..." />
          </SelectTrigger>
          <SelectContent>
            {RAIDS.map((raid) => (
              <SelectItem key={raid} value={raid}>
                {raid}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="csv-file">Upload Reservation CSV</Label>
        <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
        <p className="text-xs text-muted-foreground">Upload het CSV bestand geëxporteerd uit Excel</p>
      </div>

      <Button onClick={handleImport} disabled={!file || !selectedRaid || isUploading} className="w-full max-w-sm">
        {isUploading ? (
          "Importeren..."
        ) : (
          <>
            <FileUp className="mr-2 h-4 w-4" />
            Importeer Reserveringen
          </>
        )}
      </Button>

      {importStatus === "success" && (
        <Alert
          variant="default"
          className="max-w-sm bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
        >
          <Check className="h-4 w-4" />
          <AlertTitle>Succes</AlertTitle>
          <AlertDescription>{importMessage}</AlertDescription>
        </Alert>
      )}

      {importStatus === "error" && (
        <Alert variant="destructive" className="max-w-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Fout</AlertTitle>
          <AlertDescription>{importMessage}</AlertDescription>
        </Alert>
      )}

      {importedData.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-medium">Voorbeeld van geïmporteerde data:</h3>
          <div className="rounded-md border p-2">
            <p className="text-xs text-muted-foreground">{importedData.length} reserveringen geïmporteerd</p>
            <ul className="mt-2 text-xs">
              {importedData.slice(0, 3).map((res, index) => (
                <li key={index} className="mb-1">
                  {res.Attendee} ({res.Class}) - {res.Item} van {res.Boss}
                </li>
              ))}
              {importedData.length > 3 && (
                <li className="text-muted-foreground">...en nog {importedData.length - 3} meer</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

