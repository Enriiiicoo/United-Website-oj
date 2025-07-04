"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Users, Shield, MessageCircle, Copy, ExternalLink, LogOut } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { AnimatedSection } from "@/components/animated-section"
import { TiltCard } from "@/components/tilt-card"
import { toast } from "sonner"
import { signOut } from "next-auth/react"

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) {
      router.push("/auth/signin")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-orange-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to sign in
  }

  const copyServerIP = () => {
    navigator.clipboard.writeText("89.42.88.252:22097")
    toast.success("Server IP copied to clipboard!")
  }

  const handleDiscordJoin = () => {
    window.open("https://discord.gg/eQeHev6p94", "_blank")
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" })
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
        {/* Header */}
        <AnimatedSection animation="slideUp">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600/30 to-orange-400/30 backdrop-blur-xl border border-orange-500/30 rounded-full px-6 py-3 mb-6">
              <Crown className="h-6 w-6 text-orange-300" />
              <span className="text-orange-200 font-semibold">UNITED SERVER</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Welcome to <span className="text-orange-300">United Server</span>
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto opacity-90">
              The ultimate GTA San Andreas Multiplayer experience awaits you.
            </p>

            {/* User info */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                <img
                  src={session.user?.image || "/placeholder-user.jpg"}
                  alt="User avatar"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-orange-200">Welcome, {session.user?.name}</span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="bg-black/30 border-orange-500/30 text-orange-200 hover:bg-orange-500/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Server Info Card */}
            <AnimatedSection animation="slideUp" delay={200}>
              <TiltCard>
                <Card className="bg-gradient-to-br from-black/40 via-orange-950/40 to-black/40 backdrop-blur-xl border border-orange-500/30 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-3">
                      <Shield className="h-6 w-6 text-orange-400" />
                      Server Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-orange-200 font-semibold">Server IP:</p>
                      <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3">
                        <code className="text-orange-300 font-mono">89.42.88.252:22097</code>
                        <Button
                          onClick={copyServerIP}
                          size="sm"
                          variant="ghost"
                          className="text-orange-300 hover:text-orange-200 hover:bg-orange-500/20"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-orange-200 font-semibold">Status:</p>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-300">Online</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </AnimatedSection>

            {/* Discord Card */}
            <AnimatedSection animation="slideUp" delay={400}>
              <TiltCard>
                <Card className="bg-gradient-to-br from-black/40 via-orange-950/40 to-black/40 backdrop-blur-xl border border-orange-500/30 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-3">
                      <MessageCircle className="h-6 w-6 text-blue-400" />
                      Join Discord
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-orange-200">Connect with our community and stay updated with the latest news.</p>
                    <Button onClick={handleDiscordJoin} className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Join Discord Server
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
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
                      <Users className="h-6 w-6 text-orange-400" />
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
                      onClick={() => router.push("/dashboard")}
                      variant="outline"
                      className="w-full bg-black/30 border-orange-500/30 text-orange-200 hover:bg-orange-500/20"
                    >
                      Dashboard
                    </Button>
                    <Button
                      onClick={() => router.push("/rules")}
                      variant="outline"
                      className="w-full bg-black/30 border-orange-500/30 text-orange-200 hover:bg-orange-500/20"
                    >
                      Server Rules
                    </Button>
                  </CardContent>
                </Card>
              </TiltCard>
            </AnimatedSection>
          </div>

          {/* Join Server Section */}
          <AnimatedSection animation="slideUp" delay={800}>
            <div className="text-center">
              <Card className="bg-gradient-to-br from-black/40 via-orange-950/40 to-black/40 backdrop-blur-xl border border-orange-500/30 inline-block">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to Play?</h2>
                  <p className="text-orange-200 mb-6">Copy the server IP and connect to start your adventure!</p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <div className="flex items-center gap-2 bg-black/50 rounded-lg p-4">
                      <code className="text-orange-300 font-mono text-lg">89.42.88.252:22097</code>
                      <Button onClick={copyServerIP} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
