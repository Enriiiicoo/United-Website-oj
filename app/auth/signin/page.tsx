"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export default function SignInPage() {
  const handleDiscordSignIn = () => {
    signIn("discord", {
      callbackUrl: "/auth/signup",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-600">Welcome Back</CardTitle>
          <CardDescription>Sign in to your United Roleplay account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleDiscordSignIn} className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            Continue with Discord
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
