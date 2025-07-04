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
    if (status === "loading") return

    if (!session?.user?.discordId) {
      setMessage("Authentication failed. Redirecting...")
      setTimeout(() => {
        window.location.href = "/auth/signin"
      }, 2000)
      return
    }

    checkUserExists()
  }, [session, status])

  const checkUserExists = async () => {
    try {
      setMessage("Checking if you have an account...")

      const response = await fetch("/api/user/profile")

      if (response.ok) {
        // User exists, redirect to dashboard
        setMessage("Welcome back! Redirecting to dashboard...")
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1500)
      } else if (response.status === 404) {
        // User doesn't exist, redirect to signup
        setMessage("New user detected. Redirecting to signup...")
        setTimeout(() => {
          window.location.href = "/auth/signup"
        }, 1500)
      } else {
        throw new Error("Failed to check user status")
      }
    } catch (error) {
      console.error("Error checking user:", error)
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
