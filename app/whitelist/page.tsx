import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, FileText, Users, Shield } from "lucide-react"

const whitelistSteps = [
  {
    step: 1,
    title: "Join Our Discord",
    description: "Connect with our community and access the whitelist application",
    icon: Users,
    status: "required",
  },
  {
    step: 2,
    title: "Read the Rules",
    description: "Familiarize yourself with our server rules and roleplay guidelines",
    icon: FileText,
    status: "required",
  },
  {
    step: 3,
    title: "Submit Application",
    description: "Fill out the detailed whitelist application form",
    icon: Shield,
    status: "required",
  },
  {
    step: 4,
    title: "Interview Process",
    description: "Participate in a voice interview with our staff team",
    icon: CheckCircle,
    status: "final",
  },
]

const requirements = [
  "Must be 16+ years old",
  "Have a working microphone",
  "Speak fluent English",
  "No recent bans from other RP servers",
  "Willing to follow all server rules",
  "Commit to quality roleplay",
]

const applicationStatus = [
  {
    status: "Pending Review",
    description: "Your application is being reviewed by our staff team",
    icon: Clock,
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    status: "Interview Scheduled",
    description: "You've been selected for an interview",
    icon: CheckCircle,
    color: "text-blue-600 bg-blue-100",
  },
  {
    status: "Approved",
    description: "Congratulations! You've been whitelisted",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
  {
    status: "Denied",
    description: "Application was not successful. You may reapply in 30 days",
    icon: XCircle,
    color: "text-red-600 bg-red-100",
  },
]

export default function WhitelistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Whitelist <span className="text-orange-600">Application</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our exclusive roleplay community! Our whitelist process ensures we maintain a high-quality roleplay
            environment for all players.
          </p>
        </div>

        {/* Application Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whitelistSteps.map((step) => {
              const IconComponent = step.icon
              return (
                <Card key={step.step} className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="bg-orange-100 rounded-full p-4">
                        <IconComponent className="w-8 h-8 text-orange-600" />
                      </div>
                    </div>
                    <div className="text-sm font-medium text-orange-600 mb-2">Step {step.step}</div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-orange-600" />
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-600" />
                Application Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applicationStatus.map((status, index) => {
                  const IconComponent = status.icon
                  return (
                    <div key={index} className="flex items-start">
                      <div className={`rounded-full p-2 mr-3 ${status.color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{status.status}</p>
                        <p className="text-xs text-gray-600">{status.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application CTA */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Apply?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Start your journey with United Roleplay today. Our community is waiting for you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://discord.gg/your-server" target="_blank" rel="noopener noreferrer">
                <Button className="bg-orange-600 hover:bg-orange-700" size="lg">
                  Apply Now on Discord
                </Button>
              </a>
              <Button variant="outline" size="lg">
                View Application Form
              </Button>
            </div>
            <div className="mt-6">
              <Badge variant="outline" className="text-sm">
                Average processing time: 3-5 business days
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
