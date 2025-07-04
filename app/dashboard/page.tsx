"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signOut } from "next-auth/react"
import { LogOut, User, Mail, MessageSquare, Gamepad2, CheckCircle, Loader2 } from "lucide-react"

interface UserProfile {
  id: number
  username: string
  email: string
  discordId: string
  discordUsername: string
  gameCharacterId?: string
  avatarUrl?: string
  isVerified: boolean
  isActive: boolean
  createdAt: string
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [gameId, setGameId] = useState("")
  const [linkingGame, setLinkingGame] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (session?.user?.discordId) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const data = await response.json()
        setProfile(data.user)
        setGameId(data.user.gameCharacterId || "")
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLinkGame = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gameId.trim()) return

    setLinkingGame(true)
    setMessage("")

    try {
      const response = await fetch("/api/user/link-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameCharacterId: gameId }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage("Game account linked successfully!")
        fetchProfile() // Refresh profile
      } else {
        setMessage(result.message || "Failed to link game account")
      }
    } catch (error) {
      setMessage("Failed to link game account")
    } finally {
      setLinkingGame(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Please sign in to access the dashboard.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-2xl mx-auto pt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-orange-600">Welcome to United Roleplay</CardTitle>
            <CardDescription>
              {profile ? "Your account is active and verified!" : "Complete your profile setup"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              {session.user.image && (
                <img src={session.user.image || "/placeholder.svg"} alt="Profile" className="w-16 h-16 rounded-full" />
              )}
              <div>
                <h3 className="text-lg font-semibold">{profile?.username || session.user.name}</h3>
                <p className="text-gray-600">{profile?.email || session.user.email}</p>
                {profile?.isVerified && (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified Account
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Username</p>
                  <p className="text-sm text-gray-600">{profile?.username || session.user.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">{profile?.email || session.user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Discord</p>
                  <p className="text-sm text-gray-600">{profile?.discordUsername || session.user.name}</p>
                  <p className="text-xs text-green-600">✓ Connected & Verified</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Gamepad2 className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="font-medium">Game Account</p>
                  {profile?.gameCharacterId ? (
                    <div>
                      <p className="text-sm text-gray-600">Character ID: {profile.gameCharacterId}</p>
                      <p className="text-xs text-green-600">✓ Linked</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Not linked</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Account Linking */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Link Game Account</CardTitle>
            <CardDescription>Connect your in-game character for full access</CardDescription>
          </CardHeader>
          <CardContent>
            {message && (
              <Alert className="mb-4">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLinkGame} className="space-y-4">
              <div>
                <Label htmlFor="gameId">Game Character ID</Label>
                <Input
                  id="gameId"
                  type="text"
                  placeholder="Enter your character ID"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  disabled={linkingGame}
                />
              </div>
              <Button type="submit" disabled={linkingGame || !gameId.trim()}>
                {linkingGame ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Linking...
                  </>
                ) : (
                  "Link Game Account"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <Button onClick={() => signOut({ callbackUrl: "/" })} variant="outline" className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
