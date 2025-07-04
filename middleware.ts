import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // This function runs for protected routes
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/signin (sign in page)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|auth/signin).*)",
  ],
}
