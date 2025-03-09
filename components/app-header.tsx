import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <h1 className="text-xl font-bold">WoW CPSR Point Tracker</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <MainNav />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

