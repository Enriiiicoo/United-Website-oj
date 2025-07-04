"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Shield, Gamepad2, MessageSquare, Settings, ExternalLink } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  image: string
  discordId: string
  gameUsername?: string
  whitelistStatus: "pending" | "approved" | "denied"
  joinedAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("Dashboard - Session status:", status)
    console.log("Dashboard - Session data:", session)

    if (status === "loading") {
      console.log("Dashboard - Session still loading...")
      return
    }

    if (status === "unauthenticated") {
      console.log("Dashboard - User not authenticated, redirecting to signin")
      router.push("/auth/signin")
      return
    }

    if (session?.user) {
      console.log("Dashboard - User authenticated, fetching profile")
      fetchUserProfile()
    }
  }, [session, status, router])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const profile = await response.json()
        console.log("Dashboard - Profile fetched:", profile)
        setUserProfile(profile)
      } else {
        console.error("Dashboard - Failed to fetch profile:", response.status)
      }
    } catch (error) {
      console.error("Dashboard - Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect in useEffect
  }

  const getWhitelistStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "denied":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-orange-600">{session.user?.name}</span>!
          </h1>
          <p className="text-gray-600 mt-2">Manage your United Roleplay account and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                  <AvatarFallback>
                    {session.user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{session.user?.name}</CardTitle>
                <CardDescription>{session.user?.email}</CardDescription>
                {userProfile && (
                  <Badge className={getWhitelistStatusColor(userProfile.whitelistStatus)}>
                    {userProfile.whitelistStatus.charAt(0).toUpperCase() + userProfile.whitelistStatus.slice(1)}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Discord Connected</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                </div>
                {userProfile?.gameUsername && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Game Account</span>
                    <Badge variant="outline">
                      <Gamepad2 className="w-3 h-3 mr-1" />
                      {userProfile.gameUsername}
                    </Badge>
                  </div>
                )}
                <Button className="w-full bg-transparent" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-orange-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="justify-start h-auto p-4 bg-transparent" variant="outline">
                    <div className="text-left">
                      <div className="font-medium">Link Game Account</div>
                      <div className="text-sm text-gray-500">Connect your in-game character</div>
                    </div>
                  </Button>
                  <Button className="justify-start h-auto p-4 bg-transparent" variant="outline">
                    <div className="text-left">
                      <div className="font-medium">Whitelist Status</div>
                      <div className="text-sm text-gray-500">Check application progress</div>
                    </div>
                  </Button>
                  <Button className="justify-start h-auto p-4 bg-transparent" variant="outline">
                    <div className="text-left">
                      <div className="font-medium">Support Ticket</div>
                      <div className="text-sm text-gray-500">Get help from staff</div>
                    </div>
                  </Button>
                  <Button className="justify-start h-auto p-4 bg-transparent" variant="outline">
                    <div className="text-left">
                      <div className="font-medium">Community Events</div>
                      <div className="text-sm text-gray-500">View upcoming events</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-orange-600" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <MessageSquare className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-green-800">Discord Account</p>
                        <p className="text-sm text-green-600">Successfully connected</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  {userProfile?.whitelistStatus === "pending" && (
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-yellow-600 mr-3" />
                        <div>
                          <p className="font-medium text-yellow-800">Whitelist Application</p>
                          <p className="text-sm text-yellow-600">Under review by staff</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                  )}

                  {userProfile?.whitelistStatus === "approved" && (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-green-800">Whitelist Status</p>
                          <p className="text-sm text-green-600">Approved - Welcome to the server!</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    </div>
                  )}

                  {!userProfile?.gameUsername && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <Gamepad2 className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-blue-800">Game Account</p>
                          <p className="text-sm text-blue-600">Link your in-game character</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Link Now
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Account created successfully</span>
                    <span className="text-gray-400 ml-auto">Just now</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Discord account connected</span>
                    <span className="text-gray-400 ml-auto">Just now</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
