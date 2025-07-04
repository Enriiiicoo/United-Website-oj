"use client"

import { Navigation } from "@/components/navigation"
import { ProtectedPage } from "@/components/protected-page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Shield, Crown, Star, Users, MessageSquare } from "lucide-react"

const staffMembers = [
  {
    name: "John Smith",
    role: "Server Owner",
    description: "Founder and lead administrator of United Roleplay. Oversees all server operations and development.",
    avatar: "/placeholder-user.jpg",
    badge: "Owner",
    icon: Crown,
    badgeColor: "bg-yellow-500 text-white",
    discordId: "Owner#0001",
  },
  {
    name: "Sarah Johnson",
    role: "Head Administrator",
    description:
      "Manages staff team and handles high-level administrative decisions. Point of contact for serious issues.",
    avatar: "/placeholder-user.jpg",
    badge: "Head Admin",
    icon: Shield,
    badgeColor: "bg-red-500 text-white",
    discordId: "HeadAdmin#0002",
  },
  {
    name: "Mike Wilson",
    role: "Administrator",
    description: "Handles player reports, enforces server rules, and assists with community management.",
    avatar: "/placeholder-user.jpg",
    badge: "Admin",
    icon: Shield,
    badgeColor: "bg-blue-500 text-white",
    discordId: "Admin#0003",
  },
  {
    name: "Emily Davis",
    role: "Moderator",
    description: "Assists with player support, moderates chat, and helps organize community events.",
    avatar: "/placeholder-user.jpg",
    badge: "Moderator",
    icon: Star,
    badgeColor: "bg-green-500 text-white",
    discordId: "Mod#0004",
  },
  {
    name: "Alex Brown",
    role: "Moderator",
    description: "Specializes in new player experience and whitelist application reviews.",
    avatar: "/placeholder-user.jpg",
    badge: "Moderator",
    icon: Star,
    badgeColor: "bg-green-500 text-white",
    discordId: "Mod#0005",
  },
  {
    name: "Lisa Garcia",
    role: "Support Staff",
    description: "Provides technical support, manages Discord server, and assists with player inquiries.",
    avatar: "/placeholder-user.jpg",
    badge: "Support",
    icon: Users,
    badgeColor: "bg-purple-500 text-white",
    discordId: "Support#0006",
  },
]

export default function StaffPage() {
  return (
    <ProtectedPage title="Staff Page">
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Meet Our <span className="text-orange-600">Staff Team</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Our dedicated team works around the clock to ensure United Roleplay remains a fun, fair, and welcoming
                  community for all players.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {staffMembers.map((member, index) => {
              const IconComponent = member.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="text-lg">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-2 -right-2 ${member.badgeColor} rounded-full p-2`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-gray-900">{member.name}</CardTitle>
                    <Badge className={member.badgeColor}>{member.badge}</Badge>
                  </CardHeader>
                  <CardContent className="text-center space-y-3">
                    <p className="text-sm font-medium text-orange-600">{member.role}</p>
                    <CardDescription className="text-sm leading-relaxed">{member.description}</CardDescription>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {member.discordId}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Join Team Section */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">Want to Join Our Team?</CardTitle>
              <CardDescription className="text-lg">
                We're always looking for dedicated community members to help moderate and improve our server.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Requirements</h4>
                  <ul className="text-orange-700 space-y-1">
                    <li>• Active community member</li>
                    <li>• 18+ years old</li>
                    <li>• Good standing record</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Responsibilities</h4>
                  <ul className="text-orange-700 space-y-1">
                    <li>• Help new players</li>
                    <li>• Enforce server rules</li>
                    <li>• Moderate chat/voice</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Benefits</h4>
                  <ul className="text-orange-700 space-y-1">
                    <li>• Staff permissions</li>
                    <li>• Exclusive channels</li>
                    <li>• Community recognition</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-orange-600 hover:bg-orange-700">Apply on Discord</Button>
                <Button variant="outline">View Requirements</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedPage>
  )
}
