import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/login"
  }
})

export const config = {
  matcher: [
    "/api/players/:path*",
    "/api/reservations/:path*",
    "/api/points/:path*"
  ]
}