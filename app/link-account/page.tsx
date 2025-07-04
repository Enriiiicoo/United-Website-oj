"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navigation } from "@/components/navigation"
import { AnimatedSection } from "@/components/animated-section"
import { Link2, User, Lock, CheckCircle, AlertCircle } from "lucide-react"

export default function LinkAccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [gameUsername, setGameUsername] = useState("")
  const [gamePassword, setGamePassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-orange-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    router.push("/auth/signin")
    return null
  }

  const handleLinkAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/link-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          discordId: session.user.discordId, // Automatically use Discord ID from session
          gameUsername,
          gamePassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Account linked successfully!")
        setMessageType("success")
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setMessage(data.error || "Failed to link account")
        setMessageType("error")
      }
    } catch (error) {
      setMessage("An error occurred while linking your account")
      setMessageType("error")
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
        <AnimatedSection animation="slideUp">
          <div className="max-w-md mx-auto">
            <Card className="bg-gradient-to-br from-black/40 via-orange-950/40 to-black/40 backdrop-blur-xl border border-orange-500/30">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-orange-500/20 rounded-full">
                    <Link2 className="h-8 w-8 text-orange-400" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-white">Link Game Account</CardTitle>
                <p className="text-orange-200">Connect your Discord account to your game account</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Discord Info Display */}
                <div className="bg-black/30 rounded-lg p-4 border border-orange-500/20">
                  <div className="flex items-center gap-3">
                    <img
                      src={session.user?.image || "/placeholder-user.jpg"}
                      alt="Discord avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-white font-medium">{session.user?.name}</p>
                      <p className="text-orange-300 text-sm">Discord ID: {session.user.discordId}</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleLinkAccount} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gameUsername" className="text-orange-200">
                      Game Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400" />
                      <Input
                        id="gameUsername"
                        type="text"
                        value={gameUsername}
                        onChange={(e) => setGameUsername(e.target.value)}
                        className="pl-10 bg-black/30 border-orange-500/30 text-white placeholder-orange-300/50 focus:border-orange-400"
                        placeholder="Enter your game username"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gamePassword" className="text-orange-200">
                      Game Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400" />
                      <Input
                        id="gamePassword"
                        type="password"
                        value={gamePassword}
                        onChange={(e) => setGamePassword(e.target.value)}
                        className="pl-10 bg-black/30 border-orange-500/30 text-white placeholder-orange-300/50 focus:border-orange-400"
                        placeholder="Enter your game password"
                        required
                      />
                    </div>
                  </div>

                  {message && (
                    <Alert
                      className={`border ${messageType === "success" ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"}`}
                    >
                      {messageType === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-400" />
                      )}
                      <AlertDescription className={messageType === "success" ? "text-green-300" : "text-red-300"}>
                        {message}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    {isLoading ? "Linking Account..." : "Link Account"}
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-orange-300 text-sm">
                    This will connect your Discord account to your existing game account
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
