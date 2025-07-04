"use client"

import type React from "react"
import { signIn, useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, MessageSquare, Loader2, AlertTriangle } from "lucide-react"

export default function SignUpPage() {
  const { data: session, status } = useSession()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gameUsername: "",
    gamePassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Pre-fill email from Discord if available
  useEffect(() => {
    if (session?.user?.email && !formData.email) {
      setFormData((prev) => ({ ...prev, email: session.user.email || "" }))
    }
  }, [session, formData.email])

  const isDiscordLinked = !!session?.user?.discordId

  const handleDiscordConnect = async () => {
    setIsLoading(true)
    setError("")
    try {
      await signIn("discord", {
        callbackUrl: window.location.href,
      })
    } catch (err) {
      console.error("Discord sign-in error:", err)
      setError("Failed to connect Discord. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!isDiscordLinked) {
      setError("Please link your Discord account first!")
      return
    }

    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.gameUsername.trim() ||
      !formData.gamePassword.trim()
    ) {
      setError("All fields are required!")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting...")
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 2000)
      } else {
        setError(result.message || "Registration failed")
      }
    } catch (err) {
      console.error("Registration error:", err)
      setError("Registration failed. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-600">Join United Roleplay</CardTitle>
          <CardDescription>Create your account and link your Discord for verification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {/* Discord Connection Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Discord Account (Required)</Label>
            {!isDiscordLinked ? (
              <Button
                onClick={handleDiscordConnect}
                disabled={isLoading}
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Connect Discord Account
                  </>
                )}
              </Button>
            ) : (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <div className="flex items-center justify-between">
                    <span>
                      Connected as <strong>{session.user.discordUsername || session.user.name}</strong>
                    </span>
                    {session.user.image && (
                      <img
                        src={session.user.image || "/placeholder.svg"}
                        alt="Discord Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                type="text"
                placeholder="Your display name"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gameUsername">Game Username *</Label>
                <Input
                  id="gameUsername"
                  type="text"
                  placeholder="Your in-game username"
                  value={formData.gameUsername}
                  onChange={(e) => setFormData({ ...formData, gameUsername: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gamePassword">Game Password *</Label>
                <Input
                  id="gamePassword"
                  type="password"
                  placeholder="Your in-game password"
                  value={formData.gamePassword}
                  onChange={(e) => setFormData({ ...formData, gamePassword: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={!isDiscordLinked || isLoading || !!success}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-orange-600 hover:underline">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
