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
import { LogOut, User, Menu, X, Sparkles, Crown, Shield, Star, Zap, Users, Calendar, Play } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="relative z-50 backdrop-blur-2xl bg-black/40 border-b border-orange-500/30 px-6 py-4 shadow-2xl shadow-orange-500/10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/50 group-hover:shadow-orange-500/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              UNITED
            </span>
            <span className="text-sm text-orange-400 font-medium">SERVER</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { href: "/", label: "Home", icon: Crown },
            { href: "/rules", label: "Rules", icon: Shield },
            { href: "/gallery", label: "Gallery", icon: Star },
            { href: "/vip", label: "VIP", icon: Zap },
            { href: "/staff", label: "Staff", icon: Users },
            ...(session ? [{ href: "/dashboard", label: "Dashboard", icon: Calendar }] : []),
            { href: "/whitelist", label: "Whitelist", icon: Play },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-gray-300 hover:text-white transition-all duration-300 group px-4 py-2 rounded-lg hover:bg-white/5 backdrop-blur-sm flex items-center gap-2"
            >
              <item.icon className="w-4 h-4" />
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-full group">
                  <Avatar className="h-12 w-12 ring-2 ring-orange-500/50 group-hover:ring-orange-500 transition-all duration-300">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-600 to-red-700 text-white text-lg font-bold">
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 bg-black/90 backdrop-blur-xl border border-orange-500/30 shadow-2xl shadow-orange-500/20"
                align="end"
                forceMount
              >
                <div className="flex items-center justify-start gap-3 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-600 to-red-700 text-white">
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-white">{session.user?.name}</p>
                    <p className="text-sm text-gray-400 truncate max-w-[150px]">{session.user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-orange-500/30" />
                <DropdownMenuItem
                  asChild
                  className="text-gray-300 hover:text-white hover:bg-orange-500/20 transition-all duration-300 cursor-pointer"
                >
                  <Link href="/dashboard" className="flex items-center">
                    <User className="mr-3 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-orange-500/30" />
                <DropdownMenuItem
                  className="cursor-pointer text-gray-300 hover:text-white hover:bg-red-500/20 transition-all duration-300"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-3">
              <Button
                asChild
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/50 hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105 overflow-hidden group"
              >
                <Link href="/auth/signin">
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Sign In
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden text-white hover:bg-orange-500/20 transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-orange-500/30 shadow-2xl shadow-orange-500/20">
          <div className="px-6 py-4 space-y-4">
            {[
              { href: "/", label: "Home", icon: Crown },
              { href: "/rules", label: "Rules", icon: Shield },
              { href: "/gallery", label: "Gallery", icon: Star },
              { href: "/vip", label: "VIP", icon: Zap },
              { href: "/staff", label: "Staff", icon: Users },
              ...(session ? [{ href: "/dashboard", label: "Dashboard", icon: Calendar }] : []),
              { href: "/whitelist", label: "Whitelist", icon: Play },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-lg hover:bg-orange-500/20 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
