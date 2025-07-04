"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, Clock, CheckCircle, XCircle, AlertCircle, Users, Timer } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { TiltCard } from "@/components/tilt-card"
import { FloatingParticles } from "@/components/floating-particles"
import { ParallaxBackground } from "@/components/parallax-background"
import { verifyUser, checkVerificationStatus, getWhitelistStats } from "@/app/actions/verification"
import { toast } from "sonner"

export default function VerifyPage() {
  const [discordId, setDiscordId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [verificationStatus, setVerificationStatus] = useState<any>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [stats, setStats] = useState({ whitelisted: 0, activeVerifications: 0, totalVerifications: 0 })

  // Load stats on component mount
  useEffect(() => {
    getWhitelistStats().then(setStats)
  }, [])

  // Timer for countdown
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (verificationStatus?.status === "active" && verificationStatus.secondsRemaining > 0) {
      setTimeRemaining(verificationStatus.secondsRemaining)

      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setVerificationStatus(null)
            setVerificationResult(null)
            toast.error("Verification expired!")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [verificationStatus])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("discordId", discordId)

      const result = await verifyUser(formData)
      setVerificationResult(result)

      if (result.success) {
        toast.success("Verification successful!")
        // Check status immediately after verification
        const status = await checkVerificationStatus(discordId)
        setVerificationStatus(status)
        // Update stats
        getWhitelistStats().then(setStats)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckStatus = async () => {
    if (!discordId) {
      toast.error("Please enter your Discord ID")
      return
    }

    setIsLoading(true)
    try {
      const status = await checkVerificationStatus(discordId)
      setVerificationStatus(status)

      if (status.success) {
        toast.success("Status checked successfully!")
      } else {
        toast.error(status.message)
      }
    } catch (error) {
      toast.error("Failed to check status")
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getProgressPercentage = () => {
    if (!timeRemaining) return 0
    return (timeRemaining / 300) * 100 // 300 seconds = 5 minutes
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
              <Shield className="h-6 w-6 text-orange-400" />
              <span className="text-orange-300 font-semibold">Player Verification</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Verify Your <span className="text-orange-500">Access</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get verified to join the server. Verification lasts for 5 minutes.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Verification Form */}
          <div className="lg:col-span-2">
            <AnimatedSection animation="slideRight" delay={200}>
              <TiltCard>
                <Card className="bg-gradient-to-br from-black/80 via-orange-950/30 to-black/80 backdrop-blur-xl border border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center gap-3">
                      <Shield className="h-8 w-8 text-orange-400" />
                      Discord Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleVerify} className="space-y-4">
                      <div>
                        <Label htmlFor="discordId" className="text-gray-300">
                          Discord ID
                        </Label>
                        <Input
                          id="discordId"
                          type="text"
                          placeholder="Enter your Discord ID (17-20 digits)"
                          value={discordId}
                          onChange={(e) => setDiscordId(e.target.value)}
                          className="bg-black/50 border-gray-600 text-white placeholder-gray-400"
                          required
                        />
                        <p className="text-sm text-gray-500 mt-1">Right-click your profile in Discord → Copy User ID</p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white flex-1"
                        >
                          {isLoading ? "Verifying..." : "Verify Now"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCheckStatus}
                          disabled={isLoading}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                        >
                          Check Status
                        </Button>
                      </div>
                    </form>

                    {/* Verification Result */}
                    {verificationResult && (
                      <div
                        className={`p-4 rounded-lg border ${
                          verificationResult.success
                            ? "bg-green-900/20 border-green-500/30 text-green-300"
                            : "bg-red-900/20 border-red-500/30 text-red-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {verificationResult.success ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <XCircle className="h-5 w-5" />
                          )}
                          <span className="font-medium">{verificationResult.message}</span>
                        </div>
                      </div>
                    )}

                    {/* Active Verification Status */}
                    {verificationStatus?.status === "active" && (
                      <div className="p-6 bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-6 w-6 text-green-400" />
                            <span className="text-green-300 font-semibold">Verification Active</span>
                          </div>
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            <Timer className="h-4 w-4 mr-1" />
                            {formatTime(timeRemaining)}
                          </Badge>
                        </div>

                        <Progress value={getProgressPercentage()} className="mb-3" />

                        <p className="text-sm text-green-200">
                          You can join the server now! Verification expires in {formatTime(timeRemaining)}.
                        </p>
                      </div>
                    )}

                    {/* Expired Status */}
                    {verificationStatus?.status === "expired" && (
                      <div className="p-4 bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-red-400" />
                          <span className="text-red-300 font-medium">Verification Expired</span>
                        </div>
                        <p className="text-sm text-red-200 mt-2">
                          Your verification has expired. Please verify again to join the server.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TiltCard>
            </AnimatedSection>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <AnimatedSection animation="slideLeft" delay={400}>
              <TiltCard>
                <Card className="bg-gradient-to-br from-black/80 via-orange-950/30 to-black/80 backdrop-blur-xl border border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <Users className="h-6 w-6 text-orange-400" />
                      Server Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-400">{stats.whitelisted}</div>
                      <div className="text-sm text-gray-400">Whitelisted Players</div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">{stats.activeVerifications}</div>
                      <div className="text-sm text-gray-400">Active Verifications</div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">{stats.totalVerifications}</div>
                      <div className="text-sm text-gray-400">Total Verifications</div>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </AnimatedSection>

            <AnimatedSection animation="slideLeft" delay={600}>
              <TiltCard>
                <Card className="bg-gradient-to-br from-black/80 via-orange-950/30 to-black/80 backdrop-blur-xl border border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <Clock className="h-6 w-6 text-orange-400" />
                      How It Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div>Enter your Discord ID to verify your identity</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>System checks if you're whitelisted</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div>Get 5 minutes of server access</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      <div>Join the server before verification expires</div>
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
