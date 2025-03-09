import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReservationList } from "@/components/reservation-list"
import { ReservationImport } from "@/components/reservation-import"

export default function ReservationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <h1 className="text-xl font-bold">WoW CPSR Point Tracker</h1>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/reservations">
              <Button variant="secondary">Reservations</Button>
            </Link>
            <Link href="/raids">
              <Button variant="ghost">Raids</Button>
            </Link>
            <Link href="/points">
              <Button variant="ghost">Point Tracker</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Import Reservations</CardTitle>
                <CardDescription>Import reservations from the raidres.fly.dev CSV export</CardDescription>
              </CardHeader>
              <CardContent>
                <ReservationImport />
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Current Reservations</CardTitle>
                <CardDescription>View all current item reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <ReservationList />
              </CardContent>
            </Card>
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
  )
}

