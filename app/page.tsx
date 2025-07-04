import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Shield, Gamepad2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-orange-600">United Roleplay</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-orange-600 hover:bg-orange-700">Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-orange-600">United Roleplay</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join our gaming community and connect your Discord account for verification and exclusive access.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/auth/signup">
                <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium bg-orange-600 hover:bg-orange-700">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <MessageSquare className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle>Discord Integration</CardTitle>
                <CardDescription>
                  Link your Discord account for seamless verification and community access.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Gamepad2 className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle>Game Account Linking</CardTitle>
                <CardDescription>
                  Connect your in-game character to your website account for full integration.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle>Secure Verification</CardTitle>
                <CardDescription>Advanced verification system to ensure authentic community members.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Ready to Join?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Create your account now and become part of the United Roleplay community.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button className="bg-orange-600 hover:bg-orange-700 px-8 py-3">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Sign Up with Discord
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline" className="px-8 py-3 bg-transparent">
                  Already have an account?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 United Roleplay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
