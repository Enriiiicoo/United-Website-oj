"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react"

export default function AuthCallbackPage() {
  const { data: session, status } = useSession()
  const [checking, setChecking] = useState(true)
  const [message, setMessage] = useState("Checking your account...")

  useEffect(() => {
    console.log("🔍 Callback Page - Session status:", status)
    console.log("📝 Callback Page - Session data:", JSON.stringify(session, null, 2))

    if (status === "loading") {
      console.log("⏳ Callback Page - Still loading session...")
      return
    }

    if (!session?.user?.discordId) {
      console.log("❌ Callback Page - No Discord ID found")
      setMessage("Authentication failed. Redirecting...")
      setTimeout(() => {
        window.location.href = "/auth/signin"
      }, 2000)
      return
    }

    console.log("✅ Callback Page - Discord ID found:", session.user.discordId)
    checkUserExists()
  }, [session, status])

  const checkUserExists = async () => {
    try {
      console.log("🔍 Callback Page - Checking if user exists...")
      setMessage("Checking if you have an account...")

      const response = await fetch("/api/user/profile")
      console.log("📝 Callback Page - Profile API response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("✅ Callback Page - User exists:", data)
        setMessage("Welcome back! Redirecting to dashboard...")
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1500)
      } else if (response.status === 404) {
        console.log("❌ Callback Page - User not found, redirecting to signup")
        setMessage("New user detected. Redirecting to signup...")
        setTimeout(() => {
          window.location.href = "/auth/signup"
        }, 1500)
      } else {
        const errorData = await response.json()
        console.error("❌ Callback Page - API error:", errorData)
        throw new Error("Failed to check user status")
      }
    } catch (error) {
      console.error("❌ Callback Page - Error:", error)
      setMessage("Something went wrong. Please try again.")
      setTimeout(() => {
        window.location.href = "/auth/signin"
      }, 3000)
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center space-y-4">
          {checking ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-orange-600" />
              <p className="text-gray-600">{message}</p>
            </>
          ) : (
            <>
              {message.includes("Welcome") ? (
                <CheckCircle className="w-8 h-8 mx-auto text-green-600" />
              ) : (
                <AlertTriangle className="w-8 h-8 mx-auto text-orange-600" />
              )}
              <p className="text-gray-600">{message}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
