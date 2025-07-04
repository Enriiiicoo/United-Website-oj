"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Gamepad2, Link, AlertCircle, CheckCircle, User, Lock } from "lucide-react"
import { linkGameAccount } from "@/app/actions/account-linking"
import { redirect } from "next/navigation"

export default function LinkAccountPage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; accountName?: string } | null>(null)

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

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await linkGameAccount(formData)
      setResult(response)

      if (response.success) {
        // Redirect to dashboard after successful linking
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 2000)
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 hero-pattern">
      <div className="max-w-md mx-auto">
        <Card className="bg-black/50 border-orange-500/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
              <Link className="w-8 h-8 text-orange-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Link Game Account</CardTitle>
            <p className="text-gray-400">Connect your Discord account to your MTA character</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Discord User Info */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <img
                  src={session?.user?.image || "/placeholder.svg?height=40&width=40"}
                  alt="Discord Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="text-white font-medium">{session?.user?.name}</div>
                  <div className="text-gray-400 text-sm">Discord Account Connected</div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Gamepad2 className="w-5 h-5 text-orange-400 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p className="font-medium text-orange-400 mb-1">Before linking:</p>
                  <ul className="space-y-1 text-gray-400">
                    <li>• Make sure you've created a character in-game</li>
                    <li>• Use your exact in-game username</li>
                    <li>• Enter your account password</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Link Form */}
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  <User className="w-4 h-4 inline mr-2" />
                  Game Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your MTA username"
                  required
                  className="bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Account Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your account password"
                  required
                  className="bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Linking Account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    Link Game Account
                  </div>
                )}
              </Button>
            </form>

            {/* Result Message */}
            {result && (
              <Alert
                className={`${
                  result.success
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
              >
                {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertDescription>
                  {result.message}
                  {result.success && result.accountName && (
                    <div className="mt-2 text-sm">
                      Linked to: <strong>{result.accountName}</strong>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Security Note */}
            <div className="text-xs text-gray-500 text-center">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Your password is encrypted and secure. We never store plain text passwords.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
