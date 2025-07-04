"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Clock, Calendar, Play, MessageSquare, ExternalLink, Crown, Zap, Star, Shield } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

// Floating particle component
const FloatingParticle = ({ delay, duration }: { delay: number; duration: number }) => (
  <div
    className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-60"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `float ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  />
)

// Animated background grid
const AnimatedGrid = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,165,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,165,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse"></div>
  </div>
)

export default function HomePage() {
  const { data: session } = useSession()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleJoinServer = () => {
    navigator.clipboard.writeText("connect.united-rp.com")
    alert("🎮 Server IP copied to clipboard! Launch GTA and connect now!")
  }

  const handleJoinDiscord = () => {
    window.open("https://discord.gg/united-rp", "_blank")
  }

  const handleWatchTrailer = () => {
    window.open("https://youtube.com/watch?v=united-trailer", "_blank")
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Background System */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

        {/* Dynamic color overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 via-transparent to-red-900/10"></div>

        {/* Animated grid */}
        <AnimatedGrid />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.2} duration={3 + Math.random() * 4} />
          ))}
        </div>

        {/* Mouse follow glow */}
        <div
          className="absolute w-[600px] h-[600px] bg-gradient-radial from-orange-500/15 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
          }}
        />

        {/* Parallax background elements */}
        <div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-xl"
          style={{ transform: `translateY(${scrollY * -0.15}px)` }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-2xl bg-black/30 border-b border-orange-500/20 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/50 group-hover:shadow-orange-500/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                UNITED
              </span>
              <span className="text-sm text-orange-400 font-medium">SERVER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: "/", label: "Home", icon: Crown },
              { href: "/rules", label: "Rules", icon: Shield },
              { href: "/gallery", label: "Gallery", icon: Star },
              { href: "/vip", label: "VIP", icon: Zap },
              { href: "/staff", label: "Staff", icon: Users },
              ...(session ? [{ href: "/dashboard", label: "Dashboard", icon: Calendar }] : []),
              { href: "/whitelist", label: "Whitelist", icon: Play },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-gray-300 hover:text-white transition-all duration-300 group px-4 py-2 rounded-lg hover:bg-white/5 backdrop-blur-sm flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Auth Button */}
          <div>
            {session ? (
              <Link href="/dashboard">
                <Button className="relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105 overflow-hidden group px-6 py-3">
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Dashboard
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <Button className="relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105 overflow-hidden group px-6 py-3">
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Login
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <div className="relative z-10 min-h-[calc(100vh-80px)] flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Server Logo */}
            <div className="relative group">
              <div className="w-32 h-32 mx-auto lg:mx-0 relative">
                <Image
                  src="/server-logo.png"
                  alt="UNITED Server Logo"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-7xl lg:text-8xl font-black leading-none">
                <span className="block text-white drop-shadow-2xl">UNITED</span>
                <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  SERVER
                </span>
              </h1>

              {/* Subtitle with animated underline */}
              <div className="relative">
                <h2 className="text-2xl lg:text-3xl text-gray-300 font-light">Advanced GTA Roleplay Experience</h2>
                <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
              Immerse yourself in the ultimate roleplay adventure. Join our thriving community of players in the most
              authentic and advanced GTA server experience since 2024.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleJoinServer}
                className="relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold border-0 shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  Join Server
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Button>

              <Button
                onClick={handleJoinDiscord}
                variant="outline"
                className="relative border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-4 text-lg font-semibold bg-transparent backdrop-blur-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/60 transition-all duration-300 hover:scale-105 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  Discord
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Button>

              <Button
                onClick={handleWatchTrailer}
                variant="outline"
                className="relative border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 text-lg font-semibold bg-transparent backdrop-blur-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 transition-all duration-300 hover:scale-105 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <ExternalLink className="w-5 h-5" />
                  Trailer
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Button>
            </div>

            {/* Server IP */}
            <div className="space-y-2">
              <div className="text-gray-500 text-sm">Server IP</div>
              <div
                className="inline-block text-orange-400 font-mono text-xl cursor-pointer hover:text-orange-300 transition-all duration-300 hover:scale-105 p-4 rounded-lg backdrop-blur-xl bg-orange-500/10 border border-orange-500/30 hover:border-orange-500/60 shadow-lg shadow-orange-500/20"
                onClick={handleJoinServer}
              >
                connect.united-rp.com
              </div>
              <div className="text-xs text-gray-500">Click to copy</div>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Users,
                  value: "500+",
                  label: "Active Players",
                  color: "from-green-500 to-emerald-600",
                  glow: "shadow-green-500/50",
                },
                {
                  icon: Clock,
                  value: "24/7",
                  label: "Online",
                  color: "from-blue-500 to-cyan-600",
                  glow: "shadow-blue-500/50",
                },
                {
                  icon: Calendar,
                  value: "2024",
                  label: "Since",
                  color: "from-purple-500 to-violet-600",
                  glow: "shadow-purple-500/50",
                },
                {
                  icon: Crown,
                  value: "Premium",
                  label: "Experience",
                  color: "from-orange-500 to-red-600",
                  glow: "shadow-orange-500/50",
                },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div
                    className={`relative p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br ${stat.color}/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 ${stat.glow} hover:shadow-lg`}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg ${stat.glow} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose UNITED?</h3>
              {[
                { icon: Shield, text: "Advanced Anti-Cheat System", color: "text-green-400" },
                { icon: Users, text: "Professional Staff Team", color: "text-blue-400" },
                { icon: Star, text: "Custom Scripts & Features", color: "text-purple-400" },
                { icon: Zap, text: "High Performance Servers", color: "text-orange-400" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-4 group">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-32 right-20 w-4 h-4 bg-orange-500 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-64 left-20 w-3 h-3 bg-red-500 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-32 right-32 w-5 h-5 bg-yellow-500 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-64 left-32 w-2 h-2 bg-pink-500 rounded-full animate-bounce opacity-60"></div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}
