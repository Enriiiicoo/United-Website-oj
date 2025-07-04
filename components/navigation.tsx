"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Crown, Shield, Users, ImageIcon, FileText, Settings, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/", icon: Crown },
  { name: "Verify", href: "/verify", icon: Shield },
  { name: "Rules", href: "/rules", icon: FileText },
  { name: "Gallery", href: "/gallery", icon: ImageIcon },
  { name: "Staff", href: "/staff", icon: Users },
  { name: "VIP", href: "/vip", icon: UserCheck },
  { name: "Whitelist", href: "/whitelist", icon: Settings },
  { name: "Dashboard", href: "/dashboard", icon: Settings },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-orange-500/20 shadow-2xl" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Crown className="h-8 w-8 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">UNITED</span>
              <span className="text-sm text-orange-400 block leading-none">SERVER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-orange-600/20 to-orange-400/20 text-orange-300 border border-orange-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                      isActive ? "text-orange-400" : "",
                    )}
                  />
                  <span>{item.name}</span>

                  {/* Glow effect for active item */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-orange-400/10 rounded-xl blur-sm" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 backdrop-blur-xl border-l border-orange-500/20">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                          isActive
                            ? "bg-gradient-to-r from-orange-600/20 to-orange-400/20 text-orange-300 border border-orange-500/30"
                            : "text-gray-300 hover:text-white hover:bg-white/5",
                        )}
                      >
                        <Icon className={cn("h-5 w-5", isActive ? "text-orange-400" : "")} />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Gradient line at bottom */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
    </nav>
  )
}
