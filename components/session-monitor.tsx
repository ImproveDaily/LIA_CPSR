"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"

// Waarschuw 5 minuten voor het verlopen van de sessie
const WARNING_TIME = 5 * 60 * 1000 // 5 minuten in milliseconden
const SESSION_LENGTH = 30 * 24 * 60 * 60 * 1000 // 30 dagen in milliseconden

export function SessionMonitor() {
  const { data: session } = useSession()
  const [warned, setWarned] = useState(false)

  useEffect(() => {
    if (!session) return

    // Bereken wanneer de sessie verloopt
    const sessionStart = new Date(session.expires).getTime() - SESSION_LENGTH
    const expiryTime = new Date(session.expires).getTime()
    const warningTime = expiryTime - WARNING_TIME

    // Stel de waarschuwing timer in
    const warningTimeout = setTimeout(() => {
      if (!warned) {
        toast({
          title: "Sessie verloopt bijna",
          description: "Je sessie verloopt over 5 minuten. Sla je werk op en ververs de pagina om door te gaan.",
          duration: 10000, // Toon 10 seconden
        })
        setWarned(true)
      }
    }, Math.max(0, warningTime - Date.now()))

    return () => {
      clearTimeout(warningTimeout)
    }
  }, [session, warned])

  return null
} 