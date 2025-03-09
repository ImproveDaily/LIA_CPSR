"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Sample data - would be replaced with actual data from your database
const raids = [
  { id: "1", name: "Molten Core" },
  { id: "2", name: "Blackwing Lair" },
  { id: "3", name: "Ahn'Qiraj" },
  { id: "4", name: "Naxxramas" },
  { id: "5", name: "Black Temple" },
]

const bosses = {
  "1": [
    // Molten Core
    { id: "1", name: "Lucifron" },
    { id: "2", name: "Magmadar" },
    { id: "3", name: "Gehennas" },
    { id: "4", name: "Garr" },
    { id: "5", name: "Baron Geddon" },
    { id: "6", name: "Shazzrah" },
    { id: "7", name: "Sulfuron Harbinger" },
    { id: "8", name: "Golemagg the Incinerator" },
    { id: "9", name: "Majordomo Executus" },
    { id: "10", name: "Ragnaros" },
  ],
  "2": [
    // Blackwing Lair
    { id: "11", name: "Razorgore the Untamed" },
    { id: "12", name: "Vaelastrasz the Corrupt" },
    { id: "13", name: "Broodlord Lashlayer" },
    { id: "14", name: "Firemaw" },
    { id: "15", name: "Ebonroc" },
    { id: "16", name: "Flamegor" },
    { id: "17", name: "Chromaggus" },
    { id: "18", name: "Nefarian" },
  ],
  // Add other raids as needed
}

// Form schema
const formSchema = z.object({
  raidId: z.string({
    required_error: "Please select a raid.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  killedBosses: z.array(z.string()).nonempty({
    message: "Please select at least one boss.",
  }),
  droppedItems: z
    .array(
      z.object({
        itemName: z.string().min(2, "Item name is required"),
        bossId: z.string(),
        receivedBy: z.string().optional(),
      }),
    )
    .optional(),
  notes: z.string().optional(),
})

export function RaidForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedRaid, setSelectedRaid] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      killedBosses: [],
      droppedItems: [],
      notes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      toast({
        title: "Raid recorded",
        description: `${raids.find((r) => r.id === values.raidId)?.name} on ${format(values.date, "PPP")} has been recorded.`,
      })
      form.reset({
        date: new Date(),
        killedBosses: [],
        droppedItems: [],
        notes: "",
      })
      setSelectedRaid(null)
      setIsSubmitting(false)
    }, 1000)
  }

  const handleRaidChange = (raidId: string) => {
    setSelectedRaid(raidId)
    form.setValue("killedBosses", [])
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="raidId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raid</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  handleRaidChange(value)
                }}
                defaultValue={field.value}
              >
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

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Raid Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedRaid && (
          <FormField
            control={form.control}
            name="killedBosses"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Killed Bosses</FormLabel>
                  <FormDescription>Select all bosses that were killed during the raid.</FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {bosses[selectedRaid as keyof typeof bosses]?.map((boss) => (
                    <FormField
                      key={boss.id}
                      control={form.control}
                      name="killedBosses"
                      render={({ field }) => {
                        return (
                          <FormItem key={boss.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(boss.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, boss.id])
                                    : field.onChange(field.value?.filter((value) => value !== boss.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{boss.name}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input placeholder="Optional notes about this raid" {...field} />
              </FormControl>
              <FormDescription>Any additional information about this raid</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Recording..." : "Record Raid"}
        </Button>
      </form>
    </Form>
  )
}

