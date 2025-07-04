"use client"

import type React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Loader2, Sparkles } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-transparent to-red-900/20"></div>
        </div>

        <Navigation />
        <div className="flex items-center justify-center h-96 relative z-10">
          <div className="text-center">
            <div className="relative mb-8">
              <Loader2 className="h-16 w-16 animate-spin text-orange-500 mx-auto" />
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            </div>
            <p className="text-2xl font-semibold text-white mb-2">Loading Dashboard</p>
            <p className="text-gray-400">Preparing your experience...</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
              <span className="text-orange-400 text-sm">United Roleplay</span>
              <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 via-transparent to-red-900/10"></div>
        </div>

        {/* Mouse Follow Glow */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-500"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse opacity-50"></div>
      </div>

      <Navigation />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
              {title}
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded-full"></div>
          </div>
        )}

        <div className="relative">{children}</div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-orange-500 rounded-full animate-bounce opacity-40"></div>
      <div className="absolute top-40 right-20 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-4 h-4 bg-yellow-500 rounded-full animate-ping opacity-30"></div>
      <div className="absolute bottom-40 right-10 w-2 h-2 bg-pink-500 rounded-full animate-bounce opacity-40"></div>
    </div>
  )
}
