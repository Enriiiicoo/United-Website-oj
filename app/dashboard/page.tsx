"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { AnimatedSection } from "@/components/animated-section"
import { TiltCard } from "@/components/tilt-card"
import { User, Link2, Calendar, Shield, Crown, ExternalLink, AlertCircle } from "lucide-react"

interface LinkedAccount {
  gameAccount: {
    id: number
    username: string
  }
  linkedAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [linkedAccount, setLinkedAccount] = useState<LinkedAccount | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/auth/signin")
      return
    }

    // Fetch linked account info
    fetchLinkedAccount()
  }, [session, status, router])

  const fetchLinkedAccount = async () => {
    try {
      const response = await fetch("/api/linked-account")
      if (response.ok) {
        const data = await response.json()
        setLinkedAccount(data)
      }
    } catch (error) {
      console.error("Failed to fetch linked account:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-orange-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600/30 to-orange-400/30 backdrop-blur-xl border border-orange-500/30 rounded-full px-6 py-3 mb-6">
              <Crown className="h-6 w-6 text-orange-300" />
              <span className="text-orange-200 font-semibold">DASHBOARD</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome back, <span className="text-orange-300">{session.user?.name}</span>
            </h1>
            <p className="text-xl text-orange-100 opacity-90">Manage your account and view your game statistics</p>
          </div>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Discord Account Card */}
          <AnimatedSection animation="slideUp" delay={200}>
            <TiltCard>
              <Card className="bg-gradient-to-br from-black/40 via-orange-950/40 to-black/40 backdrop-blur-xl border border-orange-500/30 h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-3">
                    <User className="h-6 w-6 text-blue-400" />
                    Discord Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={session.user?.image || "/placeholder-user.jpg"}
                      alt="Discord avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-white font-medium">{session.user?.name}</p>
                      <p className="text-orange-300 text-sm">ID: {session.user.discordId}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Connected</Badge>
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedSection>

          {/* Game Account Card */}
          <AnimatedSection animation="slideUp" delay={400}>
            <TiltCard>
              <Card className="bg-gradient-to-br from-black/40 via-orange-950/40 to-black/40 backdrop-blur-xl border border-orange-500/30 h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-3">
                    <Shield className="h-6 w-6 text-orange-400" />
                    Game Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {linkedAccount ? (
                    <>
                      <div>
                        <p className="text-white font-medium">{linkedAccount.gameAccount.username}</p>
                        <p className="text-orange-300 text-sm">ID: {linkedAccount.gameAccount.id}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-orange-200">
                        <Calendar className="h-4 w-4" />
                        Linked: {new Date(linkedAccount.linkedAt).toLocaleDateString()}
                      </div>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        <Link2 className="h-3 w-3 mr-1" />
                        Linked
                      </Badge>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-orange-300">
                        <AlertCircle className="h-5 w-5" />
                        <span>No game account linked</span>
                      </div>
                      <Button
                        onClick={() => router.push("/link-account")}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Link Game Account
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedSection>

          {/* Quick Actions Card */}
          <AnimatedSection animation="slideUp" delay={600}>
            <TiltCard>
              <Card className="bg-gradient-to-br from-black/40 via-orange-950/40 to-black/40 backdrop-blur-xl border border-orange-500/30 h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-3">
                    <ExternalLink className="h-6 w-6 text-orange-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => router.push("/verify")}
                    variant="outline"
                    className="w-full bg-black/30 border-orange-500/30 text-orange-200 hover:bg-orange-500/20"
                  >
                    Verify Access
                  </Button>
                  <Button
                    onClick={() => router.push("/rules")}
                    variant="outline"
                    className="w-full bg-black/30 border-orange-500/30 text-orange-200 hover:bg-orange-500/20"
                  >
                    Server Rules
                  </Button>
                  <Button
                    onClick={() => window.open("https://discord.gg/eQeHev6p94", "_blank")}
                    variant="outline"
                    className="w-full bg-black/30 border-orange-500/30 text-orange-200 hover:bg-orange-500/20"
                  >
                    Join Discord
                  </Button>
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
