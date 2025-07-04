"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function AuthLoadingPage() {
  const { data: session, status } = useSession()
  const [message, setMessage] = useState("Verifying your authentication...")
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    console.log("🔍 Auth Loading - Session status:", status)
    console.log("📝 Auth Loading - Session data:", JSON.stringify(session, null, 2))
    console.log("📝 Auth Loading - Attempts:", attempts)

    if (status === "loading") {
      setMessage("Loading your session...")
      return
    }

    if (!session?.user?.discordId) {
      console.log("❌ Auth Loading - No Discord ID found")
      if (attempts < 3) {
        setMessage(`Retrying authentication... (${attempts + 1}/3)`)
        setAttempts((prev) => prev + 1)
        // Wait and try again
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setMessage("Authentication failed. Redirecting to sign in...")
        setTimeout(() => {
          window.location.href = "/auth/signin"
        }, 2000)
      }
      return
    }

    console.log("✅ Auth Loading - Valid session found")
    setMessage("Authentication successful! Redirecting to dashboard...")
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1000)
  }, [session, status, attempts])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-orange-600" />
          <p className="text-gray-600">{message}</p>
          {session?.user && (
            <div className="text-sm text-gray-500">
              <p>Discord: {session.user.discordUsername || session.user.name}</p>
              <p>ID: {session.user.discordId}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
