"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An error occurred during authentication.",
  OAuthSignin: "Error in constructing an authorization URL.",
  OAuthCallback: "Error in handling the response from an OAuth provider.",
  OAuthCreateAccount: "Could not create OAuth account in the database.",
  EmailCreateAccount: "Could not create email account in the database.",
  Callback: "Error in the OAuth callback handler route.",
  OAuthAccountNotLinked: "The account is not linked. Try signing in with a different account.",
  EmailSignin: "Sending the e-mail with the verification token failed.",
  CredentialsSignin: "The authorize callback returned null in the Credentials provider.",
  SessionRequired: "The content of this page requires you to be signed in at all times.",
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default

  const handleRetry = () => {
    window.location.href = "/auth/signup"
  }

  const handleHome = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      {/* Navigation */}
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="outline" className="bg-white">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">Authentication Error</CardTitle>
          <CardDescription>Something went wrong during the sign-in process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Error:</strong> {errorMessage}
              {error && (
                <div className="mt-2 text-sm text-red-600">
                  <strong>Error Code:</strong> {error}
                </div>
              )}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Button onClick={handleRetry} className="w-full bg-orange-600 hover:bg-orange-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button onClick={handleHome} variant="outline" className="w-full bg-transparent">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>If this problem persists, please contact support.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
