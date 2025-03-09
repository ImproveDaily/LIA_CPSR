"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search } from "lucide-react"

// Sample data - would be replaced with actual data from your database
const reservations = [
  {
    id: 1,
    player: "Thunderbluff",
    playerClass: "Warrior",
    item: "Thunderfury, Blessed Blade of the Windseeker",
    boss: "Prince Thunderaan",
    raid: "Molten Core",
    points: 30,
    dateReserved: "2023-12-01",
  },
  {
    id: 2,
    player: "Healbot",
    playerClass: "Priest",
    item: "Benediction",
    boss: "Majordomo Executus",
    raid: "Molten Core",
    points: 20,
    dateReserved: "2023-12-05",
  },
  {
    id: 3,
    player: "Backstabber",
    playerClass: "Rogue",
    item: "Warglaive of Azzinoth",
    boss: "Illidan Stormrage",
    raid: "Black Temple",
    points: 40,
    dateReserved: "2023-11-20",
  },
  {
    id: 4,
    player: "Frostbolt",
    playerClass: "Mage",
    item: "Atiesh, Greatstaff of the Guardian",
    boss: "Kel'Thuzad",
    raid: "Naxxramas",
    points: 10,
    dateReserved: "2023-12-10",
  },
  {
    id: 5,
    player: "Moonfire",
    playerClass: "Druid",
    item: "Staff of the Shadow Flame",
    boss: "Nefarian",
    raid: "Blackwing Lair",
    points: 0,
    dateReserved: "2023-12-15",
  },
]

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
}

export function RecentReservations() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredReservations = reservations.filter(
    (res) =>
      res.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.raid.toLowerCase().includes(searchQuery.toLowerCase()),
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
        <Button size="sm">Add Reservation</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Boss / Raid</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Reserved On</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.length > 0 ? (
              filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={classColors[reservation.playerClass]}>
                        {reservation.playerClass.substring(0, 1)}
                      </Badge>
                      {reservation.player}
                    </div>
                  </TableCell>
                  <TableCell>{reservation.item}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{reservation.boss}</span>
                      <span className="text-xs text-muted-foreground">{reservation.raid}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={reservation.points > 0 ? "default" : "outline"}>{reservation.points} pts</Badge>
                  </TableCell>
                  <TableCell className="text-right">{reservation.dateReserved}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit reservation</DropdownMenuItem>
                        <DropdownMenuItem>Add points</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Mark as received</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete reservation</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No reservations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

