"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function LinkAccountPage() {
  const { data: session, status } = useSession()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    redirect("/auth/signin")
  }

  const handleLinkAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/link-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: data.message })
        setUsername("")
        setPassword("")
      } else {
        setMessage({ type: "error", text: data.error })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while linking your account" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Link Game Account</CardTitle>
          <CardDescription className="text-gray-300">
            Connect your Discord account with your in-game account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">Logged in as:</p>
            <p className="text-white font-semibold">
              {session.user.username}#{session.user.discriminator}
            </p>
          </div>

          <form onSubmit={handleLinkAccount} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Game Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your in-game username"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Game Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your in-game password"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>

            {message && (
              <Alert
                className={`${
                  message.type === "success"
                    ? "bg-green-500/20 border-green-500/50 text-green-100"
                    : "bg-red-500/20 border-red-500/50 text-red-100"
                }`}
              >
                {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Linking Account...
                </>
              ) : (
                "Link Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/dashboard" className="text-blue-400 hover:text-blue-300 text-sm underline">
              Back to Dashboard
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
