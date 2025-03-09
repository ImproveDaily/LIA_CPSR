"use client"

import { useState } from "react"
import { RaidType } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast"
import { PlusCircle } from "lucide-react"
import { useSession } from "next-auth/react"

const formSchema = z.object({
  playerName: z.string().min(2, "Naam moet minimaal 2 karakters lang zijn"),
  playerClass: z.string().min(2, "Class moet minimaal 2 karakters lang zijn"),
  role: z.string().min(2, "Role moet minimaal 2 karakters lang zijn"),
  item: z.string().min(2, "Item moet minimaal 2 karakters lang zijn"),
  boss: z.string().min(2, "Boss moet minimaal 2 karakters lang zijn"),
})

interface NewReservationDialogProps {
  raidType: RaidType
  onReservationCreated: () => void
}

export function NewReservationDialog({ raidType, onReservationCreated }: NewReservationDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { data: session, status } = useSession({ required: true })
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: "",
      playerClass: "",
      role: "",
      item: "",
      boss: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!session?.user) {
        throw new Error("Niet ingelogd")
      }

      // Eerst de speler aanmaken/updaten
      const playerResponse = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.playerName,
          playerClass: values.playerClass,
          role: values.role,
        }),
      })

      if (!playerResponse.ok) {
        const error = await playerResponse.json()
        console.error("Player creation error:", error)
        throw new Error(error.error || "Failed to create/update player")
      }

      const player = await playerResponse.json()

      // Dan de reservering aanmaken met het playerId
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerId: player.id,
          raidType,
          item: values.item,
          boss: values.boss,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error("Reservation creation error:", error)
        throw new Error(error.error || "Failed to create reservation")
      }

      toast({
        title: "Success",
        description: "Reservering succesvol toegevoegd",
      })

      form.reset()
      setOpen(false)
      onReservationCreated()
    } catch (error) {
      console.error("Error creating reservation:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Er is een fout opgetreden bij het maken van de reservering",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nieuwe Reservering
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nieuwe Reservering</DialogTitle>
          <DialogDescription>
            Maak een nieuwe reservering voor {raidType.replace('_', ' ')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="playerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speler Naam</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="playerClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="boss"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Boss</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Toevoegen</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 