"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// User roles - can be expanded if needed
export type UserRole = "admin" | "member" | "guest"

interface User {
  id: string
  name: string
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

// Mock users for demo purposes - in a real app, this would come from a database
const MOCK_USERS = [
  { id: "1", name: "Admin User", role: "admin" as UserRole, password: "admin123" },
  { id: "2", name: "Regular Member", role: "member" as UserRole, password: "member123" },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("wow-cpsr-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user", error)
        localStorage.removeItem("wow-cpsr-user")
      }
    }
  }, [])

  const login = async (username: string, password: string) => {
    // Mock authentication
    const matchedUser = MOCK_USERS.find(
      (u) => u.name.toLowerCase() === username.toLowerCase() && u.password === password,
    )

    if (matchedUser) {
      const { password, ...userWithoutPassword } = matchedUser
      setUser(userWithoutPassword)
      localStorage.setItem("wow-cpsr-user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("wow-cpsr-user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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

