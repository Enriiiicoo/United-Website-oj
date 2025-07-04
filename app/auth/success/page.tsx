"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function SuccessPage() {
  const { data: session } = useSession()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = "/dashboard"
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const goToDashboard = () => {
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">Account Created Successfully!</CardTitle>
          <CardDescription>
            Welcome to United Roleplay! Your account has been created and linked with your Discord and game account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          {session?.user && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Discord:</strong> {session.user.discordUsername || session.user.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {session.user.email}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Redirecting to dashboard in <strong>{countdown}</strong> seconds...
            </p>

            <Button onClick={goToDashboard} className="w-full bg-orange-600 hover:bg-orange-700">
              <ArrowRight className="w-4 h-4 mr-2" />
              Go to Dashboard Now
            </Button>
          </div>

          <div className="text-xs text-gray-500">
            <p>Your account is now fully verified and ready to use!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
