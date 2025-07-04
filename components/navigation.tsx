"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Home, Users, ImageIcon, FileText, Shield, LogOut } from "lucide-react"

export function Navigation() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <h1 className="text-xl font-bold text-orange-600">United Roleplay</h1>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/staff">
                <Button variant="ghost" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Staff
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="ghost" size="sm">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Gallery
                </Button>
              </Link>
              <Link href="/whitelist">
                <Button variant="ghost" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Whitelist
                </Button>
              </Link>
              {session && (
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Welcome, {session.user?.name}</span>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-orange-600 hover:bg-orange-700" size="sm">
                    Join Now
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
