"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Sample data - would be replaced with actual data from your database
const upcomingRaids = [
  {
    id: 1,
    name: "Molten Core",
    date: new Date(2025, 2, 15, 20, 0), // March 15, 2025, 8:00 PM
    attendees: 25,
    status: "scheduled",
  },
  {
    id: 2,
    name: "Blackwing Lair",
    date: new Date(2025, 2, 18, 20, 0), // March 18, 2025, 8:00 PM
    attendees: 22,
    status: "scheduled",
  },
  {
    id: 3,
    name: "Ahn'Qiraj",
    date: new Date(2025, 2, 22, 19, 30), // March 22, 2025, 7:30 PM
    attendees: 30,
    status: "scheduled",
  },
]

export function UpcomingRaids() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Raid
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {upcomingRaids.map((raid) => (
          <Card key={raid.id}>
            <CardHeader className="pb-2">
              <CardTitle>{raid.name}</CardTitle>
              <CardDescription>{format(raid.date, "EEEE, MMMM do, yyyy")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{format(raid.date, "h:mm a")}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Attendees:</span>
                  <span className="font-medium">{raid.attendees} signed up</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium capitalize">{raid.status}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button size="sm">Sign Up</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

