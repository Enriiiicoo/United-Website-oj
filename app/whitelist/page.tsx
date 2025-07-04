"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Clock, FileText, Users, Shield, MessageSquare, AlertCircle, User, Send } from "lucide-react"

// Floating particle component
const WhitelistParticle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-1 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse opacity-70"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }}
  />
)

const applicationSteps = [
  {
    step: 1,
    title: "Discord Registration",
    description: "Join our Discord server and verify your account",
    icon: MessageSquare,
    status: "completed",
  },
  {
    step: 2,
    title: "Rules Acknowledgment",
    description: "Read and acknowledge our server rules and guidelines",
    icon: FileText,
    status: "completed",
  },
  {
    step: 3,
    title: "Application Submission",
    description: "Submit your detailed whitelist application",
    icon: Shield,
    status: "current",
  },
  {
    step: 4,
    title: "Staff Review",
    description: "Our team reviews your application and background",
    icon: Users,
    status: "pending",
  },
  {
    step: 5,
    title: "Approval",
    description: "Get approved and start your roleplay journey",
    icon: User,
    status: "pending",
  },
]

const requirements = [
  { text: "Must be 16+ years old", met: true, required: true },
  { text: "Working microphone required", met: true, required: true },
  { text: "Fluent English speaker", met: true, required: true },
  { text: "Clean record on other RP servers", met: true, required: true },
  { text: "Active Discord account", met: true, required: true },
  { text: "Detailed character backstory (100+ characters)", met: false, required: true },
  { text: "Previous RP experience", met: false, required: false },
]

export default function WhitelistPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    characterName: "",
    characterBackstory: "",
    age: "",
    previousRpExperience: "",
    whyJoin: "",
    rulesAcknowledged: false,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit your application.",
        variant: "destructive",
      })
      return
    }

    if (!formData.rulesAcknowledged) {
      toast({
        title: "Rules Acknowledgment Required",
        description: "You must acknowledge that you have read and agree to follow our rules.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/whitelist/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description:
            "Your whitelist application has been submitted successfully. You'll be notified of the decision via Discord.",
        })
        setFormData({
          characterName: "",
          characterBackstory: "",
          age: "",
          previousRpExperience: "",
          whyJoin: "",
          rulesAcknowledged: false,
        })
      } else {
        toast({
          title: "Submission Failed",
          description: data.message || "Failed to submit application. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleJoinDiscord = () => {
    window.open("https://discord.gg/eQeHev6p94", "_blank")
  }

  const completedSteps = applicationSteps.filter((step) => step.status === "completed").length
  const progressPercentage = (completedSteps / applicationSteps.length) * 100

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-transparent to-emerald-900/10"></div>

        {/* Particle System */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <WhitelistParticle key={i} delay={i * 0.1} />
          ))}
        </div>

        {/* Mouse Follow Glow */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-green-500/20 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
      </div>

      <Navigation />

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="relative inline-block">
            <Shield className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-green-500 blur-2xl opacity-30 animate-pulse"></div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500 bg-clip-text text-transparent mb-4">
            WHITELIST APPLICATION
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join our exclusive roleplay community. Complete your application to gain access to our premium gaming
            experience.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-green-500/30 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Application Progress</CardTitle>
              <Badge variant="outline" className="text-green-400 border-green-500">
                {completedSteps} of {applicationSteps.length} completed
              </Badge>
            </div>
            <div className="space-y-2">
              <Progress value={progressPercentage} className="h-3 bg-gray-800" />
              <p className="text-sm text-gray-400">{Math.round(progressPercentage)}% Complete</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applicationSteps.map((step) => {
                const IconComponent = step.icon
                const getStatusStyles = (status: string) => {
                  switch (status) {
                    case "completed":
                      return {
                        iconBg: "bg-green-100",
                        iconColor: "text-green-600",
                        border: "border-green-500/30",
                        bgColor: "bg-green-900/20",
                      }
                    case "current":
                      return {
                        iconBg: "bg-emerald-100",
                        iconColor: "text-emerald-600",
                        border: "border-emerald-500/30",
                        bgColor: "bg-emerald-900/20",
                      }
                    default:
                      return {
                        iconBg: "bg-gray-100",
                        iconColor: "text-gray-400",
                        border: "border-gray-700/50",
                        bgColor: "bg-gray-800/20",
                      }
                  }
                }

                const styles = getStatusStyles(step.status)

                return (
                  <div
                    key={step.step}
                    className={`border rounded-lg p-4 ${styles.border} ${styles.bgColor} backdrop-blur-sm`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`${styles.iconBg} rounded-full p-3 shadow-lg`}>
                        <IconComponent className={`h-5 w-5 ${styles.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white">
                            Step {step.step}: {step.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {step.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                            {step.status === "current" && <Clock className="h-5 w-5 text-emerald-500" />}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <FileText className="h-5 w-5 mr-2 text-green-500" />
              Requirements Checklist
            </CardTitle>
            <CardDescription className="text-gray-400">
              Make sure you meet all requirements before submitting your application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requirements.map((requirement, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3">
                    {requirement.met ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    <div>
                      <span className={`text-sm font-medium ${requirement.met ? "text-gray-300" : "text-yellow-300"}`}>
                        {requirement.text}
                      </span>
                      {requirement.required && (
                        <Badge variant="outline" className="ml-2 text-xs border-red-500 text-red-400">
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={requirement.met ? "default" : "secondary"}
                    className={requirement.met ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"}
                  >
                    {requirement.met ? "Met" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 animate-pulse"></div>

          <CardHeader className="relative z-10">
            <CardTitle className="text-center text-white text-2xl">Submit Your Application</CardTitle>
            <CardDescription className="text-center text-gray-300">
              Fill out all required fields to complete your whitelist application.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="characterName" className="text-white">
                    Character Name *
                  </Label>
                  <Input
                    id="characterName"
                    value={formData.characterName}
                    onChange={(e) => setFormData({ ...formData, characterName: e.target.value })}
                    placeholder="John_Doe"
                    required
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                  />
                </div>
                <div>
                  <Label htmlFor="age" className="text-white">
                    Character Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="16"
                    max="100"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="25"
                    required
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="characterBackstory" className="text-white">
                  Character Backstory * (minimum 100 characters)
                </Label>
                <Textarea
                  id="characterBackstory"
                  value={formData.characterBackstory}
                  onChange={(e) => setFormData({ ...formData, characterBackstory: e.target.value })}
                  placeholder="Tell us about your character's background, history, and personality..."
                  required
                  rows={6}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.characterBackstory.length}/100 characters minimum
                </p>
              </div>

              <div>
                <Label htmlFor="whyJoin" className="text-white">
                  Why do you want to join our server? * (minimum 50 characters)
                </Label>
                <Textarea
                  id="whyJoin"
                  value={formData.whyJoin}
                  onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                  placeholder="Explain why you want to join our roleplay community..."
                  required
                  rows={4}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                />
                <p className="text-xs text-gray-400 mt-1">{formData.whyJoin.length}/50 characters minimum</p>
              </div>

              <div>
                <Label htmlFor="previousRpExperience" className="text-white">
                  Previous RP Experience (optional)
                </Label>
                <Textarea
                  id="previousRpExperience"
                  value={formData.previousRpExperience}
                  onChange={(e) => setFormData({ ...formData, previousRpExperience: e.target.value })}
                  placeholder="Tell us about your previous roleplay experience on other servers..."
                  rows={3}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rulesAcknowledged"
                  checked={formData.rulesAcknowledged}
                  onChange={(e) => setFormData({ ...formData, rulesAcknowledged: e.target.checked })}
                  className="w-4 h-4 text-green-600 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
                  required
                />
                <Label htmlFor="rulesAcknowledged" className="text-white">
                  I have read and agree to follow all server rules and guidelines *
                </Label>
              </div>

              <div className="text-center space-y-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !session}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-green-500/50 hover:shadow-green-500/80 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Button>

                {!session && (
                  <p className="text-yellow-400 text-sm">Please sign in with Discord to submit your application.</p>
                )}

                <div className="text-center">
                  <Button
                    type="button"
                    onClick={handleJoinDiscord}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent backdrop-blur-sm hover:border-green-500/50 transition-all duration-300"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Join Our Discord
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-green-500 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-emerald-500 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-cyan-500 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-40 right-10 w-2 h-2 bg-green-500 rounded-full animate-bounce opacity-60"></div>
    </div>
  )
}
