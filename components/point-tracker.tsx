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

  const handleAddPoints = async (playerId: string, amount: number) => {
    try {
      const response = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, amount: 10 })
      })
      
      if (!response.ok) throw new Error("Failed to add points")
      
      // Update lokale state
      setPlayerPoints(prev => prev.map(p => 
        p.playerId === playerId 
          ? { 
              ...p, 
              totalPoints: p.totalPoints + 10,
              items: p.items.map(item => ({
                ...item,
                points: item.points + 10
              }))
            }
          : p
      ))
    } catch (err) {
      console.error("Error adding points:", err)
    }
  }

  const handleRemovePoints = async (playerId: string, amount: number) => {
    try {
      const response = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, amount: -10 })
      })
      
      if (!response.ok) throw new Error("Failed to remove points")
      
      // Update lokale state
      setPlayerPoints(prev => prev.map(p => 
        p.playerId === playerId 
          ? { 
              ...p, 
              totalPoints: p.totalPoints - 10,
              items: p.items.map(item => ({
                ...item,
                points: item.points - 10
              }))
            }
          : p
      ))
    } catch (err) {
      console.error("Error removing points:", err)
    }
  }

  const handleDeletePoints = async (playerId: string) => {
    try {
      const response = await fetch(`/api/points/${playerId}`, {
        method: "DELETE"
      })
      
      if (!response.ok) throw new Error("Failed to delete points")
      
      // Update lokale state
      setPlayerPoints(prev => prev.filter(p => p.playerId !== playerId))
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
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Select value={selectedRaid} onValueChange={setSelectedRaid}>
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een raid" />
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
        <div className="flex-[2] flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoeken op speler, item of baas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reserveringen tabel */}
        <div className="border rounded-lg">
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Speler</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Boss</TableHead>
                  <TableHead>Raid</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Punten</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.player.name}</TableCell>
                    <TableCell>{reservation.item}</TableCell>
                    <TableCell>{reservation.boss}</TableCell>
                    <TableCell>{reservation.raid}</TableCell>
                    <TableCell>{new Date(reservation.date).toLocaleDateString()}</TableCell>
                    <TableCell>{reservation.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* Punten overzicht */}
        <div className="border rounded-lg">
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Speler</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Punten</TableHead>
                  <TableHead>Acties</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playerPoints.map((player) => (
                  <TableRow key={player.playerId}>
                    <TableCell>{player.playerName}</TableCell>
                    <TableCell>
                      <ul>
                        {player.items.map((item, index) => (
                          <li key={index}>{item.item}: {item.points}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>{player.totalPoints}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleAddPoints(player.playerId, 10)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemovePoints(player.playerId, 10)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeletePoints(player.playerId)}
                          className="bg-gray-500 hover:bg-gray-600 text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

