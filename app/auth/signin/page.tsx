"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Crown } from "lucide-react"
import { toast } from "sonner"

export default function SignInPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid credentials")
      } else {
        toast.success("Signed in successfully!")
        router.push("/")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-orange-600 flex items-center justify-center p-4">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-md bg-gradient-to-br from-black/40 via-orange-950/40 to-black/40 backdrop-blur-xl border border-orange-500/30 relative z-10">
        <CardHeader className="text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600/30 to-orange-400/30 backdrop-blur-xl border border-orange-500/30 rounded-full px-6 py-3 mb-4 mx-auto">
            <Crown className="h-6 w-6 text-orange-300" />
            <span className="text-orange-200 font-semibold">UNITED SERVER</span>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Sign In</CardTitle>
          <p className="text-orange-200">Access the United Server dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-orange-200">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-orange-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-orange-300">Default: admin / admin123</div>
        </CardContent>
      </Card>
    </div>
  )
}
