export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/dashboard/:path*", "/auth/success", "/auth/loading", "/api/auth/:path*"],
}
