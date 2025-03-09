"use client"

import { RaidType } from "@prisma/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { NewReservationDialog } from "./new-reservation-dialog"

interface Reservation {
  id: string
  player: {
    name: string
    playerClass: string
    role: string
  }
  item: string
  boss: string
  points: number
}

interface ReservationsListProps {
  raidType: RaidType
  reservations: Reservation[]
  onAddReservation: () => void
  loading?: boolean
}

export function ReservationsList({
  raidType,
  reservations,
  onAddReservation,
  loading = false,
}: ReservationsListProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const isAdmin = user?.username === 'admin'

  const handlePointsChange = async (reservationId: string, change: number) => {
    try {
      const response = await fetch(`/api/reservations/${reservationId}/points`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ change }),
      })

      if (!response.ok) {
        throw new Error("Failed to update points")
      }

      // Ververs de pagina om de nieuwe punten te tonen
      window.location.reload()
    } catch (error) {
      console.error("Error updating points:", error)
      toast({
        title: "Error",
        description: "Er is een fout opgetreden bij het bijwerken van de punten",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Reserveringen</h3>
        {isAdmin && (
          <NewReservationDialog
            raidType={raidType}
            onReservationCreated={onAddReservation}
          />
        )}
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Speler</TableHead>
            <TableHead>Klasse</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Boss</TableHead>
            <TableHead className="text-right">Punten</TableHead>
            {isAdmin && <TableHead className="w-[100px]">Acties</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={isAdmin ? 7 : 6} className="text-center text-muted-foreground">
                Reserveringen laden...
              </TableCell>
            </TableRow>
          ) : reservations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isAdmin ? 7 : 6} className="text-center text-muted-foreground">
                Geen reserveringen gevonden voor deze raid
              </TableCell>
            </TableRow>
          ) : (
            reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.player.name}</TableCell>
                <TableCell>{reservation.player.playerClass}</TableCell>
                <TableCell>{reservation.player.role}</TableCell>
                <TableCell>{reservation.item}</TableCell>
                <TableCell>{reservation.boss}</TableCell>
                <TableCell className="text-right">{reservation.points}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePointsChange(reservation.id, 10)}
                        title="Voeg 10 punten toe"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePointsChange(reservation.id, -10)}
                        title="Haal 10 punten af"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
} 