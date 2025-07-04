"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { User, Crown, Star, Clock, Calendar, Trophy, Shield, DollarSign, Plus } from "lucide-react"

// Floating particle component
const DashboardParticle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse opacity-70"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }}
  />
)

interface Character {
  id: number
  name: string
  money: number
  bankMoney: number
  hoursPlayed: number
  age: number
  gender: string
  skin: number
  weight: number
  height: number
  description: string
  factionId: number
  factionRank: number
  lastLogin: string
  creationDate: string
  active: boolean
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (session) {
      fetchCharacter()
    }
  }, [session])

  const fetchCharacter = async () => {
    try {
      const response = await fetch("/api/character")
      if (response.ok) {
        const data = await response.json()
        setCharacter(data.character)
      }
    } catch (error) {
      console.error("Failed to fetch character:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinDiscord = () => {
    window.open("https://discord.gg/eQeHev6p94", "_blank")
  }

  const handleCreateCharacter = () => {
    toast({
      title: "Character Creation",
      description: "Character creation is available in-game. Join our server to create your character!",
    })
    handleJoinDiscord()
  }

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatHours = (hours: number) => {
    if (hours < 1) return "< 1 hour"
    return `${hours} hour${hours !== 1 ? "s" : ""}`
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-400">Please sign in to view your dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-transparent to-blue-900/10"></div>

        {/* Particle System */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <DashboardParticle key={i} delay={i * 0.1} />
          ))}
        </div>

        {/* Mouse Follow Glow */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
      </div>

      <Navigation />

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="relative inline-block">
            <User className="w-16 h-16 text-cyan-500 mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-30 animate-pulse"></div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            DASHBOARD
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Welcome back, {session.user?.name}! Here's your complete roleplay profile and statistics.
          </p>
        </div>

        {/* User Profile Card */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/30 mb-8 overflow-hidden shadow-2xl shadow-cyan-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>

          <CardHeader className="relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="h-32 w-32 ring-4 ring-cyan-500/50 shadow-2xl shadow-cyan-500/50">
                  <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white font-bold">
                    {session.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-3 shadow-lg shadow-yellow-500/50">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl font-bold text-white mb-2">{session.user?.name}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 text-sm shadow-lg">
                    <User className="w-4 h-4 mr-2" />
                    Discord User
                  </Badge>
                  {character && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-sm shadow-lg">
                      <Shield className="w-4 h-4 mr-2" />
                      Character Active
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                    <p className="text-gray-400">Play Time</p>
                    <p className="text-white font-semibold">{character ? formatHours(character.hoursPlayed) : "N/A"}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-gray-400">Character Age</p>
                    <p className="text-white font-semibold">{character ? `${character.age} years` : "N/A"}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <User className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-gray-400">Gender</p>
                    <p className="text-white font-semibold">{character ? character.gender : "N/A"}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                    <p className="text-gray-400">Character ID</p>
                    <p className="text-white font-semibold">{character ? `#${character.id}` : "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {character ? (
          <>
            {/* Character Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "Cash",
                  value: formatMoney(character.money),
                  icon: DollarSign,
                  color: "from-green-500 to-emerald-600",
                  glowColor: "shadow-green-500/50",
                },
                {
                  title: "Bank Balance",
                  value: formatMoney(character.bankMoney),
                  icon: Trophy,
                  color: "from-blue-500 to-cyan-600",
                  glowColor: "shadow-blue-500/50",
                },
                {
                  title: "Total Wealth",
                  value: formatMoney(character.money + character.bankMoney),
                  icon: Crown,
                  color: "from-yellow-500 to-orange-600",
                  glowColor: "shadow-yellow-500/50",
                },
                {
                  title: "Hours Played",
                  value: formatHours(character.hoursPlayed),
                  icon: Clock,
                  color: "from-purple-500 to-violet-600",
                  glowColor: "shadow-purple-500/50",
                },
              ].map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <Card
                    key={index}
                    className={`backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 group ${stat.glowColor} hover:shadow-2xl`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-${stat.color}`} />
                        <IconComponent className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{stat.title}</h3>
                      <p className="text-white font-semibold">{stat.value}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        ) : (
          <div className="text-center">
            <Button
              onClick={handleCreateCharacter}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-600"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Character
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
