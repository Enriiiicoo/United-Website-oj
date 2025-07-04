"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { LogOut, User, Mail, MessageSquare, Gamepad2, CheckCircle, Loader2, Home } from "lucide-react"
import Link from "next/link"

interface UserProfile {
  id: number
  username: string
  email: string
  discordId: string
  discordUsername: string
  avatarUrl?: string
  isVerified: boolean
  isActive: boolean
  createdAt: string
  gameAccount?: {
    id: number
    username: string
    email: string
    registerDate: string
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Add debugging
  useEffect(() => {
    console.log("🔍 Dashboard - Session status:", status)
    console.log("📝 Dashboard - Session data:", JSON.stringify(session, null, 2))
  }, [session, status])

  useEffect(() => {
    console.log("🔍 Dashboard - Session status:", status)
    console.log("📝 Dashboard - Session data:", JSON.stringify(session, null, 2))

    if (status === "loading") {
      console.log("⏳ Dashboard - Session still loading...")
      return
    }

    if (!session?.user?.discordId) {
      console.log("❌ Dashboard - No Discord ID found, redirecting to signin")
      console.log("❌ Dashboard - Session:", session)
      console.log("❌ Dashboard - User:", session?.user)
      // Redirect to signin instead of home page
      window.location.href = "/auth/signin"
      return
    }

    console.log("✅ Dashboard - Valid session found, fetching profile")
    fetchProfile()
  }, [session, status])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const data = await response.json()
        setProfile(data.user)
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6 space-y-4">
            <p>Please sign in to access the dashboard.</p>
            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading your profile...</p>
          <Link href="/">
            <Button variant="outline">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      {/* Navigation Bar */}
      <nav className="max-w-2xl mx-auto mb-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Button variant="outline" className="bg-white">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-orange-600">Dashboard</h1>
          <div></div> {/* Spacer for centering */}
        </div>
      </nav>

      <div className="max-w-2xl mx-auto space-y-6">
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
                  {profile?.gameAccount ? (
                    <div>
                      <p className="text-sm text-gray-600">Username: {profile.gameAccount.username}</p>
                      <p className="text-sm text-gray-600">Email: {profile.gameAccount.email}</p>
                      <p className="text-sm text-gray-600">
                        Registered: {new Date(profile.gameAccount.registerDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-green-600">✓ Linked & Verified</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Not linked</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
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
