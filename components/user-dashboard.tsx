"use client"

import { useState, useEffect } from "react"
import { RaidType } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RaidSelector } from "./raid-selector"
import { ReservationsList } from "./reservations-list"
import { useToast } from "@/components/ui/use-toast"

export function UserDashboard() {
  const [selectedRaid, setSelectedRaid] = useState<RaidType>(RaidType.BLACKWING_LAIR)
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/reservations?raidType=${selectedRaid}`)
        if (!response.ok) {
          throw new Error("Failed to fetch reservations")
        }
        const data = await response.json()
        setReservations(data)
      } catch (error) {
        console.error("Error fetching reservations:", error)
        toast({
          title: "Error",
          description: "Er is een fout opgetreden bij het ophalen van de reserveringen",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [selectedRaid, toast])

  const handleRaidChange = (newRaidType: RaidType) => {
    setSelectedRaid(newRaidType)
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Raid Reserveringen</h2>
        <RaidSelector value={selectedRaid} onValueChange={handleRaidChange} />
      </div>

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
            onAddReservation={() => {}}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  )
} 