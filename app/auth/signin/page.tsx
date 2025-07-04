"use client"

import { signIn, getSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Home } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is already signed in
    const checkSession = async () => {
      const session = await getSession()
      if (session?.user?.discordId) {
        window.location.href = "/dashboard"
      }
    }
    checkSession()
  }, [])

  const handleDiscordSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("discord", {
        callbackUrl: "/auth/callback",
        redirect: true,
      })
    } catch (error) {
      console.error("Sign in error:", error)
      setIsLoading(false)
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
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-600">Welcome Back</CardTitle>
          <CardDescription>Sign in to your United Roleplay account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleDiscordSignIn}
            disabled={isLoading}
            className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {isLoading ? "Signing in..." : "Continue with Discord"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            <p>
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-orange-600 hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
