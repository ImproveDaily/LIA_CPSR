"use client"

import { AppHeader } from "@/components/app-header"
import { ProtectedPage } from "@/components/protected-page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminPointsManagement } from "@/components/admin-points-management"
import { AdminReservationManagement } from "@/components/admin-reservation-management"
import { AdminRaidManagement } from "@/components/admin-raid-management"

export default function AdminPage() {
  return (
    <ProtectedPage requireAdmin={true}>
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex-1">
          <div className="container py-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Manage the CPSR point tracking system for your guild</CardDescription>
              </CardHeader>
            </Card>

            <Tabs defaultValue="points" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="points">Points Management</TabsTrigger>
                <TabsTrigger value="reservations">Reservations</TabsTrigger>
                <TabsTrigger value="raids">Raids</TabsTrigger>
              </TabsList>

              <TabsContent value="points">
                <Card>
                  <CardHeader>
                    <CardTitle>Points Management</CardTitle>
                    <CardDescription>Add, edit, or reset points for player reservations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminPointsManagement />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reservations">
                <Card>
                  <CardHeader>
                    <CardTitle>Reservations Management</CardTitle>
                    <CardDescription>Manage player item reservations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminReservationManagement />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="raids">
                <Card>
                  <CardHeader>
                    <CardTitle>Raid Management</CardTitle>
                    <CardDescription>Manage raids and attendance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminRaidManagement />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <footer className="border-t py-4">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} WoW CPSR Point Tracker. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ProtectedPage>
  )
}

