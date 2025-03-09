"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"

// Sample data - would be replaced with actual data from your database
const players = [
  { id: 1, name: "Thunderbluff", class: "Warrior", role: "Tank", reservations: 2 },
  { id: 2, name: "Healbot", class: "Priest", role: "Healer", reservations: 1 },
  { id: 3, name: "Backstabber", class: "Rogue", role: "DPS", reservations: 1 },
  { id: 4, name: "Frostbolt", class: "Mage", role: "DPS", reservations: 1 },
  { id: 5, name: "Moonfire", class: "Druid", role: "Healer", reservations: 1 },
  { id: 6, name: "Soulstone", class: "Warlock", role: "DPS", reservations: 0 },
  { id: 7, name: "Windfury", class: "Shaman", role: "DPS", reservations: 0 },
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

export function PlayerList() {
  const [items, setItems] = useState(players)

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
    toast({
      title: "Player removed",
      description: "The player has been removed from the roster",
      variant: "destructive",
    })
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-2">
        {items.map((player) => (
          <Card key={player.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={classColors[player.class]}>{player.class.substring(0, 1)}</Badge>
                  <CardTitle className="text-base">{player.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit player
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDelete(player.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-xs text-muted-foreground">Class</span>
                  <p className="text-sm">{player.class}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Role</span>
                  <p className="text-sm">{player.role}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 p-2">
              <div className="flex w-full items-center justify-between">
                <span className="text-xs text-muted-foreground">{player.reservations} active reservations</span>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(player.id)}>
                  Remove
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

