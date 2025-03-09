"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

// Sample data - would be replaced with actual data from your database
const players = [
  { id: "1", name: "Thunderbluff", class: "Warrior" },
  { id: "2", name: "Healbot", class: "Priest" },
  { id: "3", name: "Backstabber", class: "Rogue" },
  { id: "4", name: "Frostbolt", class: "Mage" },
  { id: "5", name: "Moonfire", class: "Druid" },
]

const raids = [
  { id: "1", name: "Molten Core" },
  { id: "2", name: "Blackwing Lair" },
  { id: "3", name: "Ahn'Qiraj" },
  { id: "4", name: "Naxxramas" },
  { id: "5", name: "Black Temple" },
]

// Form schema
const formSchema = z.object({
  playerId: z.string({
    required_error: "Please select a player.",
  }),
  itemName: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
  }),
  bossName: z.string().min(2, {
    message: "Boss name must be at least 2 characters.",
  }),
  raidId: z.string({
    required_error: "Please select a raid.",
  }),
  initialPoints: z.coerce.number().min(0).default(0),
})

export function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      bossName: "",
      initialPoints: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      toast({
        title: "Reservation created",
        description: `${values.itemName} has been reserved.`,
      })
      form.reset()
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="playerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a player" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {players.map((player) => (
                    <SelectItem key={player.id} value={player.id}>
                      {player.name} ({player.class})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Thunderfury, Blessed Blade of the Windseeker" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bossName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Boss Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ragnaros" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="raidId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raid</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a raid" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {raids.map((raid) => (
                      <SelectItem key={raid.id} value={raid.id}>
                        {raid.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="initialPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Points</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Starting points for this reservation (usually 0)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Reservation"}
        </Button>
      </form>
    </Form>
  )
}

