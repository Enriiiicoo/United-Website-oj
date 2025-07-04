"use client"

import { signIn, getSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquare, Home } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [gameCredentials, setGameCredentials] = useState({
    username: "",
    email: "",
  })

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

  const handleDiscordSignUp = async () => {
    setIsLoading(true)
    try {
      // Store game credentials in localStorage for the callback
      if (gameCredentials.username && gameCredentials.email) {
        localStorage.setItem("gameCredentials", JSON.stringify(gameCredentials))
      }

      await signIn("discord", {
        callbackUrl: "/auth/callback",
        redirect: true,
      })
    } catch (error) {
      console.error("Sign up error:", error)
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
          <CardTitle className="text-2xl font-bold text-orange-600">Join United Roleplay</CardTitle>
          <CardDescription>Create your account and link your game character</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="game-username">Game Username (Optional)</Label>
              <Input
                id="game-username"
                placeholder="Your in-game username"
                value={gameCredentials.username}
                onChange={(e) => setGameCredentials((prev) => ({ ...prev, username: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="game-email">Game Email (Optional)</Label>
              <Input
                id="game-email"
                type="email"
                placeholder="Email used for your game account"
                value={gameCredentials.email}
                onChange={(e) => setGameCredentials((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <p className="text-xs text-gray-600">
              Providing your game credentials helps us link your accounts automatically.
            </p>
          </div>

          <Button
            onClick={handleDiscordSignUp}
            disabled={isLoading}
            className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {isLoading ? "Creating account..." : "Sign up with Discord"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-orange-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
