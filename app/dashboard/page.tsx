import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, DollarSign, Car, Home, Trophy, Settings } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 hero-pattern">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back, Player!</p>
          </div>
          <Button
            variant="outline"
            className="border-orange-500/30 text-orange-400 hover:bg-orange-900/20 bg-transparent"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        {/* Player Info Card */}
        <Card className="bg-black/50 border-orange-500/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 border-2 border-orange-500/30">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Player" />
                <AvatarFallback className="bg-orange-900/50 text-orange-300 text-xl">PL</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">PlayerName</h2>
                <p className="text-gray-400 mb-2">Level 45 • VIP Gold Member</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-400">Online: 156h 23m</span>
                  <span className="text-blue-400">Last Login: Today</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">$125,450</div>
                <div className="text-sm text-gray-400">Bank Balance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Play Time</CardTitle>
              <Clock className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">156h 23m</div>
              <p className="text-xs text-gray-500">+12h from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Money Earned</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$45,230</div>
              <p className="text-xs text-gray-500">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Vehicles Owned</CardTitle>
              <Car className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8</div>
              <p className="text-xs text-gray-500">2 new this week</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Properties</CardTitle>
              <Home className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3</div>
              <p className="text-xs text-gray-500">Houses & businesses</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Completed job: Taxi Driver</span>
                <span className="text-gray-500 ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Purchased vehicle: Sultan</span>
                <span className="text-gray-500 ml-auto">1d ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Level up to 45</span>
                <span className="text-gray-500 ml-auto">3d ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Joined faction: LSPD</span>
                <span className="text-gray-500 ml-auto">1w ago</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <div>
                  <div className="text-white font-medium">First Million</div>
                  <div className="text-gray-400 text-sm">Earned your first $1,000,000</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-silver" />
                <div>
                  <div className="text-white font-medium">Speed Demon</div>
                  <div className="text-gray-400 text-sm">Won 10 street races</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-amber-600" />
                <div>
                  <div className="text-white font-medium">Property Mogul</div>
                  <div className="text-gray-400 text-sm">Own 3 properties</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
