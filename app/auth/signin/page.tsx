"use client"

import { signIn, getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, MessageCircle, Shield, Users } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { TiltCard } from "@/components/tilt-card"
import { FloatingParticles } from "@/components/floating-particles"
import { ParallaxBackground } from "@/components/parallax-background"
import { toast } from "sonner"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push("/verify")
      }
    })
  }, [router])

  const handleDiscordSignIn = async () => {
    setIsLoading(true)
    try {
      const result = await signIn("discord", {
        callbackUrl: "/verify",
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
    <div className="min-h-screen hero-pattern relative overflow-hidden">
      <ParallaxBackground />
      <FloatingParticles />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <AnimatedSection animation="slideUp">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600/20 to-orange-400/20 backdrop-blur-xl border border-orange-500/30 rounded-full px-6 py-3 mb-6">
              <Crown className="h-6 w-6 text-orange-400" />
              <span className="text-orange-300 font-semibold">UNITED SERVER</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Sign In with <span className="text-orange-500">Discord</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Connect your Discord account to access server verification and features.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sign In Card */}
            <AnimatedSection animation="slideRight" delay={200}>
              <TiltCard>
                <Card className="bg-gradient-to-br from-black/80 via-orange-950/30 to-black/80 backdrop-blur-xl border border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center gap-3">
                      <MessageCircle className="h-8 w-8 text-blue-400" />
                      Discord Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-gray-300 space-y-4">
                      <p>Sign in with your Discord account to:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-400" />
                          Get instant 5-minute server verification
                        </li>
                        <li className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-400" />
                          Access your whitelist status
                        </li>
                        <li className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-orange-400" />
                          View your account information
                        </li>
                      </ul>
                    </div>

                    <Button
                      onClick={handleDiscordSignIn}
                      disabled={isLoading}
                      className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <MessageCircle className="h-6 w-6" />
                      {isLoading ? "Signing in..." : "Sign in with Discord"}
                    </Button>

                    <div className="text-xs text-gray-500 text-center">
                      By signing in, you agree to our terms of service and privacy policy.
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </AnimatedSection>

            {/* Info Card */}
            <AnimatedSection animation="slideLeft" delay={400}>
              <TiltCard>
                <Card className="bg-gradient-to-br from-black/80 via-orange-950/30 to-black/80 backdrop-blur-xl border border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center gap-3">
                      <Shield className="h-8 w-8 text-orange-400" />
                      How It Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4 text-sm text-gray-300">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Connect Discord</h4>
                          <p>Sign in with your Discord account securely</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Check Whitelist</h4>
                          <p>System automatically checks if you're whitelisted</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">One-Click Verify</h4>
                          <p>Click "Verify Access" to get 5 minutes of server access</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Join Server</h4>
                          <p>Connect to the server before verification expires</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                      <h4 className="font-semibold text-orange-300 mb-2">Security & Privacy</h4>
                      <p className="text-xs text-gray-400">
                        We only access your Discord ID, username, and avatar. No messages or private information is
                        accessed.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
}
