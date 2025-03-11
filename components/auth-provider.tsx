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
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("wow-cpsr-user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse stored user", error)
        localStorage.removeItem("wow-cpsr-user")
        setIsAuthenticated(false)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      if (username === 'admin' && password === 'admin') {
        const newUser = {
          id: '1',
          username: 'admin',
          role: 'admin' as UserRole
        }
        setUser(newUser)
        setIsAuthenticated(true)
        localStorage.setItem("wow-cpsr-user", JSON.stringify(newUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Login failed", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("wow-cpsr-user")
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

