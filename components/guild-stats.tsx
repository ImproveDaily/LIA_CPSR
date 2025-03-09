"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Sample data - would be replaced with actual data from your database
const reservationsByClass = [
  { name: "Warrior", value: 8, color: "#C79C6E" },
  { name: "Paladin", value: 5, color: "#F58CBA" },
  { name: "Hunter", value: 7, color: "#ABD473" },
  { name: "Rogue", value: 6, color: "#FFF569" },
  { name: "Priest", value: 4, color: "#FFFFFF" },
  { name: "Shaman", value: 3, color: "#0070DE" },
  { name: "Mage", value: 5, color: "#69CCF0" },
  { name: "Warlock", value: 4, color: "#9482C9" },
  { name: "Druid", value: 3, color: "#FF7D0A" },
]

const topReservedItems = [
  { name: "Thunderfury", count: 12 },
  { name: "Ashes of Al'ar", count: 10 },
  { name: "Warglaive of Azzinoth", count: 8 },
  { name: "Val'anyr", count: 7 },
  { name: "Shadowmourne", count: 6 },
]

export function GuildStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Guild Statistics</CardTitle>
        <CardDescription>Overview of current reservations and loot distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="classes">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="classes">Reservations by Class</TabsTrigger>
            <TabsTrigger value="items">Top Reserved Items</TabsTrigger>
          </TabsList>
          <TabsContent value="classes" className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reservationsByClass}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {reservationsByClass.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} reservations`, name]}
                  contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "none" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="items" className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topReservedItems} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip
                  formatter={(value) => [`${value} reservations`]}
                  contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "none" }}
                />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

