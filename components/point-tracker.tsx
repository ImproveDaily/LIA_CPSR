"use client"

import { useState } from "react"
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

// Sample data structure - this would be stored in your database
type PointRecord = {
  id: number
  player: string
  playerClass: string
  item: string
  boss: string
  raid: string
  points: number
  lastUpdated: string
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

// Raid lijst
const raids = [
  "Molten Core",
  "Onyxia's Lair",
  "Blackwing Lair",
  "Temple of Ahn'Qiraj",
  "Naxxramas",
  "Tower of Karazhan"
]

// Sample data - would be replaced with actual data from your database
const samplePointRecords: PointRecord[] = [
  {
    id: 1,
    player: "Nameyorprice",
    playerClass: "Priest",
    item: "Striker's Mark",
    boss: "Magmadar",
    raid: "Molten Core",
    points: 20,
    lastUpdated: "2025-03-09",
  },
  {
    id: 2,
    player: "Bigcrits",
    playerClass: "Mage",
    item: "Talisman of Ephemeral Power",
    boss: "Golemagg",
    raid: "Molten Core",
    points: 30,
    lastUpdated: "2025-03-09",
  },
  {
    id: 3,
    player: "Tankenstein",
    playerClass: "Warrior",
    item: "Onslaught Girdle",
    boss: "Ragnaros",
    raid: "Molten Core",
    points: 10,
    lastUpdated: "2025-03-09",
  },
  {
    id: 4,
    player: "Backstabber",
    playerClass: "Rogue",
    item: "Perdition's Blade",
    boss: "Ragnaros",
    raid: "Molten Core",
    points: 40,
    lastUpdated: "2025-03-09",
  },
  {
    id: 5,
    player: "Healbot",
    playerClass: "Priest",
    item: "Cauterizing Band",
    boss: "Lucifron",
    raid: "Molten Core",
    points: 0,
    lastUpdated: "2025-03-09",
  },
  {
    id: 6,
    player: "Nameyorprice",
    playerClass: "Priest",
    item: "Neltharion's Tear",
    boss: "Nefarian",
    raid: "Blackwing Lair",
    points: 30,
    lastUpdated: "2025-03-09",
  },
  {
    id: 7,
    player: "Bigcrits",
    playerClass: "Mage",
    item: "Staff of the Shadow Flame",
    boss: "Nefarian",
    raid: "Blackwing Lair",
    points: 20,
    lastUpdated: "2025-03-09",
  },
  {
    id: 8,
    player: "Tankenstein",
    playerClass: "Warrior",
    item: "Head of Onyxia",
    boss: "Onyxia",
    raid: "Onyxia's Lair",
    points: 15,
    lastUpdated: "2025-03-09",
  }
]

export function PointTracker() {
  const [pointRecords, setPointRecords] = useState<PointRecord[]>(samplePointRecords)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRaid, setSelectedRaid] = useState<string>("Molten Core")
  const { isAdmin } = useAuth()

  const filteredRecords = pointRecords.filter(
    (record) =>
      (record.raid === selectedRaid) &&
      (
        record.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.boss.toLowerCase().includes(searchQuery.toLowerCase())
      )
  )

  // These functions will only be available to admins
  const handleAddPoints = (id: number) => {
    if (!isAdmin) return

    setPointRecords((records) =>
      records.map((record) =>
        record.id === id
          ? { ...record, points: record.points + 10, lastUpdated: new Date().toISOString().split("T")[0] }
          : record,
      ),
    )
  }

  const handleSubtractPoints = (id: number) => {
    if (!isAdmin) return

    setPointRecords((records) =>
      records.map((record) =>
        record.id === id
          ? { ...record, points: Math.max(0, record.points - 10), lastUpdated: new Date().toISOString().split("T")[0] }
          : record,
      ),
    )
  }

  const handleResetPoints = (id: number) => {
    if (!isAdmin) return

    setPointRecords((records) =>
      records.map((record) =>
        record.id === id ? { ...record, points: 0, lastUpdated: new Date().toISOString().split("T")[0] } : record,
      ),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Select value={selectedRaid} onValueChange={setSelectedRaid}>
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een raid" />
            </SelectTrigger>
            <SelectContent>
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

      <div className="rounded-md border">
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader className="bg-background sticky top-0">
              <TableRow>
                <TableHead>Speler</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Baas</TableHead>
                <TableHead className="text-right">Punten</TableHead>
                {isAdmin && <TableHead className="text-right">Acties</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={classColors[record.playerClass] || "bg-gray-500 text-white"}>
                          {record.playerClass.substring(0, 1)}
                        </Badge>
                        {record.player}
                      </div>
                    </TableCell>
                    <TableCell>{record.item}</TableCell>
                    <TableCell>{record.boss}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={record.points > 0 ? "default" : "outline"}>{record.points} pts</Badge>
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleAddPoints(record.id)}
                            title="10 punten toevoegen"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleSubtractPoints(record.id)}
                            title="10 punten aftrekken"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleResetPoints(record.id)}>
                            Reset
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 5 : 4} className="h-24 text-center text-muted-foreground">
                    Geen puntenrecords gevonden voor deze raid.
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

