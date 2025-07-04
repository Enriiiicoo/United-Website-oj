"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Home } from "lucide-react"
import Link from "next/link"

export default function CallbackPage() {
  const { data: session, status } = useSession()
  const [message, setMessage] = useState("Processing your authentication...")
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    console.log("🔍 Callback - Session status:", status)
    console.log("📝 Callback - Session data:", JSON.stringify(session, null, 2))

    if (status === "loading") {
      setMessage("Loading your session...")
      return
    }

    if (!session?.user?.discordId) {
      console.log("❌ Callback - No Discord ID found")
      setMessage("Authentication failed. Please try again.")
      setIsProcessing(false)
      setTimeout(() => {
        window.location.href = "/auth/signup"
      }, 3000)
      return
    }

    console.log("✅ Callback - Valid session found")
    processRegistration()
  }, [session, status])

  const processRegistration = async () => {
    try {
      setMessage("Creating your account...")

      // Get game credentials from localStorage if they exist
      const gameCredentials = localStorage.getItem("gameCredentials")
      const parsedCredentials = gameCredentials ? JSON.parse(gameCredentials) : null

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          discordId: session?.user?.discordId,
          username: session?.user?.name,
          email: session?.user?.email,
          discordUsername: session?.user?.discordUsername || session?.user?.name,
          avatarUrl: session?.user?.image,
          gameCredentials: parsedCredentials,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("✅ Registration successful:", data)
        setMessage("Account created successfully! Redirecting...")

        // Clean up localStorage
        localStorage.removeItem("gameCredentials")

        setTimeout(() => {
          window.location.href = "/auth/success"
        }, 1000)
      } else {
        console.error("❌ Registration failed:", data)
        if (data.error === "User already exists") {
          setMessage("Welcome back! Redirecting to dashboard...")
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 1000)
        } else {
          setMessage("Registration failed. Please try again.")
          setIsProcessing(false)
        }
      }
    } catch (error) {
      console.error("Registration error:", error)
      setMessage("An error occurred. Please try again.")
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      {/* Navigation */}
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
          {isProcessing ? (
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-orange-600" />
          ) : (
            <div className="w-8 h-8 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600">!</span>
            </div>
          )}
          <p className="text-gray-600">{message}</p>
          {session?.user && (
            <div className="text-sm text-gray-500">
              <p>Discord: {session.user.discordUsername || session.user.name}</p>
              <p>ID: {session.user.discordId}</p>
            </div>
          )}
          {!isProcessing && (
            <div className="space-y-2">
              <Link href="/auth/signup">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Try Again</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
