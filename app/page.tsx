"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Clock, Calendar, Play, Crown, MessageCircle, Video, Zap, Shield, Star, Copy } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { FloatingParticles } from "@/components/floating-particles"
import { TypingAnimation } from "@/components/typing-animation"
import { ParallaxBackground } from "@/components/parallax-background"
import { TiltCard } from "@/components/tilt-card"
import { SoundWave } from "@/components/sound-wave"
import { useScrollAnimation, useCountUp } from "@/hooks/use-scroll-animation"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

function AnimatedCounter({ end, label, icon: Icon }: { end: number; label: string; icon: any }) {
  const { ref, isVisible } = useScrollAnimation()
  const { count, setIsActive } = useCountUp(end)

  useEffect(() => {
    if (isVisible) {
      setIsActive(true)
    }
  }, [isVisible, setIsActive])

  return (
    <div ref={ref} className="text-center group">
      <div className="relative">
        <Icon className="h-12 w-12 text-orange-500 mx-auto mb-4 group-hover:scale-125 transition-transform duration-500" />
        <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
      </div>
      <div className="text-4xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{count}+</div>
      <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  )
}

export default function HomePage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [serverStats, setServerStats] = useState({
    onlinePlayers: 45,
    maxPlayers: 100,
    uptime: 99.9,
  })

  useEffect(() => {
    // Fetch server stats on component mount
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setServerStats(data))
      .catch((err) => console.error("Failed to fetch server stats:", err))
  }, [])

  const handleJoinServer = () => {
    const serverIP = "mtasa://89.42.88.252:22066"
    window.open(serverIP, "_blank")
    toast.success("Opening MTA:SA client...")
  }

  const handleDiscord = () => {
    window.open("https://discord.gg/unitedserver", "_blank")
  }

  const handleTrailer = () => {
    window.open("https://youtube.com/watch?v=unitedserver", "_blank")
  }

  const handleVerify = () => {
    if (session) {
      router.push("/verify")
    } else {
      router.push("/auth/signin")
    }
  }

  const handleCopyIP = async () => {
    const serverIP = "mtasa://89.42.88.252:22066"
    try {
      await navigator.clipboard.writeText(serverIP)
      toast.success("Server IP copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy IP address")
    }
  }

  return (
    <div className="min-h-screen hero-pattern relative overflow-hidden">
      {/* Background Effects */}
      <ParallaxBackground />
      <FloatingParticles />
      <SoundWave />

      {/* Diagonal Split Layout */}
      <div className="relative min-h-screen">
        {/* Left Side - Main Content */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-orange-950/20 to-transparent">
          <div className="flex flex-col justify-center min-h-screen pl-8 md:pl-16 lg:pl-24 max-w-4xl">
            {/* Floating Crown Badge */}
            <AnimatedSection animation="scaleIn" delay={100}>
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600/20 to-orange-400/20 backdrop-blur-xl border border-orange-500/30 rounded-full px-6 py-3 hover:scale-105 transition-transform duration-500">
                  <Crown className="h-6 w-6 text-orange-400 animate-pulse" />
                  <span className="text-orange-300 font-semibold">Morocco's Premier Server</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Main Title - Stacked Vertically */}
            <AnimatedSection animation="slideRight" delay={200}>
              <div className="mb-8">
                <h1 className="text-7xl md:text-9xl font-black leading-none">
                  <div className="text-white drop-shadow-2xl mb-2">UNITED</div>
                  <div className="text-orange-500 text-glow drop-shadow-2xl">SERVER</div>
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mt-4 rounded-full" />
              </div>
            </AnimatedSection>

            {/* Subtitle */}
            <AnimatedSection animation="fadeIn" delay={400}>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl text-gray-300 font-light">
                  <TypingAnimation text="Moroccan MTA Roleplay Experience" speed={60} />
                </h2>
              </div>
            </AnimatedSection>

            {/* Description */}
            <AnimatedSection animation="slideRight" delay={600}>
              <p className="text-lg text-gray-400 max-w-2xl mb-12 leading-relaxed">
                Immerse yourself in the ultimate roleplay adventure. Join our thriving community of players in Morocco's
                most authentic MTA server experience since 2021.
              </p>
            </AnimatedSection>

            {/* Action Buttons - Horizontal Layout */}
            <AnimatedSection animation="slideUp" delay={800}>
              <div className="flex flex-wrap gap-4 mb-8">
                <TiltCard>
                  <Button
                    size="lg"
                    onClick={handleJoinServer}
                    className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 group"
                  >
                    <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    Join Server
                  </Button>
                </TiltCard>
                <TiltCard>
                  <Button
                    size="lg"
                    onClick={handleVerify}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 group"
                  >
                    <Shield className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    {session ? "Verify Access" : "Sign In & Verify"}
                  </Button>
                </TiltCard>
                <TiltCard>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleDiscord}
                    className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 px-8 py-4 text-lg bg-black/50 backdrop-blur-sm rounded-xl transition-all duration-300 group"
                  >
                    <MessageCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    Discord
                  </Button>
                </TiltCard>
                <TiltCard>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleTrailer}
                    className="border-2 border-blue-600 text-blue-400 hover:bg-blue-900/20 hover:border-blue-500 px-8 py-4 text-lg bg-black/50 backdrop-blur-sm rounded-xl transition-all duration-300 group"
                  >
                    <Video className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    Trailer
                  </Button>
                </TiltCard>
              </div>
            </AnimatedSection>

            {/* Server IP - Better positioned under buttons */}
            <AnimatedSection animation="fadeIn" delay={1000}>
              <TiltCard>
                <div className="inline-flex items-center gap-4 bg-black/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl px-6 py-4 hover:bg-orange-500/10 transition-all duration-300 group max-w-fit">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Server IP</p>
                    <code className="text-orange-400 font-mono text-lg group-hover:text-orange-300 transition-colors">
                      mtasa://89.42.88.252:22066
                    </code>
                  </div>
                  <button
                    onClick={handleCopyIP}
                    className="p-2 hover:bg-orange-500/20 rounded-lg transition-colors group/copy"
                  >
                    <Copy className="h-5 w-5 text-gray-400 group-hover/copy:text-orange-400 transition-colors" />
                  </button>
                </div>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>

        {/* Right Side - Floating Stats Card */}
        <div className="absolute right-8 md:right-16 lg:right-24 top-1/2 transform -translate-y-1/2 z-20">
          <AnimatedSection animation="slideLeft" delay={1200}>
            <TiltCard intensity={20}>
              <Card className="bg-gradient-to-br from-black/80 via-orange-950/30 to-black/80 backdrop-blur-xl border border-orange-500/30 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 w-80">
                <CardContent className="p-8">
                  {/* Centered Crown */}
                  <div className="text-center mb-8">
                    <div className="relative inline-block">
                      <Crown className="h-16 w-16 text-orange-400 mx-auto animate-pulse" />
                      <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-orange-400 mt-4 mb-2">UNITED</h3>
                    <p className="text-orange-300 text-sm">HAPPY NEW YEAR</p>
                    <p className="text-xs text-orange-200/60 mt-2">2021-2025</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <AnimatedCounter end={serverStats.onlinePlayers} label="Players" icon={Users} />
                    <div className="text-center group">
                      <div className="relative">
                        <Clock className="h-12 w-12 text-orange-500 mx-auto mb-4 group-hover:scale-125 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                      </div>
                      <div className="text-4xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        24/7
                      </div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">Online</div>
                    </div>
                    <AnimatedCounter end={2021} label="Since" icon={Calendar} />
                    <div className="text-center group">
                      <div className="relative">
                        <Play className="h-12 w-12 text-orange-500 mx-auto mb-4 group-hover:scale-125 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                      </div>
                      <div className="text-4xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        RP
                      </div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">Focus</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          </AnimatedSection>
        </div>
      </div>

      {/* Second Section - Features Showcase */}
      <section className="relative py-32 bg-gradient-to-b from-transparent via-orange-950/10 to-black/50">
        <div className="max-w-7xl mx-auto px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-white mb-6">
                Why Choose <span className="text-orange-500">UNITED</span>?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto rounded-full" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection animation="slideUp" delay={200}>
              <TiltCard>
                <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 backdrop-blur-sm border border-orange-500/20 h-full hover:border-orange-500/40 transition-all duration-500 group">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <Shield className="h-16 w-16 text-orange-400 mx-auto group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Secure & Stable</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Advanced anti-cheat systems and 99.9% uptime guarantee for uninterrupted gameplay experience.
                    </p>
                  </CardContent>
                </Card>
              </TiltCard>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={400}>
              <TiltCard>
                <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 backdrop-blur-sm border border-orange-500/20 h-full hover:border-orange-500/40 transition-all duration-500 group">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <Star className="h-16 w-16 text-orange-400 mx-auto group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Premium Quality</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Custom scripts, unique features, and professional staff dedicated to providing the best RP
                      experience.
                    </p>
                  </CardContent>
                </Card>
              </TiltCard>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={600}>
              <TiltCard>
                <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 backdrop-blur-sm border border-orange-500/20 h-full hover:border-orange-500/40 transition-all duration-500 group">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <Zap className="h-16 w-16 text-orange-400 mx-auto group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Active Community</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Join hundreds of active players in events, competitions, and immersive roleplay scenarios daily.
                    </p>
                  </CardContent>
                </Card>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
