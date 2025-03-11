"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PointTracker } from "@/components/point-tracker"
import { ReservationImport } from "@/components/reservation-import"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { AppHeader } from "@/components/app-header"
import { ProtectedPage } from "@/components/protected-page"

export default function Home() {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) return null

  return (
    <ProtectedPage>
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex-1">
          <div className="container py-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>CPSR Point Tracker</CardTitle>
                  <CardDescription>
                    Track cumulative points for soft reserves. Players get +10 points each time their reserved item
                    doesn't drop.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-sm text-muted-foreground">How it works:</p>
                  <ul className="ml-6 mt-2 list-disc text-sm text-muted-foreground">
                    <li>Each player can reserve specific items</li>
                    <li>
                      When a raid completes and the item doesn't drop (or the player doesn't win it), they get +10
                      points
                    </li>
                    <li>Points accumulate for the same item reservation</li>
                    <li>If a player changes their reservation to a different item, points reset to 0</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-12">
                {isAdmin && (
                  <Card className="md:col-span-4">
                    <CardHeader>
                      <CardTitle>Import Reservations</CardTitle>
                      <CardDescription>Import reservations from the raidres.fly.dev CSV export</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ReservationImport />
                    </CardContent>
                  </Card>
                )}
                <Card className={isAdmin ? "md:col-span-8" : "md:col-span-12"}>
                  <CardHeader>
                    <CardTitle>Current Point Standings</CardTitle>
                    <CardDescription>Overview of current point standings per player and item</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PointTracker />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <footer className="border-t py-4">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} WoW CPSR Point Tracker. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ProtectedPage>
  )
}

