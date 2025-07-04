"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Clock,
  FileText,
  Users,
  Shield,
  MessageSquare,
  AlertCircle,
  User,
  Calendar,
  Award,
} from "lucide-react"

const applicationSteps = [
  {
    step: 1,
    title: "Discord Registration",
    description: "Join our Discord server and verify your account",
    icon: MessageSquare,
    status: "completed",
    completedAt: "2024-01-15",
  },
  {
    step: 2,
    title: "Rules Acknowledgment",
    description: "Read and acknowledge our server rules and guidelines",
    icon: FileText,
    status: "completed",
    completedAt: "2024-01-15",
  },
  {
    step: 3,
    title: "Application Submission",
    description: "Submit your detailed whitelist application",
    icon: Shield,
    status: "current",
    completedAt: null,
  },
  {
    step: 4,
    title: "Staff Review",
    description: "Our team reviews your application and background",
    icon: Users,
    status: "pending",
    completedAt: null,
  },
  {
    step: 5,
    title: "Interview",
    description: "Voice interview with our staff team",
    icon: User,
    status: "pending",
    completedAt: null,
  },
]

const requirements = [
  { text: "Must be 16+ years old", met: true, required: true },
  { text: "Working microphone required", met: true, required: true },
  { text: "Fluent English speaker", met: true, required: true },
  { text: "Clean record on other RP servers", met: true, required: true },
  { text: "Active Discord account", met: true, required: true },
  { text: "Completed character backstory", met: false, required: true },
  { text: "Previous RP experience", met: false, required: false },
]

const applicationStats = [
  {
    title: "Your Application Status",
    value: "In Progress",
    description: "Step 3 of 5",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Processing Time",
    value: "3-5 Days",
    description: "Average review time",
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Success Rate",
    value: "68%",
    description: "Monthly approval rate",
    icon: Award,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
]

export default function WhitelistPage() {
  const completedSteps = applicationSteps.filter((step) => step.status === "completed").length
  const progressPercentage = (completedSteps / applicationSteps.length) * 100

  return (
    <DashboardLayout title="Whitelist Application">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Whitelist Application</h1>
          <p className="text-gray-600 mt-2">Complete your application to join our exclusive roleplay community.</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {applicationStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`${stat.bgColor} rounded-lg p-3 mr-4`}>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm font-medium text-gray-900">{stat.title}</p>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Application Progress */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Application Progress</CardTitle>
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                {completedSteps} of {applicationSteps.length} completed
              </Badge>
            </div>
            <div className="space-y-2">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-gray-600">{Math.round(progressPercentage)}% Complete</p>
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
                        border: "border-green-200",
                      }
                    case "current":
                      return {
                        iconBg: "bg-orange-100",
                        iconColor: "text-orange-600",
                        border: "border-orange-200",
                      }
                    default:
                      return {
                        iconBg: "bg-gray-100",
                        iconColor: "text-gray-400",
                        border: "border-gray-200",
                      }
                  }
                }

                const styles = getStatusStyles(step.status)

                return (
                  <div key={step.step} className={`border rounded-lg p-4 ${styles.border}`}>
                    <div className="flex items-start space-x-4">
                      <div className={`${styles.iconBg} rounded-full p-2`}>
                        <IconComponent className={`h-5 w-5 ${styles.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">
                            Step {step.step}: {step.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {step.status === "completed" && (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-xs text-gray-500">{step.completedAt}</span>
                              </>
                            )}
                            {step.status === "current" && <Clock className="h-4 w-4 text-orange-600" />}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                        {step.status === "current" && (
                          <div className="mt-3">
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              Continue Application
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-orange-600" />
              Requirements Checklist
            </CardTitle>
            <CardDescription>Make sure you meet all requirements before submitting your application.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {requirement.met ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                    )}
                    <div>
                      <span className={`text-sm font-medium ${requirement.met ? "text-gray-700" : "text-orange-700"}`}>
                        {requirement.text}
                      </span>
                      {requirement.required && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={requirement.met ? "default" : "secondary"}
                    className={requirement.met ? "bg-green-100 text-green-800" : ""}
                  >
                    {requirement.met ? "Met" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardHeader>
            <CardTitle className="text-center">Ready to Continue?</CardTitle>
            <CardDescription className="text-center">
              Complete your whitelist application to join our community.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg">
                <MessageSquare className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Discord Application</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Complete your application through our Discord server for the fastest processing.
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700 w-full">Continue on Discord</Button>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <FileText className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Web Application</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Prefer to complete your application here? Use our web form instead.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Web Application Form
                </Button>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              <p>Need help? Contact our support team on Discord or email support@united-rp.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
