"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { Users, UserCheck, UserX, Clock, Wifi, Plus, Search, Copy, Trash2, Eye, Shield, Loader2 } from "lucide-react"

interface WhitelistEntry {
  mta_serial: string
  discord_id: string
  discord_username?: string
  added_by: string
  added_at: string
  verification_status: "verified" | "expired" | "pending"
  is_online: boolean
}

interface WhitelistApplication {
  id: number
  character_name: string
  character_age: number
  character_backstory: string
  why_join: string
  discord_id: string
  discord_username: string
  status: "pending" | "approved" | "rejected"
  submitted_at: string
}

interface Stats {
  total: number
  verified: number
  expired: number
  pending: number
  online: number
  applications: number
}

export default function AdminWhitelistPage() {
  const { data: session } = useSession()
  const [whitelistEntries, setWhitelistEntries] = useState<WhitelistEntry[]>([])
  const [applications, setApplications] = useState<WhitelistApplication[]>([])
  const [stats, setStats] = useState<Stats>({
    total: 0,
    verified: 0,
    expired: 0,
    pending: 0,
    online: 0,
    applications: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newEntry, setNewEntry] = useState({
    mta_serial: "",
    discord_id: "",
    discord_username: "",
  })

  // Animated particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
  }))

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/whitelist-manager")
      if (response.ok) {
        const data = await response.json()
        setWhitelistEntries(data.whitelist || [])
        setApplications(data.applications || [])
        setStats(data.stats || stats)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  const addToWhitelist = async () => {
    if (!newEntry.mta_serial || !newEntry.discord_id) {
      toast.error("MTA Serial and Discord ID are required")
      return
    }

    // Validate MTA serial (32 hex characters)
    if (!/^[a-fA-F0-9]{32}$/.test(newEntry.mta_serial)) {
      toast.error("MTA Serial must be 32 hexadecimal characters")
      return
    }

    // Validate Discord ID (17-20 digits)
    if (!/^\d{17,20}$/.test(newEntry.discord_id)) {
      toast.error("Discord ID must be 17-20 digits")
      return
    }

    try {
      const response = await fetch("/api/admin/whitelist-manager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      })

      if (response.ok) {
        toast.success("Player added to whitelist")
        setIsAddDialogOpen(false)
        setNewEntry({ mta_serial: "", discord_id: "", discord_username: "" })
        fetchData()
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to add player")
      }
    } catch (error) {
      toast.error("Failed to add player")
    }
  }

  const removeFromWhitelist = async (mtaSerial: string) => {
    try {
      const response = await fetch("/api/admin/whitelist-manager", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mta_serial: mtaSerial }),
      })

      if (response.ok) {
        toast.success("Player removed from whitelist")
        fetchData()
      } else {
        toast.error("Failed to remove player")
      }
    } catch (error) {
      toast.error("Failed to remove player")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const filteredEntries = whitelistEntries.filter(
    (entry) =>
      entry.mta_serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.discord_id.includes(searchTerm) ||
      entry.discord_username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.added_by.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredApplications = applications.filter(
    (app) =>
      app.character_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.discord_username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.discord_id.includes(searchTerm),
  )

  if (!session?.user?.discordId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-orange-900">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-4">Please sign in to access the admin panel</p>
            <Button onClick={() => (window.location.href = "/auth/signin")}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255, 165, 0, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.id * 0.1}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            🔥 Whitelist Management System
          </h1>
          <p className="text-gray-300">Manage MTA whitelist entries and character applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-sm text-blue-200">Total Whitelisted</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
            <CardContent className="p-4 text-center">
              <UserCheck className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">{stats.verified}</div>
              <div className="text-sm text-green-200">Verified</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
            <CardContent className="p-4 text-center">
              <UserX className="w-8 h-8 mx-auto mb-2 text-red-400" />
              <div className="text-2xl font-bold text-white">{stats.expired}</div>
              <div className="text-sm text-red-200">Expired</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold text-white">{stats.pending}</div>
              <div className="text-sm text-yellow-200">Pending</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform">
            <CardContent className="p-4 text-center">
              <Wifi className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{stats.online}</div>
              <div className="text-sm text-purple-200">Online Now</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="whitelist" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-black/20 backdrop-blur-sm">
            <TabsTrigger
              value="whitelist"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500"
            >
              MTA Whitelist ({stats.total})
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500"
            >
              Applications ({stats.applications})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whitelist" className="space-y-4">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by serial, Discord ID, username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/20 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Player
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Add Player to Whitelist</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="mta_serial" className="text-white">
                        MTA Serial (32 hex characters)
                      </Label>
                      <Input
                        id="mta_serial"
                        placeholder="e.g., 1A2B3C4D5E6F7890ABCDEF1234567890"
                        value={newEntry.mta_serial}
                        onChange={(e) => setNewEntry({ ...newEntry, mta_serial: e.target.value })}
                        className="bg-black/20 border-gray-600 text-white"
                        maxLength={32}
                      />
                    </div>
                    <div>
                      <Label htmlFor="discord_id" className="text-white">
                        Discord ID (17-20 digits)
                      </Label>
                      <Input
                        id="discord_id"
                        placeholder="e.g., 708475369614999572"
                        value={newEntry.discord_id}
                        onChange={(e) => setNewEntry({ ...newEntry, discord_id: e.target.value })}
                        className="bg-black/20 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="discord_username" className="text-white">
                        Discord Username (optional)
                      </Label>
                      <Input
                        id="discord_username"
                        placeholder="e.g., anaas___"
                        value={newEntry.discord_username}
                        onChange={(e) => setNewEntry({ ...newEntry, discord_username: e.target.value })}
                        className="bg-black/20 border-gray-600 text-white"
                      />
                    </div>
                    <Button onClick={addToWhitelist} className="w-full bg-gradient-to-r from-red-500 to-orange-500">
                      Add to Whitelist
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Whitelist Table */}
            <Card className="bg-black/20 backdrop-blur-sm border-gray-700">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-red-500" />
                    <span className="ml-2 text-white">Loading whitelist...</span>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">MTA Serial</TableHead>
                        <TableHead className="text-gray-300">Discord</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Added By</TableHead>
                        <TableHead className="text-gray-300">Added At</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map((entry) => (
                        <TableRow key={entry.mta_serial} className="border-gray-700 hover:bg-white/5">
                          <TableCell className="font-mono text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="text-white">
                                {entry.mta_serial.substring(0, 8)}...{entry.mta_serial.substring(24)}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(entry.mta_serial)}
                                className="h-6 w-6 p-0 hover:bg-white/10"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-white text-sm">{entry.discord_username || "Unknown"}</span>
                                {entry.is_online && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-400 text-xs font-mono">{entry.discord_id}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(entry.discord_id)}
                                  className="h-4 w-4 p-0 hover:bg-white/10"
                                >
                                  <Copy className="w-2 h-2" />
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                entry.verification_status === "verified"
                                  ? "default"
                                  : entry.verification_status === "expired"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className={
                                entry.verification_status === "verified"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : entry.verification_status === "expired"
                                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              }
                            >
                              {entry.verification_status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">{entry.added_by}</TableCell>
                          <TableCell className="text-gray-400 text-sm">
                            {new Date(entry.added_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFromWhitelist(entry.mta_serial)}
                                className="h-8 w-8 p-0 hover:bg-red-500/20 text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            {/* Applications Table */}
            <Card className="bg-black/20 backdrop-blur-sm border-gray-700">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-red-500" />
                    <span className="ml-2 text-white">Loading applications...</span>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">Character</TableHead>
                        <TableHead className="text-gray-300">Discord</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Submitted</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((app) => (
                        <TableRow key={app.id} className="border-gray-700 hover:bg-white/5">
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-white font-medium">{app.character_name}</div>
                              <div className="text-gray-400 text-sm">Age: {app.character_age}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-white text-sm">{app.discord_username}</div>
                              <div className="text-gray-400 text-xs font-mono">{app.discord_id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                app.status === "approved"
                                  ? "default"
                                  : app.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className={
                                app.status === "approved"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : app.status === "rejected"
                                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              }
                            >
                              {app.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-400 text-sm">
                            {new Date(app.submitted_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 hover:bg-blue-500/20 text-blue-400"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="text-white">Application Details</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4 text-white">
                                    <div>
                                      <Label className="text-gray-300">Character Name</Label>
                                      <p className="text-white">{app.character_name}</p>
                                    </div>
                                    <div>
                                      <Label className="text-gray-300">Character Age</Label>
                                      <p className="text-white">{app.character_age}</p>
                                    </div>
                                    <div>
                                      <Label className="text-gray-300">Character Backstory</Label>
                                      <p className="text-white whitespace-pre-wrap">{app.character_backstory}</p>
                                    </div>
                                    <div>
                                      <Label className="text-gray-300">Why Join Server</Label>
                                      <p className="text-white whitespace-pre-wrap">{app.why_join}</p>
                                    </div>
                                    <div>
                                      <Label className="text-gray-300">Discord</Label>
                                      <p className="text-white">
                                        {app.discord_username} ({app.discord_id})
                                      </p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
