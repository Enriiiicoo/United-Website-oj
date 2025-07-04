import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Car, Home, Trophy, Settings, User, Gamepad2, Crown, Shield } from "lucide-react"
import { getCharacterData } from "@/app/actions/account-linking"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

// Vehicle model names mapping
const vehicleModels: { [key: number]: string } = {
  411: "Infernus",
  522: "NRG-500",
  596: "Police Car (LSPD)",
  560: "Sultan",
  487: "Maverick",
  // Add more vehicle models as needed
}

// Job colors
const jobColors: { [key: string]: string } = {
  Unemployed: "bg-gray-500",
  "Taxi Driver": "bg-yellow-500",
  "Police Officer": "bg-blue-500",
  "Business Owner": "bg-green-500",
  Mechanic: "bg-orange-500",
  Medic: "bg-red-500",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const characterData = await getCharacterData()

  if (!characterData) {
    redirect("/link-account")
  }

  const { account, characters, vehicles, properties } = characterData
  const primaryCharacter = characters[0] // Most recently used character
  const totalMoney = account.money + account.bank_money
  const playtimeHours = Math.floor(account.playtime / 60)
  const playtimeMinutes = account.playtime % 60

  // Get VIP level display
  const getVipLevel = (level: number) => {
    switch (level) {
      case 1:
        return { name: "Bronze", color: "text-amber-600" }
      case 2:
        return { name: "Silver", color: "text-gray-400" }
      case 3:
        return { name: "Gold", color: "text-yellow-400" }
      case 4:
        return { name: "Platinum", color: "text-blue-400" }
      case 5:
        return { name: "Diamond", color: "text-purple-400" }
      default:
        return { name: "None", color: "text-gray-500" }
    }
  }

  const vipInfo = getVipLevel(account.vip_level)

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 hero-pattern">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back, {account.username}!</p>
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
                <AvatarImage src={session.user.image || "/placeholder.svg?height=80&width=80"} alt="Player" />
                <AvatarFallback className="bg-orange-900/50 text-orange-300 text-xl">
                  {account.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">{account.username}</h2>
                  {account.admin_level > 0 && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin {account.admin_level}
                    </Badge>
                  )}
                  {account.vip_level > 0 && (
                    <Badge className={`bg-yellow-500/20 border-yellow-500/30 ${vipInfo.color}`}>
                      <Crown className="w-3 h-3 mr-1" />
                      VIP {vipInfo.name}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-orange-400">Level {account.level}</span>
                  <span className="text-gray-400">•</span>
                  <span className={`px-2 py-1 rounded text-xs text-white ${jobColors[account.job] || "bg-gray-500"}`}>
                    {account.job}
                  </span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-400">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {playtimeHours}h {playtimeMinutes}m played
                  </span>
                  <span className="text-blue-400">
                    Last Login: {account.last_login ? new Date(account.last_login).toLocaleDateString() : "Never"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">${totalMoney.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Worth</div>
                <div className="text-sm text-gray-500 mt-1">
                  Cash: ${account.money.toLocaleString()} | Bank: ${account.bank_money.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Experience</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{account.experience.toLocaleString()}</div>
              <p className="text-xs text-gray-500">Level {account.level}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Characters</CardTitle>
              <User className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{characters.length}</div>
              <p className="text-xs text-gray-500">Active: {primaryCharacter?.name || "None"}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Vehicles</CardTitle>
              <Car className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{vehicles.length}</div>
              <p className="text-xs text-gray-500">Owned vehicles</p>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Properties</CardTitle>
              <Home className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{properties.length}</div>
              <p className="text-xs text-gray-500">Houses & businesses</p>
            </CardContent>
          </Card>
        </div>

        {/* Characters & Assets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Characters */}
          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400">Your Characters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {characters.length > 0 ? (
                characters.map((character: any) => (
                  <div key={character.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{character.name}</div>
                        <div className="text-gray-400 text-sm">
                          ${(character.money + character.bank_money).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      Last used: {new Date(character.last_used).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">
                  <Gamepad2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No characters found. Create one in-game!
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vehicles */}
          <Card className="bg-black/50 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400">Your Vehicles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vehicles.length > 0 ? (
                vehicles.slice(0, 5).map((vehicle: any) => (
                  <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Car className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {vehicleModels[vehicle.model] || `Vehicle ${vehicle.model}`}
                        </div>
                        <div className="text-gray-400 text-sm">
                          Plate: {vehicle.plate} • Owner: {vehicle.owner_name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div
                        className={`${vehicle.health > 800 ? "text-green-400" : vehicle.health > 500 ? "text-yellow-400" : "text-red-400"}`}
                      >
                        {Math.round(vehicle.health / 10)}% HP
                      </div>
                      <div className="text-gray-500">{Math.round(vehicle.fuel)}% Fuel</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-4">
                  <Car className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No vehicles owned yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Properties */}
        {properties.length > 0 && (
          <Card className="bg-black/50 border-orange-500/30 mt-8">
            <CardHeader>
              <CardTitle className="text-orange-400">Your Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map((property: any) => (
                  <div key={property.id} className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="w-4 h-4 text-purple-400" />
                      <span className="text-white font-medium capitalize">{property.type}</span>
                    </div>
                    <div className="text-gray-300 mb-1">{property.name}</div>
                    <div className="text-green-400 text-sm">${property.price.toLocaleString()}</div>
                    <div className="text-gray-500 text-xs">Owner: {property.owner_name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
