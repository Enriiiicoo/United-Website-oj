"use client"

import { signIn, getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, MessageCircle, Shield, Users } from "lucide-react"
import { toast } from "sonner"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push("/")
      }
    })
  }, [router])

  const handleDiscordSignIn = async () => {
    setIsLoading(true)
    try {
      const result = await signIn("discord", {
        callbackUrl: "/",
        redirect: false,
      })

      if (result?.error) {
        toast.error("Failed to sign in with Discord")
      } else {
        toast.success("Successfully signed in!")
      }
    } catch (error) {
      toast.error("An error occurred during sign in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-orange-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600/30 to-orange-400/30 backdrop-blur-xl border border-orange-500/30 rounded-full px-6 py-3 mb-6">
              <Crown className="h-6 w-6 text-orange-300" />
              <span className="text-orange-200 font-semibold">UNITED SERVER</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to <span className="text-orange-300">United Server</span>
            </h1>
            <p className="text-lg text-orange-100 opacity-90">Sign in with Discord to access the server</p>
          </div>

          {/* Sign In Card */}
          <Card className="bg-gradient-to-br from-black/40 via-orange-950/40 to-black/40 backdrop-blur-xl border border-orange-500/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3 justify-center">
                <MessageCircle className="h-8 w-8 text-blue-400" />
                Discord Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-orange-100 space-y-4 text-center">
                <p>Sign in with your Discord account to:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 justify-center">
                    <Shield className="h-4 w-4 text-green-400" />
                    Get instant server verification
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <Users className="h-4 w-4 text-blue-400" />
                    Access your whitelist status
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <Crown className="h-4 w-4 text-orange-400" />
                    View your account information
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleDiscordSignIn}
                disabled={isLoading}
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-6 w-6" />
                {isLoading ? "Signing in..." : "Sign in with Discord"}
              </Button>

              <div className="text-xs text-orange-200/70 text-center">
                By signing in, you agree to our terms of service and privacy policy.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
