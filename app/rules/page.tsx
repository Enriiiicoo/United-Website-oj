"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Users, MessageSquare, Car, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"

const ruleCategories = [
  {
    id: "general",
    title: "General Rules",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    rules: [
      {
        id: "1.1",
        title: "Respect All Players",
        description: "Treat all community members with respect. No harassment, discrimination, or toxic behavior.",
        severity: "high",
      },
      {
        id: "1.2",
        title: "No Cheating or Exploiting",
        description: "Use of cheats, hacks, or exploiting game bugs is strictly prohibited.",
        severity: "high",
      },
      {
        id: "1.3",
        title: "English Only in Public",
        description: "English must be used in all public channels and in-game areas.",
        severity: "medium",
      },
      {
        id: "1.4",
        title: "No Advertising",
        description: "Advertising other servers, Discord servers, or external services is not allowed.",
        severity: "medium",
      },
    ],
  },
  {
    id: "roleplay",
    title: "Roleplay Rules",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
    rules: [
      {
        id: "2.1",
        title: "Stay in Character",
        description: "Maintain your character at all times. No breaking character or OOC in IC situations.",
        severity: "high",
      },
      {
        id: "2.2",
        title: "Realistic Roleplay",
        description: "Keep your roleplay realistic. No superpowers, unrealistic scenarios, or fail RP.",
        severity: "high",
      },
      {
        id: "2.3",
        title: "Value Your Life",
        description: "Your character values their life. No unrealistic risks or 'YOLO' mentality.",
        severity: "medium",
      },
      {
        id: "2.4",
        title: "No Metagaming",
        description: "Don't use information your character wouldn't know in-game.",
        severity: "high",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication Rules",
    icon: MessageSquare,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    rules: [
      {
        id: "3.1",
        title: "No Spam or Flooding",
        description: "Don't spam messages in chat or voice channels.",
        severity: "low",
      },
      {
        id: "3.2",
        title: "Appropriate Content Only",
        description: "No NSFW, illegal, or inappropriate content in any form.",
        severity: "high",
      },
      {
        id: "3.3",
        title: "Voice Chat Etiquette",
        description: "Use push-to-talk, avoid background noise, and be respectful.",
        severity: "low",
      },
    ],
  },
  {
    id: "vehicles",
    title: "Vehicle & Traffic Rules",
    icon: Car,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    rules: [
      {
        id: "4.1",
        title: "Realistic Driving",
        description: "Drive realistically. Follow traffic laws and don't drive recklessly without RP reason.",
        severity: "medium",
      },
      {
        id: "4.2",
        title: "No VDM (Vehicle Death Match)",
        description: "Don't use vehicles as weapons to kill or injure other players.",
        severity: "high",
      },
      {
        id: "4.3",
        title: "Emergency Vehicle Priority",
        description: "Give way to emergency vehicles with sirens and lights active.",
        severity: "low",
      },
    ],
  },
]

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case "high":
      return <Badge className="bg-red-100 text-red-800">High Priority</Badge>
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>
    case "low":
      return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>
    default:
      return <Badge variant="outline">Standard</Badge>
  }
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "high":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "medium":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case "low":
      return <Info className="h-4 w-4 text-blue-500" />
    default:
      return <CheckCircle className="h-4 w-4 text-gray-500" />
  }
}

export default function RulesPage() {
  return (
    <DashboardLayout title="Server Rules">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Server Rules</h1>
          <p className="text-gray-600 mt-2">
            Please read and follow all server rules to ensure a positive experience for everyone.
          </p>
        </div>

        {/* Important Notice */}
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Important:</strong> Ignorance of the rules is not an excuse. All players are expected to read and
            follow these rules at all times. Violations may result in warnings, kicks, or permanent bans.
          </AlertDescription>
        </Alert>

        {/* Rules Categories */}
        <div className="space-y-8">
          {ruleCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className={`${category.bgColor} rounded-lg p-2 mr-3`}>
                      <IconComponent className={`h-6 w-6 ${category.color}`} />
                    </div>
                    {category.title}
                  </CardTitle>
                  <CardDescription>{category.rules.length} rules in this category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.rules.map((rule) => (
                      <div key={rule.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getSeverityIcon(rule.severity)}
                            <h4 className="font-semibold text-gray-900">
                              {rule.id} - {rule.title}
                            </h4>
                          </div>
                          {getSeverityBadge(rule.severity)}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{rule.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Punishment Guidelines */}
        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Punishment Guidelines
            </CardTitle>
            <CardDescription className="text-red-700">Understanding our enforcement system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <div className="flex items-center mb-2">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">First Offense</h4>
                </div>
                <p className="text-sm text-gray-600">Verbal warning or written warning depending on severity</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">Repeat Offense</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Temporary ban (1-7 days) or permanent ban for serious violations
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="flex items-center mb-2">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">Serious Violations</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Immediate permanent ban for cheating, harassment, or illegal content
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help or Have Questions?</CardTitle>
            <CardDescription>Our staff team is here to help clarify any rules or answer questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Discord Support</h4>
                <p className="text-sm text-gray-600">
                  Open a ticket in our Discord server for rule clarifications or appeals.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Users className="h-6 w-6 text-green-600 mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Staff Team</h4>
                <p className="text-sm text-gray-600">
                  Contact any online staff member for immediate assistance or questions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
