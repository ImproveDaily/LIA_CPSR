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
      {isAdmin && (
        <Link href="/admin">
          <Button variant={pathname === "/admin" ? "secondary" : "ghost"}>Admin</Button>
        </Link>
      )}
    </nav>
  )
}

