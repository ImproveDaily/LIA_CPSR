"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Minus, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { useAuth } from "./auth-provider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Error } from "@/components/ui/error"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Class colors for WoW
const classColors: Record<string, string> = {
  Warrior: "bg-[#C79C6E] text-white",
  Paladin: "bg-[#F58CBA] text-white",
  Hunter: "bg-[#ABD473] text-white",
  Rogue: "bg-[#FFF569] text-black",
  Priest: "bg-[#FFFFFF] text-black",
  Shaman: "bg-[#0070DE] text-white",
  Mage: "bg-[#69CCF0] text-white",
  Warlock: "bg-[#9482C9] text-white",
  Druid: "bg-[#FF7D0A] text-white",
  "Death Knight": "bg-[#C41E3A] text-white",
}

// Types
interface ErrorProps {
  message: string
  title?: string
  variant?: 'default' | 'destructive'
}

interface Reservation {
  id: string
  playerId: string
  player: {
    name: string
    class: string
    spec: string
  }
  item: string
  boss: string
  raid: string
  comment: string
  createdAt: string
}

interface ApiError {
  message: string
  error?: string | Record<string, unknown>
  statusCode?: number
}

interface ApiResponse<T> {
  data: T | null
  error?: ApiError
  message?: string
  statusCode?: number
}

interface ReservationsResponse {
  reservations: Reservation[]
  raids: string[]
}

interface PlayerPoints {
  name: string
  points: number
  items: { item: string, points: number }[]
}

type SortableKey = keyof Pick<Reservation, 'item' | 'boss' | 'raid' | 'createdAt'> | 'player'

interface SortConfig {
  key: SortableKey | null
  direction: 'asc' | 'desc'
}

export function PointTracker() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [raids, setRaids] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRaid, setSelectedRaid] = useState<string>("")
  const [playerPoints, setPlayerPoints] = useState<Record<string, PlayerPoints>>({})
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' })
  const { isAdmin, user } = useAuth()

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        await Promise.all([fetchReservations(), fetchPoints()])
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [selectedRaid])

  useEffect(() => {
    if (raids.length > 0 && !selectedRaid) {
      setSelectedRaid(raids[0])
    }
  }, [raids, selectedRaid])

  const handleError = (error: unknown) => {
    const errorProps: ErrorProps = {
      message: error instanceof Error 
        ? error.message 
        : typeof error === 'string'
          ? error
          : error && typeof error === 'object' && 'message' in error
            ? String((error as { message: unknown }).message)
            : "Er is een onverwachte fout opgetreden",
      title: "Fout",
      variant: "destructive"
    }
    
    toast(errorProps)
    setError(errorProps.message)
  }

  const handleApiError = (result: ApiResponse<unknown>) => {
    const errorMessage = result.error?.message || result.message || "Er is een onverwachte fout opgetreden"
    const errorProps: ErrorProps = {
      message: errorMessage,
      title: "Fout",
      variant: "destructive"
    }
    toast(errorProps)
    setError(errorMessage)
  }

  const fetchReservations = async () => {
    try {
      if (!selectedRaid) {
        // Haal alleen de raids op als we nog geen raid geselecteerd hebben
        const response = await fetch('/api/reservations')
        const result = await parseApiResponse<ReservationsResponse>(response)
        
        if (!response.ok || result.error) {
          console.error('API error:', result.error || 'Unknown error')
          handleApiError(result)
          return
        }
        
        if (result.data?.raids) {
          setRaids(result.data.raids)
          if (result.data.raids.length > 0) {
            setSelectedRaid(result.data.raids[0])
          }
        }
        return
      }

      const url = `/api/reservations?raid=${encodeURIComponent(selectedRaid)}`
      
      console.log('Fetching reservations from:', url)
      const response = await fetch(url)
      console.log('Response status:', response.status)
      
      const result = await parseApiResponse<ReservationsResponse>(response)
      console.log('Parsed API response:', result)
      
      if (!response.ok || result.error) {
        console.error('API error:', result.error || 'Unknown error')
        handleApiError(result)
        return
      }
      
      if (!result.data?.reservations?.length) {
        console.log('No reservations found in response')
        setError("Geen reserveringen gevonden voor deze raid")
        setReservations([])
      } else {
        console.log('Found reservations:', result.data.reservations.length)
        setReservations(result.data.reservations)
        setError(null)
      }

      // Update raids lijst alleen als we nieuwe raids hebben ontvangen
      if (result.data?.raids?.length) {
        console.log('Found raids:', result.data.raids)
        setRaids(result.data.raids)
      }
      
      // Bereken punten per speler
      const pointsRecord: Record<string, PlayerPoints> = {}
      if (result.data?.reservations) {
        result.data.reservations.forEach((res: Reservation) => {
          if (!pointsRecord[res.playerId]) {
            pointsRecord[res.playerId] = {
              name: res.player.name,
              points: 0,
              items: []
            }
          }
          pointsRecord[res.playerId].items.push({ item: res.item, points: 10 })
          pointsRecord[res.playerId].points += 10
        })
      }
      console.log('Calculated points:', pointsRecord)
      setPlayerPoints(pointsRecord)
    } catch (err) {
      console.error('Error in fetchReservations:', err)
      handleError(err)
    }
  }

  const fetchPoints = async () => {
    try {
      const response = await fetch('/api/points')
      if (!response.ok) {
        const error: ErrorProps = {
          message: `HTTP error! status: ${response.status}`,
          title: "Fout",
          variant: "destructive"
        }
        throw error
      }
      const result = await parseApiResponse<Record<string, PlayerPoints>>(response)
      if (result.data) {
        setPlayerPoints(result.data)
      }
    } catch (error) {
      console.error('Error fetching points:', error)
      const errorProps: ErrorProps = {
        message: error instanceof Error ? error.message : "Er is een probleem opgetreden bij het ophalen van de punten",
        title: "Fout bij ophalen van punten",
        variant: "destructive"
      }
      toast(errorProps)
    }
  }

  const addPoints = async (reservation: Reservation) => {
    try {
      const response = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId: reservation.playerId,
          item: reservation.item,
          boss: reservation.boss,
          raid: reservation.raid,
        }),
      })

      const result = await parseApiResponse<unknown>(response)
      
      if (!response.ok || result.error) {
        handleApiError(result)
        return
      }

      await fetchPoints()
      toast({
        title: "Punten toegevoegd",
        description: `10 punten toegevoegd voor ${reservation.player.name}`,
      })
    } catch (err) {
      handleError(err)
    }
  }

  const removePoints = async (reservation: Reservation) => {
    try {
      const response = await fetch(`/api/points?playerId=${reservation.playerId}&item=${reservation.item}&boss=${reservation.boss}&raid=${reservation.raid}`, {
        method: "DELETE",
      })

      const result = await parseApiResponse<unknown>(response)
      
      if (!response.ok || result.error) {
        handleApiError(result)
        return
      }

      await fetchPoints()
      toast({
        title: "Punten verwijderd",
        description: `10 punten verwijderd voor ${reservation.player.name}`,
      })
    } catch (err) {
      handleError(err)
    }
  }

  const deleteReservation = async (reservationId: string) => {
    try {
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: "DELETE",
      })

      const result = await parseApiResponse<unknown>(response)
      
      if (!response.ok || result.error) {
        handleApiError(result)
        return
      }

      // Ververs de reserveringen
      await fetchReservations()
      toast({
        title: "Reservering verwijderd",
        description: "De reservering is succesvol verwijderd",
      })
    } catch (err) {
      handleError(err)
    }
  }

  const getSortedReservations = () => {
    if (!sortConfig.key) return reservations

    return [...reservations].sort((a, b) => {
      if (sortConfig.key === 'player') {
        const aValue = a.player.name.toLowerCase()
        const bValue = b.player.name.toLowerCase()
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      const key = sortConfig.key as keyof Omit<Reservation, 'player'>
      const aValue = String(a[key]).toLowerCase()
      const bValue = String(b[key]).toLowerCase()
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    })
  }

  const handleSort = (key: SortableKey) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const getSortIcon = (key: SortableKey) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="ml-2 h-4 w-4" />
      : <ArrowDown className="ml-2 h-4 w-4" />
  }

  const parseApiResponse = async <T,>(response: Response): Promise<ApiResponse<T>> => {
    try {
      const responseText = await response.text()
      console.log('Raw API response:', responseText)
      
      const result = JSON.parse(responseText)
      console.log('Parsed JSON:', result)
      
      // Als de response een array is of direct een object zonder data/error structuur
      if (Array.isArray(result) || !('data' in result)) {
        return {
          data: result as T,
          error: undefined,
          statusCode: response.status
        }
      }
      
      // Anders, gebruik de standaard data/error structuur
      return {
        data: 'data' in result ? (result.data as T) : null,
        error: 'error' in result && result.error ? { 
          message: String(
            result.error && typeof result.error === 'object' && 'message' in result.error 
              ? result.error.message 
              : result.error
          ),
          ...(typeof result.error === 'object' ? result.error as Record<string, unknown> : {})
        } : undefined,
        message: 'message' in result ? String(result.message) : undefined,
        statusCode: response.status
      }
    } catch (err) {
      console.error('Error parsing API response:', err)
      return {
        data: null,
        error: { message: "Failed to parse server response" },
        statusCode: response.status
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-')
  }

  const calculatePoints = (playerId: string, item: string) => {
    const player = playerPoints[playerId]
    if (!player) return 0
    
    // Vind alle items met dezelfde naam en tel de punten op
    return player.items
      .filter(i => i.item === item)
      .reduce((total, i) => total + i.points, 0)
  }

  if (loading) return <div>Laden...</div>
  
  return (
    <div className="container pr-8 lg:pr-16 py-8 min-w-fit">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/50 p-6 rounded-lg">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold">Current Point Standings</h2>
            <p className="text-muted-foreground">Overview of current point standings per player and item</p>
            {user && (
              <p className="text-sm text-muted-foreground">
                Ingelogd als: {user.username} ({user.role})
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <Input
              placeholder="Zoek speler..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[250px]"
            />
            <Select value={selectedRaid} onValueChange={setSelectedRaid}>
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder="Selecteer raid" />
              </SelectTrigger>
              <SelectContent>
                {raids.map((raid) => (
                  <SelectItem key={raid} value={raid}>
                    {raid}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Reserveringen en Punten</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort('player')} className="cursor-pointer w-[200px]">
                    Speler {getSortIcon('player')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('item')} className="cursor-pointer w-[300px]">
                    Item {getSortIcon('item')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('boss')} className="cursor-pointer w-[200px]">
                    Boss {getSortIcon('boss')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('raid')} className="cursor-pointer w-[200px]">
                    Raid {getSortIcon('raid')}
                  </TableHead>
                  <TableHead onClick={() => handleSort('createdAt')} className="cursor-pointer w-[200px]">
                    Datum {getSortIcon('createdAt')}
                  </TableHead>
                  <TableHead className="text-right w-[120px]">Punten</TableHead>
                  {isAdmin && <TableHead className="w-[180px] text-right">Acties</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {getSortedReservations()
                  .filter((res) => {
                    const searchLower = searchQuery.toLowerCase()
                    return (
                      res.player.name.toLowerCase().includes(searchLower) ||
                      res.item.toLowerCase().includes(searchLower) ||
                      res.boss.toLowerCase().includes(searchLower) ||
                      res.raid.toLowerCase().includes(searchLower)
                    )
                  })
                  .map((reservation) => {
                    const playerPoint = playerPoints[reservation.playerId]
                    const itemPoints = playerPoint?.items?.find(i => i.item === reservation.item)?.points || 0
                    
                    return (
                      <TableRow key={reservation.id}>
                        <TableCell className="font-medium">{reservation.player.name}</TableCell>
                        <TableCell>{reservation.item}</TableCell>
                        <TableCell>{reservation.boss}</TableCell>
                        <TableCell>{reservation.raid}</TableCell>
                        <TableCell>{formatDate(reservation.createdAt)}</TableCell>
                        <TableCell className="text-right">{calculatePoints(reservation.playerId, reservation.item)}</TableCell>
                        {isAdmin && (
                          <TableCell>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => addPoints(reservation)}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removePoints(reservation)}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => deleteReservation(reservation.id)}
                                className="bg-gray-500 hover:bg-gray-600 text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

