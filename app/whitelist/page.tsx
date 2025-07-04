"use client"

import { Navigation } from "@/components/navigation"
import { ProtectedPage } from "@/components/protected-page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, FileText, Users, Shield, MessageSquare, AlertCircle } from "lucide-react"

const applicationSteps = [
  {
    step: 1,
    title: "Join Discord Server",
    description: "Connect with our community and access the whitelist application channel",
    icon: MessageSquare,
    status: "completed",
    details: "You must be an active member of our Discord server to apply",
  },
  {
    step: 2,
    title: "Read Server Rules",
    description: "Thoroughly review our community guidelines and roleplay rules",
    icon: FileText,
    status: "completed",
    details: "Understanding our rules is essential for successful roleplay",
  },
  {
    step: 3,
    title: "Submit Application",
    description: "Complete the detailed whitelist application form",
    icon: Shield,
    status: "current",
    details: "Provide detailed character backstory and roleplay experience",
  },
  {
    step: 4,
    title: "Staff Review",
    description: "Our team reviews your application and character concept",
    icon: Users,
    status: "pending",
    details: "Review process typically takes 3-5 business days",
  },
  {
    step: 5,
    title: "Interview Process",
    description: "Voice interview with staff to discuss your application",
    icon: CheckCircle,
    status: "pending",
    details: "Final step before approval - showcase your roleplay skills",
  },
]

const requirements = [
  { text: "Must be 16+ years old", met: true },
  { text: "Have a working microphone", met: true },
  { text: "Speak fluent English", met: true },
  { text: "No recent bans from RP servers", met: true },
  { text: "Discord account in good standing", met: true },
  { text: "Commit to quality roleplay", met: false },
]

const applicationStats = [
  { label: "Applications This Month", value: "127", change: "+12%" },
  { label: "Average Processing Time", value: "4.2 days", change: "-0.8 days" },
  { label: "Approval Rate", value: "68%", change: "+5%" },
  { label: "Active Whitelisted Players", value: "1,247", change: "+23" },
]

export default function WhitelistPage() {
  const completedSteps = applicationSteps.filter((step) => step.status === "completed").length
  const progressPercentage = (completedSteps / applicationSteps.length) * 100

  return (
    <ProtectedPage title="Whitelist Application">
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Whitelist <span className="text-orange-600">Application</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Join our exclusive roleplay community. Our whitelist process ensures we maintain the highest quality
                  roleplay environment.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Application Progress */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Your Application Progress</CardTitle>
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  Step {completedSteps + 1} of {applicationSteps.length}
                </Badge>
              </div>
              <div className="space-y-2">
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-sm text-gray-600">{Math.round(progressPercentage)}% Complete</p>
              </div>
            </CardHeader>
          </Card>

          {/* Application Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Process</h2>
              {applicationSteps.map((step) => {
                const IconComponent = step.icon
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case "completed":
                      return "text-green-600 bg-green-100"
                    case "current":
                      return "text-orange-600 bg-orange-100"
                    case "pending":
                      return "text-gray-400 bg-gray-100"
                    default:
                      return "text-gray-400 bg-gray-100"
                  }
                }

                return (
                  <Card key={step.step} className={`${step.status === "current" ? "ring-2 ring-orange-200" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className={`rounded-full p-2 ${getStatusColor(step.status)}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">
                              Step {step.step}: {step.title}
                            </h3>
                            {step.status === "completed" && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {step.status === "current" && <Clock className="w-5 h-5 text-orange-600" />}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                          <p className="text-xs text-gray-500">{step.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Requirements & Stats */}
            <div className="space-y-6">
              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-orange-600" />
                    Requirements Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {requirement.met ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                          )}
                          <span className={`text-sm ${requirement.met ? "text-gray-700" : "text-orange-700"}`}>
                            {requirement.text}
                          </span>
                        </div>
                        <Badge variant={requirement.met ? "default" : "secondary"} className="text-xs">
                          {requirement.met ? "Met" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Application Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Statistics</CardTitle>
                  <CardDescription>Current whitelist metrics and processing times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {applicationStats.map((stat, index) => (
                      <div key={index} className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">{stat.value}</p>
                        <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                        <Badge variant="outline" className="text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Application CTA */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">Ready to Begin Your Journey?</CardTitle>
              <CardDescription className="text-lg">
                Start your whitelist application today and join our thriving roleplay community.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <MessageSquare className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-orange-800 mb-1">Join Discord</h4>
                  <p className="text-sm text-orange-700">Connect with our community first</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <FileText className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-orange-800 mb-1">Complete Application</h4>
                  <p className="text-sm text-orange-700">Detailed character and background info</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-orange-800 mb-1">Get Approved</h4>
                  <p className="text-sm text-orange-700">Join our whitelisted community</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-orange-600 hover:bg-orange-700" size="lg">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Application on Discord
                </Button>
                <Button variant="outline" size="lg">
                  <FileText className="w-4 h-4 mr-2" />
                  View Application Form
                </Button>
              </div>

              <div className="flex justify-center space-x-4">
                <Badge variant="outline" className="text-sm">
                  <Clock className="w-3 h-3 mr-1" />
                  Average processing: 4.2 days
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <Users className="w-3 h-3 mr-1" />
                  68% approval rate
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedPage>
  )
}
