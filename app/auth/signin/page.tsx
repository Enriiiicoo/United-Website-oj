"use client"

import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Loader2 } from "lucide-react"

export default function SignInPage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    // If user is already signed in, redirect to dashboard
    if (session?.user?.discordId) {
      window.location.href = "/dashboard"
    }
  }, [session])

  const handleDiscordSignIn = () => {
    signIn("discord", {
      callbackUrl: "/auth/callback",
    })
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-600">Welcome Back</CardTitle>
          <CardDescription>Sign in to your United Roleplay account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleDiscordSignIn} className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            Continue with Discord
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/auth/signup" className="text-orange-600 hover:underline">
              Sign up here
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
