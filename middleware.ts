export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/staff/:path*",
    "/gallery/:path*",
    "/whitelist/:path*",
    "/auth/success",
    "/auth/loading",
    "/api/auth/:path*",
  ],
}
