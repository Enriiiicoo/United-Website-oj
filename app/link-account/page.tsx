"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Crown, Search, Link, User, ExternalLink, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { Navigation } from "@/components/navigation"

interface DiscordUser {
  discordId: string
  username: string
  displayName: string
  avatar: string | null
}

export default function LinkAccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [discordUsername, setDiscordUsername] = useState("")
  const [gameUsername, setGameUsername] = useState("")
  const [gamePassword, setGamePassword] = useState("")
  const [foundUser, setFoundUser] = useState<DiscordUser | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isLinking, setIsLinking] = useState(false)
  const [showJoinMessage, setShowJoinMessage] = useState(false)
  const [discordInvite, setDiscordInvite] = useState("")

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

  const searchDiscordUser = async () => {
    if (!discordUsername.trim()) {
      toast.error("Please enter a Discord username")
      return
    }

    setIsSearching(true)
    setShowJoinMessage(false)
    try {
      const response = await fetch("/api/search-discord-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: discordUsername.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        setFoundUser(data)
        toast.success("Discord user found!")
      } else {
        if (response.status === 404) {
          setShowJoinMessage(true)
          setDiscordInvite(data.discordInvite || "https://discord.gg/your-server")
        }
        toast.error(data.error || "User not found")
        setFoundUser(null)
      }
    } catch (error) {
      toast.error("Failed to search for user")
      setFoundUser(null)
    } finally {
      setIsSearching(false)
    }
  }

  const linkAccount = async () => {
    if (!foundUser || !gameUsername.trim() || !gamePassword.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    setIsLinking(true)
    try {
      const response = await fetch("/api/link-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discordId: foundUser.discordId,
          gameUsername: gameUsername.trim(),
          gamePassword: gamePassword.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Account linked successfully!")
        router.push("/dashboard")
      } else {
        toast.error(data.error || "Failed to link account")
      }
    } catch (error) {
      toast.error("Failed to link account")
    } finally {
      setIsLinking(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-orange-600 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <Navigation />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600/30 to-orange-400/30 backdrop-blur-xl border border-orange-500/30 rounded-full px-6 py-3 mb-6">
              <Crown className="h-6 w-6 text-orange-300" />
              <span className="text-orange-200 font-semibold">LINK ACCOUNT</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Link Your Accounts</h1>
            <p className="text-orange-200">Connect your Discord and game accounts</p>
          </div>

          <Card className="bg-gradient-to-br from-black/40 via-orange-950/40 to-black/40 backdrop-blur-xl border border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-3">
                <Link className="h-6 w-6 text-orange-400" />
                Account Linking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Discord User Search */}
              <div className="space-y-4">
                <Label className="text-orange-200 text-lg font-semibold">Step 1: Find Your Discord Account</Label>
                <div className="flex gap-2">
                  <Input
                    value={discordUsername}
                    onChange={(e) => setDiscordUsername(e.target.value)}
                    placeholder="Enter your Discord username"
                    className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50"
                  />
                  <Button
                    onClick={searchDiscordUser}
                    disabled={isSearching}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    {isSearching ? "Searching..." : "Search"}
                  </Button>
                </div>
                <p className="text-sm text-orange-300">
                  Enter your Discord username as it appears in the United Server Discord
                </p>
              </div>

              {/* Join Discord Message */}
              {showJoinMessage && (
                <Alert className="border-orange-500/30 bg-orange-500/10">
                  <AlertCircle className="h-4 w-4 text-orange-400" />
                  <AlertDescription className="text-orange-200">
                    <div className="space-y-3">
                      <p>You need to join our Discord server first before linking your account.</p>
                      <Button
                        onClick={() => window.open(discordInvite, "_blank")}
                        className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Join Discord Server
                      </Button>
                      <p className="text-sm text-orange-300">
                        After joining the server, come back and search for your Discord username again.
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Found User Display */}
              {foundUser && (
                <div className="bg-black/30 rounded-lg p-4 border border-orange-500/30">
                  <div className="flex items-center gap-3">
                    {foundUser.avatar ? (
                      <img
                        src={foundUser.avatar || "/placeholder.svg"}
                        alt="Discord avatar"
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-orange-500/30 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-orange-300" />
                      </div>
                    )}
                    <div>
                      <p className="text-white font-semibold">{foundUser.displayName}</p>
                      <p className="text-orange-300 text-sm">@{foundUser.username}</p>
                      <p className="text-orange-400 text-xs">ID: {foundUser.discordId}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Game Account Info */}
              {foundUser && (
                <div className="space-y-4">
                  <Label className="text-orange-200 text-lg font-semibold">Step 2: Enter Game Account Details</Label>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-orange-200">Game Username</Label>
                      <Input
                        value={gameUsername}
                        onChange={(e) => setGameUsername(e.target.value)}
                        placeholder="Your in-game username"
                        className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50"
                      />
                    </div>
                    <div>
                      <Label className="text-orange-200">Game Password</Label>
                      <Input
                        type="password"
                        value={gamePassword}
                        onChange={(e) => setGamePassword(e.target.value)}
                        placeholder="Your in-game password"
                        className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Link Button */}
              {foundUser && (
                <Button
                  onClick={linkAccount}
                  disabled={isLinking || !gameUsername.trim() || !gamePassword.trim()}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3"
                >
                  <Link className="h-4 w-4 mr-2" />
                  {isLinking ? "Linking Account..." : "Link Account"}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
