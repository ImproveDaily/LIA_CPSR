"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Edit, Trash, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Sample data structure
type RaidRecord = {
  id: string
  raidName: string
  date: Date
  killedBosses: string[]
  pointsUpdated: number
  notes?: string
}

// Sample data
const raidHistory: RaidRecord[] = [
  {
    id: "1",
    raidName: "Molten Core",
    date: new Date(2025, 2, 2), // March 2, 2025
    killedBosses: ["Lucifron", "Magmadar", "Gehennas", "Garr", "Baron Geddon", "Ragnaros"],
    pointsUpdated: 12,
    notes: "Full clear except for Sulfuron and Golemagg",
  },
  {
    id: "2",
    raidName: "Blackwing Lair",
    date: new Date(2025, 2, 5), // March 5, 2025
    killedBosses: ["Razorgore", "Vaelastrasz", "Broodlord Lashlayer"],
    pointsUpdated: 8,
    notes: "Progression raid, stopped at Firemaw",
  },
  {
    id: "3",
    raidName: "Molten Core",
    date: new Date(2025, 2, 9), // March 9, 2025
    killedBosses: [
      "Lucifron",
      "Magmadar",
      "Gehennas",
      "Garr",
      "Baron Geddon",
      "Shazzrah",
      "Sulfuron Harbinger",
      "Golemagg",
      "Majordomo Executus",
      "Ragnaros",
    ],
    pointsUpdated: 15,
    notes: "Full clear",
  },
]

export function AdminRaidManagement() {
  const [raids, setRaids] = useState<RaidRecord[]>(raidHistory)

  const handleDeleteRaid = (id: string) => {
    setRaids((currentRaids) => currentRaids.filter((raid) => raid.id !== id))

    toast({
      title: "Raid deleted",
      description: "The raid record has been removed",
      variant: "destructive",
    })
  }

  const handleUpdatePointsFromRaid = (id: string) => {
    // In a real application, this would trigger a server action to recalculate
    // the points based on the raid attendance and drops
    toast({
      title: "Points updated",
      description: "Player points have been recalculated based on this raid",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button>Record New Raid</Button>
      </div>

      <div className="space-y-4">
        {raids.map((raid) => (
          <Accordion key={raid.id} type="single" collapsible className="border rounded-md">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                <div className="flex flex-1 items-center justify-between pr-4">
                  <div className="font-medium">{raid.raidName}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{format(raid.date, "MMM d, yyyy")}</span>
                    <Badge variant="outline">+{raid.pointsUpdated} points</Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-medium">Bosses Killed:</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {raid.killedBosses.map((boss, index) => (
                        <Badge key={index} variant="secondary" className="font-normal">
                          {boss}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {raid.notes && (
                    <div>
                      <h4 className="text-sm font-medium">Notes:</h4>
                      <p className="text-sm text-muted-foreground">{raid.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleUpdatePointsFromRaid(raid.id)}>
                      <Check className="mr-2 h-4 w-4" />
                      Update Points
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Raid
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteRaid(raid.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  )
}

