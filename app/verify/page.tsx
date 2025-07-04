"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, CheckCircle, AlertCircle, Users, UserCheck, Activity, LinkIcon, Crown } from "lucide-react"
import { verifyAuthenticatedUser, checkAuthenticatedUserStatus } from "@/app/actions/verification"
import { redirect } from "next/navigation"

interface VerificationResult {
  success: boolean
  message: string
  expiresAt?: string
  user?: {
    username: string
    discriminator: string
  }
}

interface StatusResult {
  success: boolean
  status?: string
  secondsRemaining?: number
  expiresAt?: string
  verifiedAt?: string
  message: string
  user?: {
    username: string
    discriminator: string
  }
}

export default function VerifyPage() {
  const { data: session, status } = useSession()
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [statusResult, setStatusResult] = useState<StatusResult | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [linkedAccount, setLinkedAccount] = useState<any>(null)
  const [stats, setStats] = useState({
    whitelisted: 0,
    activeVerifications: 0,
    totalVerifications: 0,
    registeredUsers: 0,
  })

  // Check verification status on component mount
  useEffect(() => {
    checkStatus()
    fetchStats()
    fetchLinkedAccount()
  }, [])

  // Update countdown timer
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            checkStatus() // Recheck status when timer expires
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeRemaining])

  const fetchLinkedAccount = async () => {
    try {
      const response = await fetch("/api/linked-account")
      if (response.ok) {
        const account = await response.json()
        setLinkedAccount(account)
      }
    } catch (error) {
      console.error("Failed to fetch linked account:", error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  const checkStatus = async () => {
    try {
      const result = await checkAuthenticatedUserStatus()
      setStatusResult(result)

      if (result.success && result.secondsRemaining) {
        setTimeRemaining(result.secondsRemaining)
      }
    } catch (error) {
      console.error("Status check failed:", error)
    }
  }

  const handleVerify = async () => {
    if (!linkedAccount) {
      redirect("/link-account")
      return
    }

    setIsVerifying(true)
    setVerificationResult(null)

    try {
      const result = await verifyAuthenticatedUser()
      setVerificationResult(result)

      if (result.success && result.expiresAt) {
        const expiresAt = new Date(result.expiresAt).getTime()
        const now = Date.now()
        const secondsRemaining = Math.max(0, Math.floor((expiresAt - now) / 1000))
        setTimeRemaining(secondsRemaining)
      }

      // Refresh status after verification
      setTimeout(checkStatus, 1000)
    } catch (error) {
      setVerificationResult({
        success: false,
        message: "Verification failed. Please try again.",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const progressPercentage = timeRemaining > 0 ? (timeRemaining / 300) * 100 : 0

  // Check if user is authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 hero-pattern flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 hero-pattern">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Server Verification</h1>
          <p className="text-gray-400 text-lg">Verify your access to join the MTA server</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Verification Card */}
          <div className="lg:col-span-2">
            <Card className="bg-black/50 border-orange-500/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-orange-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Access Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* User Info */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={session?.user?.image || "/placeholder.svg?height=50&width=50"}
                      alt="Discord Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium text-lg">{session?.user?.name}</div>
                      <div className="text-gray-400">Discord Account Connected</div>
                      {linkedAccount && (
                        <div className="flex items-center gap-2 mt-1">
                          <LinkIcon className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">Linked to: {linkedAccount.username}</span>
                          {linkedAccount.vip_level > 0 && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                              <Crown className="w-3 h-3 mr-1" />
                              VIP
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                </div>

                {/* Account Linking Check */}
                {!linkedAccount && (
                  <Alert className="bg-orange-500/10 border-orange-500/30 text-orange-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      You need to link your game account first before verifying.
                      <Button
                        className="ml-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 h-auto"
                        onClick={() => (window.location.href = "/link-account")}
                      >
                        Link Account
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Verification Status */}
                {statusResult && statusResult.success && statusResult.status === "active" && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <div>
                        <div className="text-green-400 font-medium">Verification Active</div>
                        <div className="text-gray-400 text-sm">You can join the server now!</div>
                      </div>
                    </div>

                    {timeRemaining > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Time remaining:</span>
                          <span className="text-green-400 font-mono">{formatTime(timeRemaining)}</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2 bg-gray-700" />
                      </div>
                    )}
                  </div>
                )}

                {/* Verification Button */}
                <Button
                  onClick={handleVerify}
                  disabled={
                    isVerifying || !linkedAccount || (statusResult?.success && statusResult?.status === "active")
                  }
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 text-lg"
                >
                  {isVerifying ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying Access...
                    </div>
                  ) : statusResult?.success && statusResult?.status === "active" ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Already Verified
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Verify Server Access
                    </div>
                  )}
                </Button>

                {/* Result Messages */}
                {verificationResult && (
                  <Alert
                    className={`${
                      verificationResult.success
                        ? "bg-green-500/10 border-green-500/30 text-green-400"
                        : "bg-red-500/10 border-red-500/30 text-red-400"
                    }`}
                  >
                    {verificationResult.success ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>{verificationResult.message}</AlertDescription>
                  </Alert>
                )}

                {statusResult && !statusResult.success && (
                  <Alert className="bg-red-500/10 border-red-500/30 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{statusResult.message}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Server Stats */}
            <Card className="bg-black/50 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400 text-lg">Server Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Registered</span>
                  </div>
                  <span className="text-white font-medium">{stats.registeredUsers}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Whitelisted</span>
                  </div>
                  <span className="text-white font-medium">{stats.whitelisted}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-400" />
                    <span className="text-gray-300">Active Now</span>
                  </div>
                  <span className="text-white font-medium">{stats.activeVerifications}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">Total Verified</span>
                  </div>
                  <span className="text-white font-medium">{stats.totalVerifications}</span>
                </div>
              </CardContent>
            </Card>

            {/* How it Works */}
            <Card className="bg-black/50 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400 text-lg">How it Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-400 text-xs">1</span>
                  </div>
                  <span>Sign in with your Discord account</span>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-400 text-xs">2</span>
                  </div>
                  <span>Link your in-game MTA account</span>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 text-xs">3</span>
                  </div>
                  <span>Click "Verify Access" to get 5 minutes of server access</span>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-400 text-xs">4</span>
                  </div>
                  <span>Join the server using your linked account</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
