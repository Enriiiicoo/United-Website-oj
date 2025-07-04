"use client"

import type React from "react"
import { SessionProvider } from "next-auth/react"

export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  )
}
