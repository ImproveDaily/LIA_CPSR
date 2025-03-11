"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// User roles - can be expanded if needed
export type UserRole = "admin" | "member" | "guest"

interface User {
  id: string
  username: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("wow-cpsr-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse stored user", error)
        localStorage.removeItem("wow-cpsr-user")
      }
    }
  }, [])

  const login = async (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("wow-cpsr-user")
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin: user?.role === "admin",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

