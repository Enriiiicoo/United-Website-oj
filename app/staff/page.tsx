"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Shield, Crown, Star, Users, MessageSquare, Mail } from "lucide-react"

const staffMembers = [
  {
    id: 1,
    name: "John Smith",
    role: "Server Owner",
    rank: "Owner",
    description: "Founder and lead administrator of United Roleplay. Oversees all server operations and development.",
    avatar: "/placeholder-user.jpg",
    discordTag: "Owner#0001",
    email: "owner@united-rp.com",
    joinDate: "January 2023",
    icon: Crown,
    badgeColor: "bg-yellow-500",
    textColor: "text-yellow-600",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Head Administrator",
    rank: "Head Admin",
    description:
      "Manages staff team and handles high-level administrative decisions. Point of contact for serious issues.",
    avatar: "/placeholder-user.jpg",
    discordTag: "HeadAdmin#0002",
    email: "headadmin@united-rp.com",
    joinDate: "February 2023",
    icon: Shield,
    badgeColor: "bg-red-500",
    textColor: "text-red-600",
  },
  {
    id: 3,
    name: "Mike Wilson",
    role: "Administrator",
    rank: "Admin",
    description: "Handles player reports, enforces server rules, and assists with community management.",
    avatar: "/placeholder-user.jpg",
    discordTag: "Admin#0003",
    email: "admin@united-rp.com",
    joinDate: "March 2023",
    icon: Shield,
    badgeColor: "bg-blue-500",
    textColor: "text-blue-600",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Moderator",
    rank: "Moderator",
    description: "Assists with player support, moderates chat, and helps organize community events.",
    avatar: "/placeholder-user.jpg",
    discordTag: "Mod#0004",
    email: "mod1@united-rp.com",
    joinDate: "April 2023",
    icon: Star,
    badgeColor: "bg-green-500",
    textColor: "text-green-600",
  },
  {
    id: 5,
    name: "Alex Brown",
    role: "Moderator",
    rank: "Moderator",
    description: "Specializes in new player experience and whitelist application reviews.",
    avatar: "/placeholder-user.jpg",
    discordTag: "Mod#0005",
    email: "mod2@united-rp.com",
    joinDate: "May 2023",
    icon: Star,
    badgeColor: "bg-green-500",
    textColor: "text-green-600",
  },
  {
    id: 6,
    name: "Lisa Garcia",
    role: "Support Staff",
    rank: "Support",
    description: "Provides technical support, manages Discord server, and assists with player inquiries.",
    avatar: "/placeholder-user.jpg",
    discordTag: "Support#0006",
    email: "support@united-rp.com",
    joinDate: "June 2023",
    icon: Users,
    badgeColor: "bg-purple-500",
    textColor: "text-purple-600",
  },
]

export default function StaffPage() {
  return (
    <DashboardLayout title="Staff Team">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Team</h1>
          <p className="text-gray-600 mt-2">
            Meet our dedicated team of administrators and moderators who keep United Roleplay running smoothly.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {staffMembers.map((member) => {
            const IconComponent = member.icon
            return (
              <Card key={member.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="text-lg bg-gray-200">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 ${member.badgeColor} rounded-full p-1.5`}>
                        <IconComponent className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <Badge className={`${member.badgeColor} text-white mt-1`}>{member.rank}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className={`text-sm font-medium ${member.textColor}`}>{member.role}</p>
                    <CardDescription className="text-sm mt-1 leading-relaxed">{member.description}</CardDescription>
                  </div>

                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <MessageSquare className="h-3 w-3 mr-2" />
                      <span>{member.discordTag}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-2" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-2" />
                      <span>Joined {member.joinDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Application Section */}
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Join Our Staff Team</CardTitle>
            <CardDescription className="text-center text-lg">
              Interested in helping our community grow? We're always looking for dedicated members.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 18+ years old</li>
                  <li>• Active community member</li>
                  <li>• Clean record</li>
                  <li>• Available 15+ hours/week</li>
                </ul>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-2">Responsibilities</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Help new players</li>
                  <li>• Enforce server rules</li>
                  <li>• Handle reports</li>
                  <li>• Moderate chat/voice</li>
                </ul>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Staff permissions</li>
                  <li>• Exclusive channels</li>
                  <li>• Recognition</li>
                  <li>• Team events</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2">Apply on Discord</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
