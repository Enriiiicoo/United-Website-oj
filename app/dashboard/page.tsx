"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useSession } from "next-auth/react"
import {
  User,
  Crown,
  Star,
  Clock,
  Calendar,
  Trophy,
  Zap,
  Users,
  Car,
  Home,
  Sparkles,
  Shield,
  Award,
} from "lucide-react"
import { useState, useEffect } from "react"

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

export default function DashboardPage() {
  const { data: session } = useSession()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Mock user data - in real app this would come from your database
  const userData = {
    level: 42,
    experience: 8750,
    nextLevelExp: 10000,
    playTime: "127 hours",
    joinDate: "March 15, 2024",
    vipStatus: "Gold VIP",
    reputation: 95,
    achievements: 23,
    vehicles: 8,
    properties: 2,
    bankBalance: "$2,450,000",
    cash: "$125,000",
  }

  const recentActivity = [
    { action: "Completed delivery mission", time: "2 hours ago", reward: "+$15,000", icon: Trophy },
    { action: "Purchased new vehicle", time: "1 day ago", cost: "-$85,000", icon: Car },
    { action: "Leveled up to Level 42", time: "2 days ago", reward: "+500 XP", icon: Star },
    { action: "Joined VIP Gold", time: "1 week ago", status: "Active", icon: Crown },
  ]

  const achievements = [
    { name: "First Steps", description: "Complete your first mission", unlocked: true, icon: Star },
    { name: "Speed Demon", description: "Win 10 street races", unlocked: true, icon: Zap },
    { name: "Property Mogul", description: "Own 5 properties", unlocked: false, icon: Home },
    { name: "Social Butterfly", description: "Make 50 friends", unlocked: true, icon: Users },
  ]

  const handleJoinDiscord = () => {
    window.open("https://discord.gg/eQeHev6p94", "_blank")
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
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 py-2 text-sm shadow-lg">
                    <Crown className="w-4 h-4 mr-2" />
                    {userData.vipStatus}
                  </Badge>
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 text-sm shadow-lg">
                    <Star className="w-4 h-4 mr-2" />
                    Level {userData.level}
                  </Badge>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-sm shadow-lg">
                    <Shield className="w-4 h-4 mr-2" />
                    Rep: {userData.reputation}%
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                    <p className="text-gray-400">Play Time</p>
                    <p className="text-white font-semibold">{userData.playTime}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-gray-400">Joined</p>
                    <p className="text-white font-semibold">{userData.joinDate}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                    <p className="text-gray-400">Achievements</p>
                    <p className="text-white font-semibold">{userData.achievements}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <Car className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-gray-400">Vehicles</p>
                    <p className="text-white font-semibold">{userData.vehicles}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Bank Balance",
              value: userData.bankBalance,
              icon: Trophy,
              color: "from-green-500 to-emerald-600",
              glowColor: "shadow-green-500/50",
            },
            {
              title: "Cash on Hand",
              value: userData.cash,
              icon: Zap,
              color: "from-yellow-500 to-orange-600",
              glowColor: "shadow-yellow-500/50",
            },
            {
              title: "Properties",
              value: userData.properties.toString(),
              icon: Home,
              color: "from-blue-500 to-cyan-600",
              glowColor: "shadow-blue-500/50",
            },
            {
              title: "Reputation",
              value: `${userData.reputation}%`,
              icon: Star,
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
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mx-auto flex items-center justify-center shadow-lg ${stat.glowColor} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
                    ></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">{stat.title}</h3>
                  <p className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Experience Progress */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <Star className="w-6 h-6 text-yellow-400" />
              Experience Progress
            </CardTitle>
            <CardDescription className="text-gray-400">
              Level {userData.level} • {userData.experience} / {userData.nextLevelExp} XP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(userData.experience / userData.nextLevelExp) * 100} className="h-4 bg-gray-800" />
            <p className="text-sm text-gray-400 mt-2">
              {userData.nextLevelExp - userData.experience} XP until next level
            </p>
          </CardContent>
        </Card>

        {/* Recent Activity & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Clock className="w-6 h-6 text-cyan-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => {
                const IconComponent = activity.icon
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      {activity.reward && <p className="text-green-400 font-semibold">{activity.reward}</p>}
                      {activity.cost && <p className="text-red-400 font-semibold">{activity.cost}</p>}
                      {activity.status && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
                          {activity.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Award className="w-6 h-6 text-purple-400" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                      achievement.unlocked
                        ? "bg-green-900/30 border border-green-500/30"
                        : "bg-gray-800/50 border border-gray-700/50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg ${
                        achievement.unlocked ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gray-700"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${achievement.unlocked ? "text-white" : "text-gray-400"}`}>
                        {achievement.name}
                      </p>
                      <p className="text-gray-400 text-sm">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Unlocked
                      </Badge>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Discord CTA */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 mt-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>

          <CardContent className="p-8 text-center relative z-10">
            <div className="relative mb-6">
              <Users className="h-16 w-16 text-purple-400 mx-auto" />
              <div className="absolute inset-0 bg-purple-400 blur-xl opacity-30"></div>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
              Join Our Community
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Connect with other players, get support, and stay updated with the latest news on our Discord server!
            </p>
            <Button
              onClick={handleJoinDiscord}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 hover:scale-105 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Users className="w-5 h-5" />
                Join Discord
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-500 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-purple-500 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-40 right-10 w-2 h-2 bg-cyan-500 rounded-full animate-bounce opacity-60"></div>
    </div>
  )
}
