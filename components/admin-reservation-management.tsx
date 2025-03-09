"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Trash, Edit, Plus, AlertTriangle } from "lucide-react"
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

// Sample data structure
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

export function AdminReservationManagement() {
  const [reservationList, setReservationList] = useState<Reservation[]>(reservations)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

  const filteredReservations = reservationList.filter(
    (res) =>
      res.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.boss.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteReservation = (id: string) => {
    setReservationList((list) => list.filter((item) => item.id !== id))

    toast({
      title: "Reservation deleted",
      description: "The reservation has been removed",
      variant: "destructive",
    })
  }

  const handleDeleteAllReservations = () => {
    setReservationList([])
    setIsDeleteAllDialogOpen(false)

    toast({
      title: "All reservations deleted",
      description: "All reservations have been cleared from the system",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reservations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
          <Dialog open={isDeleteAllDialogOpen} onOpenChange={setIsDeleteAllDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Clear All Reservations</DialogTitle>
                <DialogDescription>
                  This will permanently delete all player reservations. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center py-4">
                <AlertTriangle className="h-16 w-16 text-destructive" />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteAllDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteAllReservations}>
                  Delete All Reservations
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-background">
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Boss</TableHead>
              <TableHead className="text-right">Reserved On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="outline" size="icon" title="Edit reservation">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteReservation(reservation.id)}
                        title="Delete reservation"
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

