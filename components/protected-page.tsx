"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedPageProps {
  children: ReactNode
  requireAdmin?: boolean
}

export function ProtectedPage({ children, requireAdmin = false }: ProtectedPageProps) {
  const { isAuthenticated, isAdmin, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        await router.replace("/login")
        return
      }

      // If admin required but user is not admin, redirect to home
      if (requireAdmin && !isAdmin) {
        await router.replace("/")
      }
    }

    checkAuth()
  }, [isAuthenticated, isAdmin, requireAdmin, router])

  // Show loading state while checking auth
  if (!isAuthenticated || (requireAdmin && !isAdmin)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return <>{children}</>
}

