import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Crown, Star, Users } from "lucide-react"

const staffMembers = [
  {
    name: "John Smith",
    role: "Server Owner",
    description: "Founder and lead administrator of United Roleplay",
    avatar: "/placeholder-user.jpg",
    badge: "Owner",
    icon: Crown,
    color: "bg-yellow-500",
  },
  {
    name: "Sarah Johnson",
    role: "Head Administrator",
    description: "Oversees all server operations and staff management",
    avatar: "/placeholder-user.jpg",
    badge: "Head Admin",
    icon: Shield,
    color: "bg-red-500",
  },
  {
    name: "Mike Wilson",
    role: "Administrator",
    description: "Handles player reports and maintains server rules",
    avatar: "/placeholder-user.jpg",
    badge: "Admin",
    icon: Shield,
    color: "bg-blue-500",
  },
  {
    name: "Emily Davis",
    role: "Moderator",
    description: "Assists with player support and community events",
    avatar: "/placeholder-user.jpg",
    badge: "Moderator",
    icon: Star,
    color: "bg-green-500",
  },
  {
    name: "Alex Brown",
    role: "Moderator",
    description: "Focuses on new player experience and whitelist applications",
    avatar: "/placeholder-user.jpg",
    badge: "Moderator",
    icon: Star,
    color: "bg-green-500",
  },
  {
    name: "Lisa Garcia",
    role: "Support Staff",
    description: "Provides technical support and Discord management",
    avatar: "/placeholder-user.jpg",
    badge: "Support",
    icon: Users,
    color: "bg-purple-500",
  },
]

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-orange-600">Staff Team</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our dedicated team of administrators and moderators work around the clock to ensure United Roleplay remains
            a fun, fair, and welcoming community for all players.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffMembers.map((member, index) => {
            const IconComponent = member.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-2 -right-2 ${member.color} rounded-full p-2`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {member.badge}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm font-medium text-orange-600 mb-2">{member.role}</p>
                  <CardDescription>{member.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to Join Our Team?</h2>
            <p className="text-lg text-gray-600 mb-6">
              We're always looking for dedicated community members to help moderate and improve our server.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://discord.gg/your-server" target="_blank" rel="noopener noreferrer">
                <Button className="bg-orange-600 hover:bg-orange-700">Apply on Discord</Button>
              </a>
              <a href="/whitelist">
                <Button variant="outline">Learn More About Requirements</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
