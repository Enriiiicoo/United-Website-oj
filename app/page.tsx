"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Clock, Calendar, Play, MessageSquare, ExternalLink, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

// Particle component for background animation
const Particle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-70"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }}
  />
)

export default function HomePage() {
  const { data: session } = useSession()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleJoinServer = () => {
    // Copy server IP to clipboard
    navigator.clipboard.writeText("connect.united-rp.com")
    alert("Server IP copied to clipboard!")
  }

  const handleJoinDiscord = () => {
    window.open("https://discord.gg/united-rp", "_blank")
  }

  const handleWatchTrailer = () => {
    window.open("https://youtube.com/watch?v=trailer", "_blank")
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-transparent to-red-900/20"></div>
        </div>

        {/* Particle System */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <Particle key={i} delay={i * 0.1} />
          ))}
        </div>

        {/* Mouse Follow Glow */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-orange-500/20 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 backdrop-blur-xl bg-black/30 border-b border-orange-500/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/50 group-hover:shadow-orange-500/80 transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              UNITED Original
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "/rules", label: "Rules" },
              { href: "/gallery", label: "Gallery" },
              { href: "/vip", label: "VIP" },
              { href: "/staff", label: "Staff" },
              ...(session ? [{ href: "/dashboard", label: "📊 Dashboard" }] : []),
              { href: "/whitelist", label: "Request Whitelist" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-gray-300 hover:text-white transition-all duration-300 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          <div>
            {session ? (
              <Link href="/dashboard">
                <Button className="relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105 overflow-hidden group">
                  <span className="relative z-10">Dashboard</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <Button className="relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105 overflow-hidden group">
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
        {/* Logo Card */}
        <div className="relative mb-12 group">
          <Card className="relative bg-gradient-to-br from-orange-600/90 to-red-700/90 backdrop-blur-xl p-10 border border-orange-500/30 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-500 hover:scale-105">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-yellow-500/50 animate-pulse">
                  <span className="text-3xl font-bold text-white">U</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
              </div>
              <div className="text-5xl font-bold text-white mb-3 tracking-wider animate-pulse">UNITED</div>
              <div className="text-orange-200 text-lg font-medium mb-3 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                HAPPY NEW YEAR
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-orange-200 text-sm">Advanced Roleplay Experience</div>
              <div className="text-orange-200 text-sm font-bold">2024-2025</div>
            </div>
          </Card>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-700 rounded-lg blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        </div>

        {/* Main Title */}
        <h1 className="text-7xl md:text-9xl font-bold text-center mb-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          UNITED ORIGINAL
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-3xl text-center mb-8 font-medium bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
          Advanced GTA Roleplay Server
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-center max-w-3xl mb-16 leading-relaxed text-lg">
          Experience the ultimate roleplay adventure in our most immersive GTA server. Join thousands of players since
          2024 in the most advanced roleplay experience ever created.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Users, value: "100+", label: "Players", color: "from-green-500 to-emerald-600" },
            { icon: Clock, value: "24/7", label: "Online", color: "from-blue-500 to-cyan-600" },
            { icon: Calendar, value: "2024", label: "Since", color: "from-purple-500 to-violet-600" },
            { icon: Play, value: "Roleplay", label: "Focus", color: "from-orange-500 to-red-600" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mx-auto flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
                ></div>
              </div>
              <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-12">
          <Button
            onClick={handleJoinServer}
            className="relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-4 text-xl font-semibold border-0 shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/80 transition-all duration-300 hover:scale-110 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Play className="w-6 h-6" />
              Join Server
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Button>

          <Button
            onClick={handleJoinDiscord}
            variant="outline"
            className="relative border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-10 py-4 text-xl font-semibold bg-transparent backdrop-blur-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/60 transition-all duration-300 hover:scale-110 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              <MessageSquare className="w-6 h-6" />
              Join Discord
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Button>

          <Button
            onClick={handleWatchTrailer}
            variant="outline"
            className="relative border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-10 py-4 text-xl font-semibold bg-transparent backdrop-blur-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 transition-all duration-300 hover:scale-110 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              <ExternalLink className="w-6 h-6" />
              Watch Trailer
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Button>
        </div>

        {/* Server IP */}
        <div className="text-center group">
          <div className="text-gray-400 text-sm mb-2 group-hover:text-gray-300 transition-colors duration-300">
            Server IP
          </div>
          <div
            className="text-orange-400 font-mono text-2xl cursor-pointer hover:text-orange-300 transition-all duration-300 hover:scale-110 p-4 rounded-lg backdrop-blur-xl bg-orange-500/10 border border-orange-500/30 hover:border-orange-500/60"
            onClick={() => {
              navigator.clipboard.writeText("connect.united-rp.com")
              alert("Server IP copied to clipboard!")
            }}
          >
            connect.united-rp.com
          </div>
          <div className="text-xs text-gray-500 mt-2">Click to copy</div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-orange-500 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-red-500 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-yellow-500 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-40 right-10 w-2 h-2 bg-pink-500 rounded-full animate-bounce opacity-60"></div>
    </div>
  )
}
