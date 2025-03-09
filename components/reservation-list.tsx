"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

// Sample data - would be replaced with actual data from your database
type Reservation = {
  id: string
  player: string
  playerClass: string
  item: string
  boss: string
  date: string
}

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

// Sample data - would be replaced with actual data from your database
const reservations: Reservation[] = [
  {
    id: "1",
    player: "Nameyorprice",
    playerClass: "Priest",
    item: "Striker's Mark",
    boss: "Magmadar",
    date: "2025-03-09",
  },
  {
    id: "2",
    player: "Bigcrits",
    playerClass: "Mage",
    item: "Talisman of Ephemeral Power",
    boss: "Golemagg",
    date: "2025-03-09",
  },
  {
    id: "3",
    player: "Tankenstein",
    playerClass: "Warrior",
    item: "Onslaught Girdle",
    boss: "Ragnaros",
    date: "2025-03-09",
  },
  {
    id: "4",
    player: "Backstabber",
    playerClass: "Rogue",
    item: "Perdition's Blade",
    boss: "Ragnaros",
    date: "2025-03-09",
  },
  {
    id: "5",
    player: "Healbot",
    playerClass: "Priest",
    item: "Cauterizing Band",
    boss: "Lucifron",
    date: "2025-03-09",
  },
]

export function ReservationList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredReservations = reservations.filter(
    (res) =>
      res.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.boss.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reservations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9"
        />
      </div>

      <div className="rounded-md border">
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Boss</TableHead>
                <TableHead className="text-right">Reserved On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={classColors[reservation.playerClass] || "bg-gray-500 text-white"}>
                          {reservation.playerClass.substring(0, 1)}
                        </Badge>
                        {reservation.player}
                      </div>
                    </TableCell>
                    <TableCell>{reservation.item}</TableCell>
                    <TableCell>{reservation.boss}</TableCell>
                    <TableCell className="text-right">{reservation.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No reservations found.
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

