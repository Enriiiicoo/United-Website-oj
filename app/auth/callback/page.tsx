"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Home, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CallbackPage() {
  const { data: session, status } = useSession()
  const [message, setMessage] = useState("Processing your authentication...")
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    console.log("🔍 Callback - Session status:", status)
    console.log("📝 Callback - Session data:", session)

    if (status === "loading") {
      setMessage("Loading your session...")
      return
    }

    if (!session?.user?.discordId) {
      console.log("❌ Callback - No Discord ID found")
      setMessage("Authentication failed. Redirecting...")
      setTimeout(() => {
        window.location.href = "/auth/signup"
      }, 2000)
      return
    }

    console.log("✅ Callback - Valid session found")
    setMessage("Authentication successful! Welcome!")
    setIsSuccess(true)

    // Redirect to dashboard after success
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 2000)
  }, [session, status])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="outline" className="bg-white">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center space-y-4">
          {isSuccess ? (
            <CheckCircle className="w-8 h-8 mx-auto text-green-600" />
          ) : (
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-orange-600" />
          )}

          <p className="text-gray-600">{message}</p>

          {session?.user && (
            <div className="text-sm text-gray-500 space-y-1">
              <p>Discord: {session.user.name}</p>
              <p>ID: {session.user.discordId}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
