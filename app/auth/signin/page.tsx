"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, LogIn, UserPlus } from "lucide-react"
import { toast } from "sonner"

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Sign In State
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  })

  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        username: signInData.username,
        password: signInData.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid username or password")
      } else {
        toast.success("Signed in successfully!")
        router.push("/dashboard")
      }
    } catch (error) {
      toast.error("An error occurred during sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    if (signUpData.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signUpData.username,
          email: signUpData.email,
          password: signUpData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Account created successfully!")
        // Auto sign in after successful signup
        const result = await signIn("credentials", {
          username: signUpData.username,
          password: signUpData.password,
          redirect: false,
        })

        if (!result?.error) {
          router.push("/dashboard")
        }
      } else {
        toast.error(data.error || "Failed to create account")
      }
    } catch (error) {
      toast.error("An error occurred during sign up")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-orange-600 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600/30 to-orange-400/30 backdrop-blur-xl border border-orange-500/30 rounded-full px-6 py-3 mb-6">
              <Crown className="h-6 w-6 text-orange-300" />
              <span className="text-orange-200 font-semibold">UNITED SERVER</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Welcome</h1>
            <p className="text-orange-200">Sign in to access your account</p>
          </div>

          <Card className="bg-gradient-to-br from-black/40 via-orange-950/40 to-black/40 backdrop-blur-xl border border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">Account Access</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-black/30">
                  <TabsTrigger value="signin" className="data-[state=active]:bg-orange-500/30 text-white">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-orange-500/30 text-white">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-4 mt-6">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <Label className="text-orange-200">Username</Label>
                      <Input
                        value={signInData.username}
                        onChange={(e) => setSignInData({ ...signInData, username: e.target.value })}
                        placeholder="Enter your username"
                        className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-orange-200">Password</Label>
                      <Input
                        type="password"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        placeholder="Enter your password"
                        className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <Label className="text-orange-200">Username</Label>
                      <Input
                        value={signUpData.username}
                        onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                        placeholder="Choose a username"
                        className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-orange-200">Email</Label>
                      <Input
                        type="email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        placeholder="Enter your email"
                        className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-orange-200">Password</Label>
                      <Input
                        type="password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        placeholder="Create a password"
                        className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-orange-200">Confirm Password</Label>
                      <Input
                        type="password"
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                        placeholder="Confirm your password"
                        className="bg-black/30 border-orange-500/30 text-white placeholder:text-orange-300/50"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
