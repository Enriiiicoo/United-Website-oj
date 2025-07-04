import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "United - Moroccan MTA Roleplay Server",
  description:
    "Experience the ultimate roleplay adventure in Morocco's most immersive MTA server. Join thousands of players since 2021.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
