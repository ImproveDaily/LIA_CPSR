import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayerList } from "@/components/player-list"
import { PlayerForm } from "@/components/player-form"

export default function PlayersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <h1 className="text-xl font-bold">WoW CPSR Tracker</h1>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/players">
              <Button variant="secondary">Players</Button>
            </Link>
            <Link href="/items">
              <Button variant="ghost">Items</Button>
            </Link>
            <Link href="/raids">
              <Button variant="ghost">Raids</Button>
            </Link>
            <Link href="/reservations">
              <Button variant="ghost">Reservations</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Add Player</CardTitle>
                <CardDescription>Add a new player to your guild roster.</CardDescription>
              </CardHeader>
              <CardContent>
                <PlayerForm />
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Guild Roster</CardTitle>
                <CardDescription>Manage your guild members.</CardDescription>
              </CardHeader>
              <CardContent>
                <PlayerList />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} WoW CPSR Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

