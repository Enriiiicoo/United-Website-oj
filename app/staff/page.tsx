"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Shield, Crown, Star, Users, MessageSquare, Mail, Sparkles, Award, Zap } from "lucide-react"
import { useState, useEffect } from "react"

// Floating particle component
const StaffParticle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse opacity-70"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }}
  />
)

const staffMembers = [
  {
    id: 1,
    name: "John Smith",
    role: "Server Owner",
    rank: "Owner",
    description: "Founder and lead administrator of United Roleplay. Oversees all server operations and development.",
    avatar: "/placeholder-user.jpg",
    discordTag: "Owner#0001",
    email: "owner@united-rp.com",
    joinDate: "January 2024",
    icon: Crown,
    badgeColor: "from-yellow-500 to-yellow-600",
    textColor: "text-yellow-400",
    glowColor: "shadow-yellow-500/50",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Head Administrator",
    rank: "Head Admin",
    description:
      "Manages staff team and handles high-level administrative decisions. Point of contact for serious issues.",
    avatar: "/placeholder-user.jpg",
    discordTag: "HeadAdmin#0002",
    email: "headadmin@united-rp.com",
    joinDate: "February 2024",
    icon: Shield,
    badgeColor: "from-red-500 to-red-600",
    textColor: "text-red-400",
    glowColor: "shadow-red-500/50",
  },
  {
    id: 3,
    name: "Mike Wilson",
    role: "Administrator",
    rank: "Admin",
    description: "Handles player reports, enforces server rules, and assists with community management.",
    avatar: "/placeholder-user.jpg",
    discordTag: "Admin#0003",
    email: "admin@united-rp.com",
    joinDate: "March 2024",
    icon: Shield,
    badgeColor: "from-blue-500 to-blue-600",
    textColor: "text-blue-400",
    glowColor: "shadow-blue-500/50",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Moderator",
    rank: "Moderator",
    description: "Assists with player support, moderates chat, and helps organize community events.",
    avatar: "/placeholder-user.jpg",
    discordTag: "Mod#0004",
    email: "mod1@united-rp.com",
    joinDate: "April 2024",
    icon: Star,
    badgeColor: "from-green-500 to-green-600",
    textColor: "text-green-400",
    glowColor: "shadow-green-500/50",
  },
  {
    id: 5,
    name: "Alex Brown",
    role: "Moderator",
    rank: "Moderator",
    description: "Specializes in new player experience and whitelist application reviews.",
    avatar: "/placeholder-user.jpg",
    discordTag: "Mod#0005",
    email: "mod2@united-rp.com",
    joinDate: "May 2024",
    icon: Star,
    badgeColor: "from-green-500 to-green-600",
    textColor: "text-green-400",
    glowColor: "shadow-green-500/50",
  },
  {
    id: 6,
    name: "Lisa Garcia",
    role: "Support Staff",
    rank: "Support",
    description: "Provides technical support, manages Discord server, and assists with player inquiries.",
    avatar: "/placeholder-user.jpg",
    discordTag: "Support#0006",
    email: "support@united-rp.com",
    joinDate: "June 2024",
    icon: Users,
    badgeColor: "from-purple-500 to-purple-600",
    textColor: "text-purple-400",
    glowColor: "shadow-purple-500/50",
  },
]

export default function StaffPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleApplyStaff = () => {
    window.open("https://discord.gg/eQeHev6p94", "_blank")
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10"></div>

        {/* Particle System */}
        <div className="absolute inset-0">
          {Array.from({ length: 35 }).map((_, i) => (
            <StaffParticle key={i} delay={i * 0.1} />
          ))}
        </div>

        {/* Mouse Follow Glow */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
      </div>

      <Navigation />

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="relative inline-block">
            <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-30 animate-pulse"></div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            OUR STAFF TEAM
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Meet our dedicated team of administrators and moderators who work tirelessly to ensure the best roleplay
            experience for all our players.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {staffMembers.map((member, index) => {
            const IconComponent = member.icon
            return (
              <Card
                key={member.id}
                className={`relative backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 group overflow-hidden ${member.glowColor} hover:shadow-2xl`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${member.badgeColor} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
                ></div>

                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20 ring-2 ring-gray-600 group-hover:ring-orange-500/50 transition-all duration-300">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="text-xl bg-gray-700 text-white font-bold">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-2 -right-2 bg-gradient-to-br ${member.badgeColor} rounded-full p-2 shadow-lg ${member.glowColor} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-white group-hover:text-orange-300 transition-colors duration-300">
                        {member.name}
                      </CardTitle>
                      <Badge
                        className={`bg-gradient-to-r ${member.badgeColor} text-white mt-2 shadow-lg hover:scale-105 transition-transform duration-300`}
                      >
                        <Award className="w-3 h-3 mr-1" />
                        {member.rank}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 relative z-10">
                  <div>
                    <p className={`text-sm font-medium ${member.textColor} mb-2 flex items-center gap-2`}>
                      <Zap className="w-4 h-4" />
                      {member.role}
                    </p>
                    <CardDescription className="text-sm leading-relaxed text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {member.description}
                    </CardDescription>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50">
                      <MessageSquare className="h-4 w-4 mr-3 text-blue-400" />
                      <span>{member.discordTag}</span>
                    </div>
                    <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50">
                      <Mail className="h-4 w-4 mr-3 text-green-400" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50">
                      <Users className="h-4 w-4 mr-3 text-purple-400" />
                      <span>Joined {member.joinDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Application Section */}
        <Card className="relative backdrop-blur-xl bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-500/30 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 animate-pulse"></div>

          <CardHeader className="relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-yellow-400 animate-bounce" />
                <CardTitle className="text-3xl bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                  Join Our Elite Staff Team
                </CardTitle>
                <Crown className="w-8 h-8 text-yellow-400 animate-bounce" />
              </div>
              <CardDescription className="text-xl text-orange-200">
                Ready to make a difference? We're always looking for passionate individuals to join our team.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Requirements",
                  items: ["18+ years old", "Active community member", "Clean record", "Available 15+ hours/week"],
                  color: "from-blue-500 to-cyan-600",
                },
                {
                  icon: Users,
                  title: "Responsibilities",
                  items: ["Help new players", "Enforce server rules", "Handle reports", "Moderate chat/voice"],
                  color: "from-green-500 to-emerald-600",
                },
                {
                  icon: Star,
                  title: "Benefits",
                  items: ["Staff permissions", "Exclusive channels", "Recognition", "Team events"],
                  color: "from-purple-500 to-violet-600",
                },
              ].map((section, index) => (
                <div
                  key={index}
                  className="text-center p-6 backdrop-blur-sm bg-black/30 rounded-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="relative mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${section.color} rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <section.icon className="w-8 h-8 text-white" />
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${section.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
                    ></div>
                  </div>
                  <h4 className="font-bold text-white mb-4 text-lg">{section.title}</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center justify-center gap-2">
                        <Sparkles className="w-3 h-3 text-orange-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={handleApplyStaff}
                className="relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-12 py-4 text-xl font-bold shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/80 transition-all duration-300 hover:scale-110 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6" />
                  Apply on Discord
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-500 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-500 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-pink-500 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-40 right-10 w-2 h-2 bg-cyan-500 rounded-full animate-bounce opacity-60"></div>
    </div>
  )
}
