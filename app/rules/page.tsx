"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  AlertTriangle,
  Users,
  Car,
  MessageSquare,
  Crown,
  Zap,
  Ban,
  CheckCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import { useState, useEffect } from "react"

// Floating particle component
const RulesParticle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-1 h-1 bg-gradient-to-r from-red-400 to-orange-500 rounded-full animate-pulse opacity-70"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }}
  />
)

const ruleCategories = [
  {
    id: 1,
    title: "General Rules",
    icon: Shield,
    color: "from-blue-500 to-cyan-600",
    glowColor: "shadow-blue-500/50",
    rules: [
      "Respect all players and staff members at all times",
      "No harassment, discrimination, or toxic behavior",
      "English only in public channels and voice chat",
      "No advertising other servers or communities",
      "Follow Discord Terms of Service and Community Guidelines",
      "Use appropriate usernames and profile pictures",
    ],
  },
  {
    id: 2,
    title: "Roleplay Rules",
    icon: Users,
    color: "from-green-500 to-emerald-600",
    glowColor: "shadow-green-500/50",
    rules: [
      "Stay in character at all times during roleplay",
      "No Random Death Match (RDM) or Vehicle Death Match (VDM)",
      "No metagaming - using out-of-character information in-game",
      "No powergaming - forcing actions on other players",
      "Realistic roleplay scenarios only",
      "No breaking character in public areas",
      "Respect other players' roleplay scenarios",
    ],
  },
  {
    id: 3,
    title: "Vehicle Rules",
    icon: Car,
    color: "from-purple-500 to-violet-600",
    glowColor: "shadow-purple-500/50",
    rules: [
      "No unrealistic driving or stunts in populated areas",
      "Follow traffic laws and speed limits",
      "No ramming or intentional vehicle damage",
      "Park vehicles in designated areas only",
      "No stealing emergency vehicles without proper roleplay",
      "Respect vehicle ownership and permissions",
    ],
  },
  {
    id: 4,
    title: "Communication Rules",
    icon: MessageSquare,
    color: "from-orange-500 to-red-600",
    glowColor: "shadow-orange-500/50",
    rules: [
      "No spamming in chat or voice channels",
      "No excessive use of capital letters",
      "No inappropriate language or content",
      "Use proper radio etiquette for emergency services",
      "No out-of-character talk in roleplay channels",
      "Report issues through proper channels only",
    ],
  },
]

const punishments = [
  {
    level: "Warning",
    color: "from-yellow-500 to-orange-500",
    description: "First offense for minor rule violations",
    duration: "Permanent record",
    icon: AlertTriangle,
  },
  {
    level: "Kick",
    color: "from-orange-500 to-red-500",
    description: "Temporary removal from server",
    duration: "Immediate",
    icon: ExternalLink,
  },
  {
    level: "Temporary Ban",
    color: "from-red-500 to-pink-500",
    description: "Banned for a specific time period",
    duration: "1 day - 30 days",
    icon: Ban,
  },
  {
    level: "Permanent Ban",
    color: "from-red-600 to-red-800",
    description: "Permanent removal from community",
    duration: "Permanent",
    icon: Ban,
  },
]

export default function RulesPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleReportIssue = () => {
    window.open("https://discord.gg/eQeHev6p94", "_blank")
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-orange-900/10"></div>

        {/* Particle System */}
        <div className="absolute inset-0">
          {Array.from({ length: 25 }).map((_, i) => (
            <RulesParticle key={i} delay={i * 0.1} />
          ))}
        </div>

        {/* Mouse Follow Glow */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-red-500/20 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
      </div>

      <Navigation />

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="relative inline-block">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-red-500 blur-2xl opacity-30 animate-pulse"></div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            SERVER RULES
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to United Roleplay! Please read and follow all rules to ensure a positive experience for everyone.
            Ignorance of the rules is not an excuse.
          </p>

          <Alert className="max-w-4xl mx-auto bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/30 backdrop-blur-xl">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <AlertDescription className="text-red-200 text-lg">
              <strong>Important:</strong> All players are expected to read and understand these rules. Violations may
              result in warnings, kicks, or permanent bans depending on severity.
            </AlertDescription>
          </Alert>
        </div>

        {/* Rules Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {ruleCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.id}
                className={`backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 group ${category.glowColor} hover:shadow-2xl`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
                ></div>

                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg ${category.glowColor} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
                      ></div>
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white group-hover:text-orange-300 transition-colors duration-300">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {category.rules.length} rules in this category
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10">
                  {category.rules.map((rule, ruleIndex) => (
                    <div
                      key={ruleIndex}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 group/rule"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-green-400 group-hover/rule:scale-110 transition-transform duration-300" />
                      </div>
                      <p className="text-sm text-gray-300 group-hover/rule:text-white transition-colors duration-300 leading-relaxed">
                        {rule}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Punishment System */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-red-900/50 to-orange-900/50 border border-red-500/30 mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse"></div>

          <CardHeader className="text-center relative z-10">
            <div className="relative mb-4">
              <Ban className="w-12 h-12 text-red-400 mx-auto" />
              <div className="absolute inset-0 bg-red-400 blur-xl opacity-30"></div>
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
              Punishment System
            </CardTitle>
            <CardDescription className="text-red-200 text-lg">
              Understanding the consequences of rule violations
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {punishments.map((punishment, index) => {
                const IconComponent = punishment.icon
                return (
                  <div
                    key={index}
                    className="text-center p-6 backdrop-blur-sm bg-black/30 rounded-xl border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="relative mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${punishment.color} rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${punishment.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
                      ></div>
                    </div>
                    <h4 className="font-bold text-white mb-2 text-lg">{punishment.level}</h4>
                    <p className="text-sm text-gray-300 mb-3">{punishment.description}</p>
                    <Badge className={`bg-gradient-to-r ${punishment.color} text-white shadow-lg`}>
                      {punishment.duration}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Report Section */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>

          <CardContent className="p-8 text-center relative z-10">
            <div className="relative mb-6">
              <MessageSquare className="h-16 w-16 text-blue-400 mx-auto" />
              <div className="absolute inset-0 bg-blue-400 blur-xl opacity-30"></div>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">
              Report Rule Violations
            </h3>
            <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
              Witnessed a rule violation? Report it to our staff team through Discord. Include evidence such as
              screenshots or video clips when possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300 mb-8">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Include detailed description
              </div>
              <div className="flex items-center justify-center gap-2">
                <Crown className="w-4 h-4 text-purple-400" />
                Provide evidence if available
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                Use appropriate report channel
              </div>
            </div>
            <Button
              onClick={handleReportIssue}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/80 transition-all duration-300 hover:scale-105 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                <MessageSquare className="w-5 h-5" />
                Report on Discord
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-red-500 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-orange-500 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-yellow-500 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-40 right-10 w-2 h-2 bg-red-500 rounded-full animate-bounce opacity-60"></div>
    </div>
  )
}
