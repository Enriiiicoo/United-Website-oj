"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Clock, Calendar, Play, MessageSquare, ExternalLink } from "lucide-react"

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fillOpacity=%220.02%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <span className="text-xl font-bold text-orange-500">UNITED Original</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/rules" className="text-gray-300 hover:text-white transition-colors">
            Rules
          </Link>
          <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">
            Gallery
          </Link>
          <Link href="/vip" className="text-gray-300 hover:text-white transition-colors">
            VIP
          </Link>
          <Link href="/staff" className="text-gray-300 hover:text-white transition-colors">
            Staff
          </Link>
          {session && (
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              📊 Dashboard
            </Link>
          )}
          <Link href="/whitelist" className="text-gray-300 hover:text-white transition-colors">
            Request Whitelist
          </Link>
        </div>

        <div>
          {session ? (
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/auth/signin">
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0">
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6">
        {/* Logo Card */}
        <Card className="bg-gradient-to-br from-orange-600 to-red-700 p-8 mb-8 border-0 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">U</span>
            </div>
            <div className="text-4xl font-bold text-white mb-2 tracking-wider">UNITED</div>
            <div className="text-orange-200 text-sm font-medium mb-2">HAPPY NEW YEAR</div>
            <div className="text-orange-200 text-xs">Advanced Roleplay Experience</div>
            <div className="text-orange-200 text-xs">2024-2025</div>
          </div>
        </Card>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          UNITED ORIGINAL
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl md:text-2xl text-gray-300 text-center mb-6 font-medium">Advanced GTA Roleplay Server</h2>

        {/* Description */}
        <p className="text-gray-400 text-center max-w-2xl mb-12 leading-relaxed">
          Experience the ultimate roleplay adventure in our most immersive GTA server. Join thousands of players since
          2024.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">100+</div>
            <div className="text-gray-400 text-sm">Players</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-gray-400 text-sm">Online</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">2024</div>
            <div className="text-gray-400 text-sm">Since</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">Roleplay</div>
            <div className="text-gray-400 text-sm">Focus</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 text-lg font-semibold border-0">
            <Play className="w-5 h-5 mr-2" />
            Join Server
          </Button>
          <Button
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 text-lg font-semibold bg-transparent"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Join Discord
          </Button>
          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 text-lg font-semibold bg-transparent"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Watch Trailer
          </Button>
        </div>

        {/* Server IP */}
        <div className="text-center">
          <div className="text-gray-500 text-sm mb-1">Server IP</div>
          <div className="text-orange-500 font-mono text-lg">connect.united-rp.com</div>
        </div>
      </div>
    </div>
  )
}
