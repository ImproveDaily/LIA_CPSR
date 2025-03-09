"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Minus, Trash, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

// Sample data structure - this would be stored in your database
type PointRecord = {
  id: number
  player: string
  playerClass: string
  item: string
  boss: string
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

// Sample data - would be replaced with actual data from your database
const samplePointRecords: PointRecord[] = [
  {
    id: 1,
    player: "Nameyorprice",
    playerClass: "Priest",
    item: "Striker's Mark",
    boss: "Magmadar",
    points: 20,
    lastUpdated: "2025-03-09",
  },
  {
    id: 2,
    player: "Bigcrits",
    playerClass: "Mage",
    item: "Talisman of Ephemeral Power",
    boss: "Golemagg",
    points: 30,
    lastUpdated: "2025-03-09",
  },
  {
    id: 3,
    player: "Tankenstein",
    playerClass: "Warrior",
    item: "Onslaught Girdle",
    boss: "Ragnaros",
    points: 10,
    lastUpdated: "2025-03-09",
  },
  {
    id: 4,
    player: "Backstabber",
    playerClass: "Rogue",
    item: "Perdition's Blade",
    boss: "Ragnaros",
    points: 40,
    lastUpdated: "2025-03-09",
  },
  {
    id: 5,
    player: "Healbot",
    playerClass: "Priest",
    item: "Cauterizing Band",
    boss: "Lucifron",
    points: 0,
    lastUpdated: "2025-03-09",
  },
]

export function AdminPointsManagement() {
  const [pointRecords, setPointRecords] = useState<PointRecord[]>(samplePointRecords)
  const [searchQuery, setSearchQuery] = useState("")
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<PointRecord | null>(null)

  const filteredRecords = pointRecords.filter(
    (record) =>
      record.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.boss.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddPoints = (id: number, amount = 10) => {
    setPointRecords((records) =>
      records.map((record) =>
        record.id === id
          ? { ...record, points: record.points + amount, lastUpdated: new Date().toISOString().split("T")[0] }
          : record,
      ),
    )

    toast({
      title: "Points updated",
      description: `Added ${amount} points to player's reservation`,
    })
  }

  const handleSubtractPoints = (id: number, amount = 10) => {
    setPointRecords((records) =>
      records.map((record) =>
        record.id === id
          ? {
              ...record,
              points: Math.max(0, record.points - amount),
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : record,
      ),
    )

    toast({
      title: "Points updated",
      description: `Subtracted ${amount} points from player's reservation`,
    })
  }

  const handleDeleteRecord = (id: number) => {
    setPointRecords((records) => records.filter((record) => record.id !== id))

    toast({
      title: "Record deleted",
      description: "The reservation record has been deleted",
      variant: "destructive",
    })
  }

  const handleOpenResetDialog = (record: PointRecord) => {
    setSelectedRecord(record)
    setIsResetDialogOpen(true)
  }

  const handleResetPoints = () => {
    if (!selectedRecord) return

    setPointRecords((records) =>
      records.map((record) =>
        record.id === selectedRecord.id
          ? { ...record, points: 0, lastUpdated: new Date().toISOString().split("T")[0] }
          : record,
      ),
    )

    setIsResetDialogOpen(false)

    toast({
      title: "Points reset",
      description: `Reset points for ${selectedRecord.player}'s ${selectedRecord.item} reservation`,
    })
  }

  const handleResetAllPoints = () => {
    setPointRecords((records) =>
      records.map((record) => ({ ...record, points: 0, lastUpdated: new Date().toISOString().split("T")[0] })),
    )

    toast({
      title: "All points reset",
      description: "Reset points for all player reservations",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by player, item, or boss..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash className="mr-2 h-4 w-4" />
              Reset All Points
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset All Points</DialogTitle>
              <DialogDescription>
                This will reset all player points to zero. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center py-4">
              <AlertTriangle className="h-16 w-16 text-destructive" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {}}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleResetAllPoints}>
                Reset All Points
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-background">
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Boss</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAddPoints(record.id)}
                        title="Add 10 points"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleSubtractPoints(record.id)}
                        title="Subtract 10 points"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleOpenResetDialog(record)}>
                        Reset
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteRecord(record.id)}
                        title="Delete record"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No point records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Points</DialogTitle>
            <DialogDescription>
              {selectedRecord && (
                <>
                  Are you sure you want to reset points for {selectedRecord.player}'s {selectedRecord.item} reservation?
                  Current points: {selectedRecord.points}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleResetPoints}>
              Reset Points
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

