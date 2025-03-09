import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RaidForm } from "@/components/raid-form"
import { RaidHistory } from "@/components/raid-history"

export default function RaidsPage() {
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
              <Button variant="ghost">Reservations</Button>
            </Link>
            <Link href="/raids">
              <Button variant="secondary">Raids</Button>
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
                <CardTitle>Record Raid</CardTitle>
                <CardDescription>Record a completed raid to update player points</CardDescription>
              </CardHeader>
              <CardContent>
                <RaidForm />
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Raid History</CardTitle>
                <CardDescription>View past raids and point updates</CardDescription>
              </CardHeader>
              <CardContent>
                <RaidHistory />
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

