"use client"

import { useState, useEffect } from "react"
import { RaidType } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RaidSelector } from "./raid-selector"
import { ReservationsList } from "./reservations-list"
import { ReservationImport } from "./reservation-import"
import { useToast } from "@/components/ui/use-toast"

export function AdminDashboard() {
  const [selectedRaid, setSelectedRaid] = useState<RaidType>(RaidType.BLACKWING_LAIR)
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchReservations = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/reservations?raidType=${selectedRaid}`, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setReservations(data)
    } catch (error) {
      console.error("Error fetching reservations:", error)
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het ophalen van de reserveringen",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReservations()
  }, [selectedRaid])

  const handleRaidChange = (newRaidType: RaidType) => {
    setSelectedRaid(newRaidType)
  }

  const handleAddReservation = () => {
    // TODO: Implementeer het toevoegen van een nieuwe reservering
    console.log("Nieuwe reservering toevoegen voor raid:", selectedRaid)
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <RaidSelector value={selectedRaid} onValueChange={handleRaidChange} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Importeer Reserveringen</CardTitle>
            <CardDescription>
              Importeer reserveringen van een CSV bestand
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReservationImport onImportComplete={fetchReservations} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Huidige Reserveringen</CardTitle>
            <CardDescription>
              Overzicht van alle actieve reserveringen voor {selectedRaid.replace('_', ' ')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReservationsList
              raidType={selectedRaid}
              reservations={reservations}
              onAddReservation={handleAddReservation}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 