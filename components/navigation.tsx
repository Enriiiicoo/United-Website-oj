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
import { Home, Users, ImageIcon, FileText, LogOut, User } from "lucide-react"

export function Navigation() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold text-orange-600">
            United RP
          </Link>

          {session && (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <Link href="/staff" className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                <Users className="w-4 h-4 mr-2" />
                Staff
              </Link>
              <Link href="/gallery" className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                <ImageIcon className="w-4 h-4 mr-2" />
                Gallery
              </Link>
              <Link
                href="/whitelist"
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Whitelist
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onSelect={() => signOut({ callbackUrl: "/" })}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/signin">
              <Button className="bg-orange-600 hover:bg-orange-700">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
