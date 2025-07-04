"use client"

import type React from "react"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Crown, LogIn, AlertCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function SignInPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid username or password")
      } else {
        // Check if sign in was successful
        const session = await getSession()
        if (session) {
          router.push("/dashboard")
        }
      }
    } catch (error) {
      setError("An error occurred during sign in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-orange-600 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <Navigation />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600/30 to-orange-400/30 backdrop-blur-xl border border-orange-500/30 rounded-full px-6 py-3 mb-6">
              <Crown className="h-6 w-6 text-orange-300" />
              <span className="text-orange-200 font-semibold">UNITED SERVER</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Welcome Back</h1>
            <p className="text-orange-200">Sign in with your game account credentials</p>
          </div>

          <Card className="bg-gradient-to-br from-black/40 via-orange-950/40 to-black/40 backdrop-blur-xl border border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <LogIn className="h-6 w-6 text-orange-400" />
                Sign In
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-orange-200">
                    Game Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your game username"
                    className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50 focus:border-orange-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-orange-200">
                    Game Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your game password"
                    className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50 focus:border-orange-400"
                    required
                  />
                </div>

                {error && (
                  <Alert className="border-red-500/30 bg-red-500/10">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-red-300">{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-orange-300 text-sm">Use the same username and password from your in-game account</p>
                <p className="text-orange-400 text-xs mt-2">Don't have a game account? Create one in-game first</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
