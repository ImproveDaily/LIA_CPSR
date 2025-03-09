"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useAuth } from "./auth-provider"

export function MainNav() {
  const pathname = usePathname()
  const { isAdmin } = useAuth()

  return (
    <nav className="flex items-center gap-4">
      <Link href="/reservations">
        <Button variant={pathname === "/reservations" ? "secondary" : "ghost"}>Reservations</Button>
      </Link>
      <Link href="/raids">
        <Button variant={pathname === "/raids" ? "secondary" : "ghost"}>Raids</Button>
      </Link>
      <Link href="/points">
        <Button variant={pathname === "/points" ? "secondary" : "ghost"}>Point Tracker</Button>
      </Link>
      {isAdmin && (
        <Link href="/admin">
          <Button variant={pathname === "/admin" ? "secondary" : "ghost"}>Admin</Button>
        </Link>
      )}
    </nav>
  )
}

