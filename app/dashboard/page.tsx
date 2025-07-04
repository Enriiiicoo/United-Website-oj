"use client"

import { useSession } from "next-auth/react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MessageSquare, Calendar, Trophy, Clock, Shield, Activity, Bell } from "lucide-react"

const quickStats = [
  {
    title: "Online Players",
    value: "127",
    change: "+12",
    changeType: "increase",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Your Playtime",
    value: "45.2h",
    change: "+2.3h",
    changeType: "increase",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Server Events",
    value: "3",
    change: "This week",
    changeType: "neutral",
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Your Rank",
    value: "#247",
    change: "+15",
    changeType: "increase",
    icon: Trophy,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "login",
    message: "You logged into the server",
    timestamp: "2 hours ago",
    icon: Activity,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "event",
    message: "Participated in Car Meet event",
    timestamp: "1 day ago",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "achievement",
    message: "Earned 'First Steps' achievement",
    timestamp: "2 days ago",
    icon: Trophy,
    color: "text-orange-600",
  },
  {
    id: 4,
    type: "message",
    message: "Received message from staff",
    timestamp: "3 days ago",
    icon: MessageSquare,
    color: "text-purple-600",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Weekly Car Meet",
    description: "Show off your rides at Del Perro Pier",
    date: "Today, 8:00 PM",
    participants: 23,
    maxParticipants: 50,
  },
  {
    id: 2,
    title: "Police Training Session",
    description: "Training for LSPD members",
    date: "Tomorrow, 7:00 PM",
    participants: 12,
    maxParticipants: 20,
  },
  {
    id: 3,
    title: "Community Race Event",
    description: "Street racing tournament with prizes",
    date: "Saturday, 9:00 PM",
    participants: 45,
    maxParticipants: 64,
  },
]

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {session?.user?.name?.split(" ")[0] || "Player"}!
            </h1>
            <p className="text-gray-600 mt-1">Here's what's happening in United Roleplay today.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
              <AvatarFallback className="bg-orange-600 text-white">
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p
                        className={`text-xs ${
                          stat.changeType === "increase"
                            ? "text-green-600"
                            : stat.changeType === "decrease"
                              ? "text-red-600"
                              : "text-gray-500"
                        }`}
                      >
                        {stat.change}
                      </p>
                    </div>
                    <div className={`${stat.bgColor} rounded-lg p-3`}>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest actions and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-white rounded-full p-2">
                        <IconComponent className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Don't miss these community events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {event.participants}/{event.maxParticipants}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{event.date}</p>
                      <Button size="sm" variant="outline">
                        Join Event
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-600" />
              Account Status
            </CardTitle>
            <CardDescription>Your account information and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Whitelisted</h4>
                <p className="text-sm text-gray-600">Active member since joining</p>
                <Badge className="bg-green-100 text-green-800 mt-2">Verified</Badge>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Community Standing</h4>
                <p className="text-sm text-gray-600">Good standing with no warnings</p>
                <Badge className="bg-blue-100 text-blue-800 mt-2">Clean Record</Badge>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Achievements</h4>
                <p className="text-sm text-gray-600">3 achievements unlocked</p>
                <Badge className="bg-orange-100 text-orange-800 mt-2">Active Player</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
