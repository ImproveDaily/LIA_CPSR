"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Minus, Trash2 } from "lucide-react"
import { useAuth } from "./auth-provider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Class colors for WoW
const classColors: Record<string, string> = {
  Warrior: "bg-[#C79C6E] text-white",
  Paladin: "bg-[#F58CBA] text-white",
  Hunter: "bg-[#ABD473] text-white",
  Rogue: "bg-[#FFF569] text-black",
  Priest: "bg-[#FFFFFF] text-black",
  Shaman: "bg-[#0070DE] text-white",
  Mage: "bg-[#69CCF0] text-white",
  Warlock: "bg-[#9482C9] text-white",
  Druid: "bg-[#FF7D0A] text-white",
  "Death Knight": "bg-[#C41E3A] text-white",
}

type Reservation = {
  id: string
  playerId: string
  item: string
  boss: string
  raid: string
  date: string
  points: number
  player: {
    id: string
    name: string
    playerClass: string
    role: string
  }
}

type PlayerPoints = {
  playerId: string
  playerName: string
  totalPoints: number
  items: {
    item: string
    points: number
  }[]
}

export function PointTracker() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [raids, setRaids] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRaid, setSelectedRaid] = useState<string>("all")
  const [playerPoints, setPlayerPoints] = useState<PlayerPoints[]>([])
  const { isAdmin } = useAuth()

  useEffect(() => {
    fetchReservations()
    fetchPoints()
  }, [selectedRaid])

  const fetchReservations = async () => {
    try {
      const url = selectedRaid !== "all" 
        ? `/api/reservations?raid=${encodeURIComponent(selectedRaid)}`
        : "/api/reservations"
      
      const response = await fetch(url)
      if (!response.ok) throw new Error("Failed to fetch reservations")
      
      const data = await response.json()
      setReservations(data.reservations)
      setRaids(data.raids)
      
      // Bereken punten per speler
      const pointsMap = new Map<string, { name: string, points: number, items: { item: string, points: number }[] }>()
      data.reservations.forEach((res: Reservation) => {
        const current = pointsMap.get(res.playerId) || { 
          name: res.player.name, 
          points: 0,
          items: []
        }
        
        // Update items
        const existingItem = current.items.find(i => i.item === res.item)
        if (existingItem) {
          existingItem.points += 10
        } else {
          current.items.push({ item: res.item, points: 10 })
        }
        
        // Update total points
        current.points += 10
        
        pointsMap.set(res.playerId, current)
      })
      
      const pointsArray = Array.from(pointsMap.entries()).map(([id, data]) => ({
        playerId: id,
        playerName: data.name,
        totalPoints: data.points,
        items: data.items
      }))
      
      setPlayerPoints(pointsArray)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er is een fout opgetreden")
    } finally {
      setLoading(false)
    }
  }

  const fetchPoints = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/points")
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch points")
      }
      
      const data = await response.json()
      setPlayerPoints(data)
    } catch (err) {
      console.error("Error fetching points:", err)
      setError(err instanceof Error ? err.message : "Er is een fout opgetreden bij het ophalen van de punten")
    } finally {
      setLoading(false)
    }
  }

  const handleAddPoints = async (playerId: string, amount: number, item: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, amount: 10, item })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add points")
      }
      
      // Haal de punten opnieuw op
      await fetchPoints()
    } catch (err) {
      console.error("Error adding points:", err)
      setError(err instanceof Error ? err.message : "Er is een fout opgetreden bij het toevoegen van punten")
    } finally {
      setLoading(false)
    }
  }

  const handleRemovePoints = async (playerId: string, amount: number, item: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, amount: -10, item })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to remove points")
      }
      
      // Haal de punten opnieuw op
      await fetchPoints()
    } catch (err) {
      console.error("Error removing points:", err)
      setError(err instanceof Error ? err.message : "Er is een fout opgetreden bij het verwijderen van punten")
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePoints = async (playerId: string) => {
    try {
      const response = await fetch(`/api/points/${playerId}`, {
        method: "DELETE"
      })
      
      if (!response.ok) throw new Error("Failed to delete points")
      
      // Haal de punten opnieuw op
      await fetchPoints()
    } catch (err) {
      console.error("Error deleting points:", err)
    }
  }

  const filteredReservations = reservations.filter(reservation =>
    reservation.player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reservation.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reservation.boss.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <div>Laden...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Point Standings</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
          <Input
            placeholder="Zoek speler..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[200px]"
          />
          <Select value={selectedRaid} onValueChange={setSelectedRaid}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Selecteer raid" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle raids</SelectItem>
              {raids.map((raid) => (
                <SelectItem key={raid} value={raid}>
                  {raid}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Reserveringen en Punten</h3>
        <ScrollArea className="h-[600px] rounded-md border p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Speler</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Boss</TableHead>
                <TableHead>Punten</TableHead>
                <TableHead>Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => {
                const playerPoint = playerPoints.find(p => p.playerId === reservation.playerId)
                const itemPoints = playerPoint?.items.find(i => i.item === reservation.item)?.points || 0
                
                return (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.player.name}</TableCell>
                    <TableCell>{reservation.item}</TableCell>
                    <TableCell>{reservation.boss}</TableCell>
                    <TableCell>{itemPoints}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleAddPoints(reservation.playerId, 10, reservation.item)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemovePoints(reservation.playerId, 10, reservation.item)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeletePoints(reservation.playerId)}
                          className="bg-gray-500 hover:bg-gray-600 text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}

