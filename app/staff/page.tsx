import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown, Shield, Star, Users } from "lucide-react"

export default function StaffPage() {
  const staffMembers = [
    {
      name: "Ahmed Hassan",
      role: "Server Owner",
      avatar: "/placeholder.svg?height=100&width=100",
      icon: Crown,
      color: "text-yellow-400",
      description: "Founder and owner of RED Original. Managing the server since 2021.",
    },
    {
      name: "Youssef Alami",
      role: "Head Administrator",
      avatar: "/placeholder.svg?height=100&width=100",
      icon: Shield,
      color: "text-red-400",
      description: "Experienced administrator handling major server decisions and policies.",
    },
    {
      name: "Fatima Benali",
      role: "Community Manager",
      avatar: "/placeholder.svg?height=100&width=100",
      icon: Users,
      color: "text-blue-400",
      description: "Managing community events and player relations.",
    },
    {
      name: "Omar Tazi",
      role: "Senior Moderator",
      avatar: "/placeholder.svg?height=100&width=100",
      icon: Star,
      color: "text-green-400",
      description: "Maintaining order and helping players with their concerns.",
    },
    {
      name: "Laila Mansouri",
      role: "Developer",
      avatar: "/placeholder.svg?height=100&width=100",
      icon: Shield,
      color: "text-purple-400",
      description: "Working on server scripts and new features development.",
    },
    {
      name: "Karim Ziani",
      role: "Moderator",
      avatar: "/placeholder.svg?height=100&width=100",
      icon: Star,
      color: "text-green-400",
      description: "Ensuring fair play and assisting players daily.",
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 hero-pattern">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">
            <span className="text-orange-500">Our</span> <span className="text-white">Staff</span>
          </h1>
          <p className="text-lg text-gray-400">Meet the dedicated team behind RED Original</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staffMembers.map((member, index) => {
            const IconComponent = member.icon
            return (
              <Card
                key={index}
                className="bg-black/50 border-orange-500/30 hover:border-orange-500/50 transition-colors"
              >
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="h-24 w-24 border-2 border-orange-500/30">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="bg-orange-900/50 text-orange-300">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-black rounded-full p-2 border border-orange-500/30">
                      <IconComponent className={`h-4 w-4 ${member.color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-white">{member.name}</CardTitle>
                  <p className={`font-semibold ${member.color}`}>{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm text-center">{member.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-orange-900/20 border-orange-500/50 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Want to Join Our Team?</h3>
              <p className="text-gray-300 mb-6">
                We're always looking for dedicated players to help us maintain and improve the server experience. If
                you're interested in becoming a staff member, contact us on Discord.
              </p>
              <div className="text-sm text-gray-400">
                Requirements: Active player, good reputation, helpful attitude
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
