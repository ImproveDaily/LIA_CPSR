"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Minus, ChevronDown } from "lucide-react"
import { useAuth } from "./auth-provider"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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

// Raid lijst
const raids = [
  "Molten Core",
  "Onyxia's Lair",
  "Blackwing Lair",
  "Temple of Ahn'Qiraj",
  "Naxxramas",
  "Tower of Karazhan"
]

type Point = {
  id: string
  playerId: string
  amount: number
  reason: string
  createdAt: string
  player: {
    id: string
    name: string
    playerClass: string
    role: string
  }
}

export function PointTracker() {
  const [points, setPoints] = useState<Point[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRaid, setSelectedRaid] = useState<string>("Molten Core")
  const { isAdmin } = useAuth()

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetch('/api/points')
        if (!response.ok) {
          throw new Error('Fout bij het ophalen van punten')
        }
        const data = await response.json()
        setPoints(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Er is een fout opgetreden')
      } finally {
        setLoading(false)
      }
    }

    fetchPoints()
  }, [])

  const filteredPoints = points.filter((point) =>
    point.player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    point.reason.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <div>Laden...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-[2] flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoeken op speler of reden..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader className="bg-background sticky top-0">
              <TableRow>
                <TableHead>Speler</TableHead>
                <TableHead>Reden</TableHead>
                <TableHead className="text-right">Punten</TableHead>
                <TableHead className="text-right">Datum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPoints.length > 0 ? (
                filteredPoints.map((point) => (
                  <TableRow key={point.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={classColors[point.player.playerClass] || "bg-gray-500 text-white"}>
                          {point.player.playerClass.substring(0, 1)}
                        </Badge>
                        {point.player.name}
                      </div>
                    </TableCell>
                    <TableCell>{point.reason}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={point.amount > 0 ? "default" : "outline"}>{point.amount} pts</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {new Date(point.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Geen punten gevonden
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}

