"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { Users, UserCheck, UserX, Clock, Wifi, Plus, Search, Copy, Trash2, Eye, Shield, Loader2 } from "lucide-react"
import { isAdmin } from "@/lib/admin"
import Link from "next/link"

// Animated background particles
const Particles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-red-500/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )
}

// Animated grid background
const GridBackground = () => {
  return (
    <div className="fixed inset-0 opacity-5">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />
    </div>
  )
}

interface WhitelistEntry {
  id: number
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
}

export default function AdminWhitelistPage() {
  const { data: session, status } = useSession()
  const [whitelistEntries, setWhitelistEntries] = useState<WhitelistEntry[]>([])
  const [applications, setApplications] = useState<WhitelistApplication[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, verified: 0, expired: 0, pending: 0, online: 0 })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<WhitelistEntry | null>(null)
  const [newEntry, setNewEntry] = useState({
    mta_serial: "",
    discord_id: "",
    discord_username: "",
  })

  // Check admin access
  useEffect(() => {
    if (status === "loading") return

    if (!session?.user?.discordId || !isAdmin(session.user.discordId)) {
      window.location.href = "/auth/signin"
      return
    }

    loadData()
  }, [session, status])

  const loadData = async () => {
    try {
      setLoading(true)

      // Mock data for demonstration - replace with actual API calls
      const mockWhitelistEntries: WhitelistEntry[] = [
        {
          id: 1,
          mta_serial: "A1B2C3D4E5F6789012345678901234AB",
          discord_id: "708475369614999572",
          discord_username: "anaas___",
          added_by: "System",
          added_at: "2024-01-15T10:30:00Z",
          verification_status: "verified",
          is_online: true,
        },
        {
          id: 2,
          mta_serial: "B2C3D4E5F6789012345678901234ABC1",
          discord_id: "123456789012345678",
          discord_username: "player2",
          added_by: "anaas___",
          added_at: "2024-01-14T15:45:00Z",
          verification_status: "expired",
          is_online: false,
        },
        {
          id: 3,
          mta_serial: "C3D4E5F6789012345678901234ABC12D",
          discord_id: "987654321098765432",
          discord_username: "player3",
          added_by: "anaas___",
          added_at: "2024-01-13T09:15:00Z",
          verification_status: "pending",
          is_online: false,
        },
      ]

      const mockApplications: WhitelistApplication[] = [
        {
          id: 1,
          character_name: "John Smith",
          character_age: 25,
          character_backstory: "A former mechanic looking for a fresh start in the city...",
          why_join: "I want to experience quality roleplay and contribute to the community...",
          discord_id: "111222333444555666",
          discord_username: "newplayer1",
          status: "pending",
          submitted_at: "2024-01-16T12:00:00Z",
        },
      ]

      setWhitelistEntries(mockWhitelistEntries)
      setApplications(mockApplications)

      // Calculate stats
      const totalEntries = mockWhitelistEntries.length
      const verified = mockWhitelistEntries.filter((e) => e.verification_status === "verified").length
      const expired = mockWhitelistEntries.filter((e) => e.verification_status === "expired").length
      const pending = mockWhitelistEntries.filter((e) => e.verification_status === "pending").length
      const online = mockWhitelistEntries.filter((e) => e.is_online).length

      setStats({
        total: totalEntries,
        verified,
        expired,
        pending,
        online,
      })
    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "Error",
        description: "Failed to load whitelist data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddPlayer = async () => {
    try {
      // Validate MTA serial (32 hex characters)
      if (!/^[a-fA-F0-9]{32}$/.test(newEntry.mta_serial)) {
        toast({
          title: "Invalid MTA Serial",
          description: "MTA Serial must be exactly 32 hexadecimal characters",
          variant: "destructive",
        })
        return
      }

      // Validate Discord ID (17-20 digits)
      if (!/^\d{17,20}$/.test(newEntry.discord_id)) {
        toast({
          title: "Invalid Discord ID",
          description: "Discord ID must be 17-20 digits",
          variant: "destructive",
        })
        return
      }

      // Add to whitelist (mock implementation)
      const newWhitelistEntry: WhitelistEntry = {
        id: Date.now(),
        mta_serial: newEntry.mta_serial.toUpperCase(),
        discord_id: newEntry.discord_id,
        discord_username: newEntry.discord_username,
        added_by: session?.user?.name || "Admin",
        added_at: new Date().toISOString(),
        verification_status: "pending",
        is_online: false,
      }

      setWhitelistEntries((prev) => [...prev, newWhitelistEntry])
      setStats((prev) => ({ ...prev, total: prev.total + 1, pending: prev.pending + 1 }))

      toast({
        title: "Success",
        description: `Added ${newEntry.discord_username || newEntry.discord_id} to whitelist`,
      })

      setNewEntry({ mta_serial: "", discord_id: "", discord_username: "" })
      setIsAddDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add player to whitelist",
        variant: "destructive",
      })
    }
  }

  const handleRemovePlayer = async (entry: WhitelistEntry) => {
    try {
      setWhitelistEntries((prev) => prev.filter((e) => e.id !== entry.id))
      setStats((prev) => ({
        ...prev,
        total: prev.total - 1,
        [entry.verification_status]: prev[entry.verification_status] - 1,
      }))

      toast({
        title: "Success",
        description: `Removed ${entry.discord_username || entry.discord_id} from whitelist`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove player from whitelist",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    })
  }

  const truncateSerial = (serial: string) => {
    return `${serial.slice(0, 8)}...${serial.slice(-8)}`
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      verified: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
      expired: "bg-gradient-to-r from-red-500 to-rose-500 text-white",
      pending: "bg-gradient-to-r from-yellow-500 to-amber-500 text-white",
      approved: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      rejected: "bg-gradient-to-r from-gray-500 to-slate-500 text-white",
    }

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
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

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-orange-900/20 flex items-center justify-center">
        <Particles />
        <GridBackground />
        <Card className="bg-black/40 backdrop-blur-xl border-red-500/20">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-red-500" />
            <p className="text-white">Loading whitelist system...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-orange-900/20 p-4">
      <Particles />
      <GridBackground />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Whitelist Management
            </h1>
            <p className="text-gray-400 mt-2">Manage MTA whitelist and character applications</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="bg-black/40 border-red-500/30 text-white hover:bg-red-500/20">
              <Shield className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { label: "Total Players", value: stats.total, icon: Users, color: "from-blue-500 to-cyan-500" },
            { label: "Verified", value: stats.verified, icon: UserCheck, color: "from-green-500 to-emerald-500" },
            { label: "Expired", value: stats.expired, icon: UserX, color: "from-red-500 to-rose-500" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "from-yellow-500 to-amber-500" },
            { label: "Online", value: stats.online, icon: Wifi, color: "from-purple-500 to-pink-500" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-black/40 backdrop-blur-xl border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Card className="bg-black/40 backdrop-blur-xl border-red-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Whitelist System</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage MTA serials and character applications
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-black/40 border-red-500/30 text-white placeholder-gray-400"
                  />
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Player
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black/90 backdrop-blur-xl border-red-500/30 text-white">
                    <DialogHeader>
                      <DialogTitle>Add Player to Whitelist</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Add a new player to the MTA whitelist with their serial and Discord information.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="mta_serial">MTA Serial (32 hex characters)</Label>
                        <Input
                          id="mta_serial"
                          placeholder="A1B2C3D4E5F6789012345678901234AB"
                          value={newEntry.mta_serial}
                          onChange={(e) => setNewEntry((prev) => ({ ...prev, mta_serial: e.target.value }))}
                          className="bg-black/40 border-red-500/30 text-white"
                          maxLength={32}
                        />
                      </div>
                      <div>
                        <Label htmlFor="discord_id">Discord ID (17-20 digits)</Label>
                        <Input
                          id="discord_id"
                          placeholder="708475369614999572"
                          value={newEntry.discord_id}
                          onChange={(e) => setNewEntry((prev) => ({ ...prev, discord_id: e.target.value }))}
                          className="bg-black/40 border-red-500/30 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="discord_username">Discord Username (Optional)</Label>
                        <Input
                          id="discord_username"
                          placeholder="anaas___"
                          value={newEntry.discord_username}
                          onChange={(e) => setNewEntry((prev) => ({ ...prev, discord_username: e.target.value }))}
                          className="bg-black/40 border-red-500/30 text-white"
                        />
                      </div>
                      <Button
                        onClick={handleAddPlayer}
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                      >
                        Add to Whitelist
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="whitelist" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black/40">
                <TabsTrigger value="whitelist" className="data-[state=active]:bg-red-500/20 text-white">
                  MTA Whitelist ({stats.total})
                </TabsTrigger>
                <TabsTrigger value="applications" className="data-[state=active]:bg-red-500/20 text-white">
                  Applications ({applications.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="whitelist" className="mt-6">
                <div className="rounded-lg border border-red-500/20 bg-black/20">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-red-500/20 hover:bg-red-500/5">
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
                        <TableRow key={entry.id} className="border-red-500/20 hover:bg-red-500/5">
                          <TableCell className="text-white font-mono">
                            <div className="flex items-center gap-2">
                              <span>{truncateSerial(entry.mta_serial)}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(entry.mta_serial, "MTA Serial")}
                                className="h-6 w-6 p-0 hover:bg-red-500/20"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-white">
                            <div className="flex items-center gap-2">
                              <div>
                                <p className="font-medium">{entry.discord_username || "Unknown"}</p>
                                <p className="text-xs text-gray-400">{entry.discord_id}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(entry.discord_id, "Discord ID")}
                                className="h-6 w-6 p-0 hover:bg-red-500/20"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(entry.verification_status)}
                              {entry.is_online && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-300">{entry.added_by}</TableCell>
                          <TableCell className="text-gray-300">
                            {new Date(entry.added_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setSelectedEntry(entry)}
                                    className="h-8 w-8 p-0 hover:bg-blue-500/20"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-black/90 backdrop-blur-xl border-red-500/30 text-white">
                                  <DialogHeader>
                                    <DialogTitle>Player Details</DialogTitle>
                                  </DialogHeader>
                                  {selectedEntry && (
                                    <div className="space-y-4">
                                      <div>
                                        <Label>MTA Serial</Label>
                                        <p className="font-mono text-sm bg-black/40 p-2 rounded border border-red-500/20">
                                          {selectedEntry.mta_serial}
                                        </p>
                                      </div>
                                      <div>
                                        <Label>Discord Information</Label>
                                        <div className="bg-black/40 p-2 rounded border border-red-500/20">
                                          <p>Username: {selectedEntry.discord_username || "Unknown"}</p>
                                          <p>ID: {selectedEntry.discord_id}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Status</Label>
                                        <div className="flex items-center gap-2 mt-1">
                                          {getStatusBadge(selectedEntry.verification_status)}
                                          {selectedEntry.is_online && <Badge className="bg-green-500">Online</Badge>}
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Added Information</Label>
                                        <div className="bg-black/40 p-2 rounded border border-red-500/20">
                                          <p>Added by: {selectedEntry.added_by}</p>
                                          <p>Added at: {new Date(selectedEntry.added_at).toLocaleString()}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-red-500/20">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-black/90 backdrop-blur-xl border-red-500/30 text-white">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remove from Whitelist</AlertDialogTitle>
                                    <AlertDialogDescription className="text-gray-400">
                                      Are you sure you want to remove {entry.discord_username || entry.discord_id} from
                                      the whitelist? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-black/40 border-gray-500/30 text-white hover:bg-gray-500/20">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleRemovePlayer(entry)}
                                      className="bg-red-500 hover:bg-red-600"
                                    >
                                      Remove
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="applications" className="mt-6">
                <div className="rounded-lg border border-red-500/20 bg-black/20">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-red-500/20 hover:bg-red-500/5">
                        <TableHead className="text-gray-300">Character</TableHead>
                        <TableHead className="text-gray-300">Discord</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Submitted</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((app) => (
                        <TableRow key={app.id} className="border-red-500/20 hover:bg-red-500/5">
                          <TableCell className="text-white">
                            <div>
                              <p className="font-medium">{app.character_name}</p>
                              <p className="text-sm text-gray-400">Age: {app.character_age}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-white">
                            <div>
                              <p className="font-medium">{app.discord_username}</p>
                              <p className="text-xs text-gray-400">{app.discord_id}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                          <TableCell className="text-gray-300">
                            {new Date(app.submitted_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-500/20">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {app.status === "pending" && (
                                <>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-500/20">
                                    <UserCheck className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-red-500/20">
                                    <UserX className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
