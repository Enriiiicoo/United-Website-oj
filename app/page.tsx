"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, Trophy, Clock, Copy, ExternalLink } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { ParallaxBackground } from "@/components/parallax-background"
import { TiltCard } from "@/components/tilt-card"
import { TypingAnimation } from "@/components/typing-animation"
import { useState } from "react"
import { toast } from "sonner"

export default function HomePage() {
  const [copied, setCopied] = useState(false)
  const serverIP = "89.42.88.252:22097"

  const copyServerIP = async () => {
    try {
      await navigator.clipboard.writeText(serverIP)
      setCopied(true)
      toast.success("Server IP copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy server IP")
    }
  }

  const joinDiscord = () => {
    window.open("https://discord.gg/eQeHev6p94", "_blank")
  }

  const joinServer = () => {
    window.open(`mtasa://${serverIP}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ParallaxBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto text-center z-10">
          <AnimatedSection>
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                🇲🇦 Morocco's Premier MTA Server
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
                United Server
              </h1>
              <div className="text-xl md:text-2xl text-gray-300 mb-8 h-16">
                <TypingAnimation
                  text="Experience the ultimate roleplay adventure in Morocco's most authentic MTA server"
                  speed={50}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                onClick={joinServer}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Join Server
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 text-lg bg-transparent"
                onClick={joinDiscord}
              >
                <Users className="mr-2 h-5 w-5" />
                Join Discord
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-400">
              <span>Server IP:</span>
              <code className="bg-gray-800 px-3 py-1 rounded text-green-400 font-mono">{serverIP}</code>
              <Button variant="ghost" size="sm" onClick={copyServerIP} className="text-gray-400 hover:text-white">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <TiltCard>
                <Card className="bg-gray-800/50 border-gray-700 text-center">
                  <CardHeader>
                    <Users className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                    <CardTitle className="text-2xl text-white">500+</CardTitle>
                    <CardDescription>Active Players</CardDescription>
                  </CardHeader>
                </Card>
              </TiltCard>

              <TiltCard>
                <Card className="bg-gray-800/50 border-gray-700 text-center">
                  <CardHeader>
                    <Shield className="h-8 w-8 mx-auto text-green-400 mb-2" />
                    <CardTitle className="text-2xl text-white">24/7</CardTitle>
                    <CardDescription>Server Uptime</CardDescription>
                  </CardHeader>
                </Card>
              </TiltCard>

              <TiltCard>
                <Card className="bg-gray-800/50 border-gray-700 text-center">
                  <CardHeader>
                    <Trophy className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
                    <CardTitle className="text-2xl text-white">#1</CardTitle>
                    <CardDescription>Morocco Server</CardDescription>
                  </CardHeader>
                </Card>
              </TiltCard>

              <TiltCard>
                <Card className="bg-gray-800/50 border-gray-700 text-center">
                  <CardHeader>
                    <Clock className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                    <CardTitle className="text-2xl text-white">2021</CardTitle>
                    <CardDescription>Since Established</CardDescription>
                  </CardHeader>
                </Card>
              </TiltCard>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Why Choose United Server?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TiltCard>
                <Card className="bg-gray-800/50 border-gray-700 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Shield className="h-6 w-6 mr-2 text-blue-400" />
                      Professional Staff
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      Our experienced team ensures fair gameplay and maintains a friendly environment for all players.
                    </CardDescription>
                  </CardContent>
                </Card>
              </TiltCard>

              <TiltCard>
                <Card className="bg-gray-800/50 border-gray-700 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Users className="h-6 w-6 mr-2 text-green-400" />
                      Active Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      Join hundreds of active players in Morocco's most vibrant MTA roleplay community.
                    </CardDescription>
                  </CardContent>
                </Card>
              </TiltCard>

              <TiltCard>
                <Card className="bg-gray-800/50 border-gray-700 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Trophy className="h-6 w-6 mr-2 text-yellow-400" />
                      Unique Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      Experience custom scripts, unique jobs, and authentic Moroccan roleplay scenarios.
                    </CardDescription>
                  </CardContent>
                </Card>
              </TiltCard>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of players in Morocco's premier MTA roleplay server. Create your character, build your
              story, and become part of our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
                onClick={joinServer}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Join Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 text-lg bg-transparent"
                onClick={joinDiscord}
              >
                <Users className="mr-2 h-5 w-5" />
                Discord Community
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
