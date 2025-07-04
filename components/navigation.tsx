"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Menu } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-black border-b border-gray-800 px-6 py-4 relative z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <span className="text-xl font-bold text-orange-500">UNITED Original</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/rules" className="text-gray-300 hover:text-white transition-colors">
            Rules
          </Link>
          <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">
            Gallery
          </Link>
          <Link href="/vip" className="text-gray-300 hover:text-white transition-colors">
            VIP
          </Link>
          <Link href="/staff" className="text-gray-300 hover:text-white transition-colors">
            Staff
          </Link>
          {session && (
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              📊 Dashboard
            </Link>
          )}
          <Link href="/whitelist" className="text-gray-300 hover:text-white transition-colors">
            Request Whitelist
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback className="bg-orange-600 text-white">
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-white">{session.user?.name}</p>
                    <p className="w-[200px] truncate text-sm text-gray-400">{session.user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <Link href="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem
                  className="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800"
                  onSelect={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/signin">
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-gray-800 py-4">
          <div className="flex flex-col space-y-4 px-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/rules" className="text-gray-300 hover:text-white transition-colors">
              Rules
            </Link>
            <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">
              Gallery
            </Link>
            <Link href="/vip" className="text-gray-300 hover:text-white transition-colors">
              VIP
            </Link>
            <Link href="/staff" className="text-gray-300 hover:text-white transition-colors">
              Staff
            </Link>
            {session && (
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                📊 Dashboard
              </Link>
            )}
            <Link href="/whitelist" className="text-gray-300 hover:text-white transition-colors">
              Request Whitelist
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
