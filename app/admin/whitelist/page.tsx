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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Wifi,
  Search,
  Plus,
  Copy,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
} from "lucide-react"

interface WhitelistEntry {
  mta_serial: string
  discord_id: string
  discord_username?: string
  added_by: string
  added_at: string
  verification_status: "verified" | "expired" | "pending"
  is_online: boolean
}

interface Application {
  id: number
  discord_id: string
  discord_username: string
  character_name: string
  character_age: number
  character_backstory: string
  why_join: string
  status: "pending" | "approved" | "rejected"
  created_at: string
  reviewed_by?: string
  reviewed_at?: string
  admin_notes?: string
}

interface Stats {
  total: number
  verified: number
  expired: number
  pending: number
  online: number
}

export default function AdminWhitelistPage() {
  const { data: session } = useSession()
  const [whitelistEntries, setWhitelistEntries] = useState<WhitelistEntry[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, verified: 0, expired: 0, pending: 0, online: 0 })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEntry, setSelectedEntry] = useState<WhitelistEntry | null>(null)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newEntry, setNewEntry] = useState({ mta_serial: "", discord_id: "" })

  // Particle animation state
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([])

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }))
    setParticles(initialParticles)

    // Animate particles
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight,
        })),
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch whitelist entries
      const whitelistResponse = await fetch("/api/admin/whitelist-manager")
      if (whitelistResponse.ok) {
        const whitelistData = await whitelistResponse.json()
        setWhitelistEntries(whitelistData.entries || [])
        setStats(whitelistData.stats || { total: 0, verified: 0, expired: 0, pending: 0, online: 0 })
      }

      // Fetch applications
      const applicationsResponse = await fetch("/api/admin/whitelist")
      if (applicationsResponse.ok) {
        const applicationsData = await applicationsResponse.json()
        setApplications(applicationsData.applications || [])
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddPlayer = async () => {
    if (!newEntry.mta_serial || !newEntry.discord_id) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    // Validate MTA serial (32 hex characters)
    if (!/^[a-fA-F0-9]{32}$/.test(newEntry.mta_serial)) {
      toast({
        title: "Error",
        description: "MTA Serial must be 32 hexadecimal characters",
        variant: "destructive",
      })
      return
    }

    // Validate Discord ID (17-20 digits)
    if (!/^\d{17,20}$/.test(newEntry.discord_id)) {
      toast({
        title: "Error",
        description: "Discord ID must be 17-20 digits",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/admin/whitelist-manager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Player added to whitelist",
        })
        setShowAddDialog(false)
        setNewEntry({ mta_serial: "", discord_id: "" })
        fetchData()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.message || "Failed to add player",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add player",
        variant: "destructive",
      })
    }
  }

  const handleRemovePlayer = async (mtaSerial: string) => {
    try {
      const response = await fetch("/api/admin/whitelist-manager", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mta_serial: mtaSerial }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Player removed from whitelist",
        })
        fetchData()
      } else {
        toast({
          title: "Error",
          description: "Failed to remove player",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove player",
        variant: "destructive",
      })
    }
  }

  const handleApplicationAction = async (
    applicationId: number,
    status: "approved" | "rejected",
    adminNotes?: string,
  ) => {
    try {
      const response = await fetch("/api/admin/whitelist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, status, adminNotes }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Application ${status}`,
        })
        fetchData()
      } else {
        toast({
          title: "Error",
          description: "Failed to update application",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Copied to clipboard",
    })
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
      app.discord_username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.character_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.discord_id.includes(searchTerm),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "expired":
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white">
            <XCircle className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gradient-to-r from-gray-500 to-slate-500 text-white">
            <AlertCircle className="w-3 h-3 mr-1" />
            Unknown
          </Badge>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-orange-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading whitelist data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-orange-900/20 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
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

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transition: "all 0.05s linear",
          }}
        />
      ))}

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Whitelist Management
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Manage MTA whitelist entries and review character applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-black/40 backdrop-blur-sm border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Players</p>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Verified</p>
                  <p className="text-3xl font-bold text-green-500">{stats.verified}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Expired</p>
                  <p className="text-3xl font-bold text-red-500">{stats.expired}</p>
                </div>
                <UserX className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-sm border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Online</p>
                  <p className="text-3xl font-bold text-emerald-500">{stats.online}</p>
                </div>
                <Wifi className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="bg-black/40 backdrop-blur-sm border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by MTA serial, Discord ID, username, or admin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="whitelist" className="space-y-6">
          <TabsList className="bg-black/40 backdrop-blur-sm border border-gray-800">
            <TabsTrigger
              value="whitelist"
              className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400"
            >
              MTA Whitelist ({filteredEntries.length})
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
            >
              Applications ({filteredApplications.length})
            </TabsTrigger>
          </TabsList>

          {/* MTA Whitelist Tab */}
          <TabsContent value="whitelist">
            <Card className="bg-black/40 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">MTA Whitelist Entries</CardTitle>
                    <CardDescription>Manage players with MTA serial access</CardDescription>
                  </div>
                  <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Player
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-800">
                      <DialogHeader>
                        <DialogTitle className="text-white">Add Player to Whitelist</DialogTitle>
                        <DialogDescription>Add a new player with their MTA serial and Discord ID</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="mta_serial" className="text-white">
                            MTA Serial (32 hex characters)
                          </Label>
                          <Input
                            id="mta_serial"
                            placeholder="e.g., A1B2C3D4E5F6789012345678901234AB"
                            value={newEntry.mta_serial}
                            onChange={(e) => setNewEntry({ ...newEntry, mta_serial: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white"
                            maxLength={32}
                          />
                        </div>
                        <div>
                          <Label htmlFor="discord_id" className="text-white">
                            Discord ID (17-20 digits)
                          </Label>
                          <Input
                            id="discord_id"
                            placeholder="e.g., 123456789012345678"
                            value={newEntry.discord_id}
                            onChange={(e) => setNewEntry({ ...newEntry, discord_id: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddPlayer} className="bg-gradient-to-r from-red-500 to-orange-500">
                          Add Player
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
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
                      <TableRow key={entry.mta_serial} className="border-gray-800 hover:bg-gray-800/50">
                        <TableCell className="font-mono text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-400">
                              {entry.mta_serial.substring(0, 8)}...{entry.mta_serial.substring(24)}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(entry.mta_serial)}
                              className="h-6 w-6 p-0 hover:bg-gray-700"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {entry.is_online && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                            <div>
                              <p className="text-white font-medium">{entry.discord_username || "Unknown"}</p>
                              <p className="text-gray-400 text-sm font-mono">{entry.discord_id}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(entry.discord_id)}
                              className="h-6 w-6 p-0 hover:bg-gray-700"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(entry.verification_status)}</TableCell>
                        <TableCell className="text-gray-300">{entry.added_by}</TableCell>
                        <TableCell className="text-gray-400">{new Date(entry.added_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedEntry(entry)}
                              className="hover:bg-blue-500/20 hover:text-blue-400"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemovePlayer(entry.mta_serial)}
                              className="hover:bg-red-500/20 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card className="bg-black/40 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Character Applications</CardTitle>
                <CardDescription>Review and manage character applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-300">Player</TableHead>
                      <TableHead className="text-gray-300">Character</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Submitted</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((application) => (
                      <TableRow key={application.id} className="border-gray-800 hover:bg-gray-800/50">
                        <TableCell>
                          <div>
                            <p className="text-white font-medium">{application.discord_username}</p>
                            <p className="text-gray-400 text-sm font-mono">{application.discord_id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-white font-medium">{application.character_name}</p>
                            <p className="text-gray-400 text-sm">Age: {application.character_age}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(application.status)}</TableCell>
                        <TableCell className="text-gray-400">
                          {new Date(application.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedApplication(application)}
                              className="hover:bg-blue-500/20 hover:text-blue-400"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {application.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleApplicationAction(application.id, "approved")}
                                  className="hover:bg-green-500/20 hover:text-green-400"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleApplicationAction(application.id, "rejected")}
                                  className="hover:bg-red-500/20 hover:text-red-400"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Entry Details Modal */}
        <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Whitelist Entry Details</DialogTitle>
            </DialogHeader>
            {selectedEntry && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">MTA Serial</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-gray-800 px-2 py-1 rounded text-blue-400 text-sm">
                        {selectedEntry.mta_serial}
                      </code>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard(selectedEntry.mta_serial)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Discord ID</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-gray-800 px-2 py-1 rounded text-green-400 text-sm">
                        {selectedEntry.discord_id}
                      </code>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard(selectedEntry.discord_id)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Discord Username</Label>
                    <p className="text-white mt-1">{selectedEntry.discord_username || "Unknown"}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedEntry.verification_status)}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Added By</Label>
                    <p className="text-white mt-1">{selectedEntry.added_by}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Added At</Label>
                    <p className="text-white mt-1">{new Date(selectedEntry.added_at).toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Online Status</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`w-3 h-3 rounded-full ${selectedEntry.is_online ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
                    />
                    <span className="text-white">{selectedEntry.is_online ? "Online" : "Offline"}</span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Application Details Modal */}
        <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-white">Application Details</DialogTitle>
            </DialogHeader>
            {selectedApplication && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Discord Username</Label>
                    <p className="text-white mt-1">{selectedApplication.discord_username}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Discord ID</Label>
                    <p className="text-white mt-1 font-mono">{selectedApplication.discord_id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Character Name</Label>
                    <p className="text-white mt-1">{selectedApplication.character_name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Character Age</Label>
                    <p className="text-white mt-1">{selectedApplication.character_age}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Character Backstory</Label>
                  <div className="bg-gray-800 p-3 rounded mt-1 max-h-32 overflow-y-auto">
                    <p className="text-white text-sm">{selectedApplication.character_backstory}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Why Join Server</Label>
                  <div className="bg-gray-800 p-3 rounded mt-1 max-h-32 overflow-y-auto">
                    <p className="text-white text-sm">{selectedApplication.why_join}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedApplication.status)}</div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Submitted</Label>
                    <p className="text-white mt-1">{new Date(selectedApplication.created_at).toLocaleString()}</p>
                  </div>
                </div>
                {selectedApplication.reviewed_by && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Reviewed By</Label>
                      <p className="text-white mt-1">{selectedApplication.reviewed_by}</p>
                    </div>
                    <div>
                      <Label className="text-gray-300">Reviewed At</Label>
                      <p className="text-white mt-1">
                        {selectedApplication.reviewed_at
                          ? new Date(selectedApplication.reviewed_at).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                )}
                {selectedApplication.admin_notes && (
                  <div>
                    <Label className="text-gray-300">Admin Notes</Label>
                    <div className="bg-gray-800 p-3 rounded mt-1">
                      <p className="text-white text-sm">{selectedApplication.admin_notes}</p>
                    </div>
                  </div>
                )}
                {selectedApplication.status === "pending" && (
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => {
                        handleApplicationAction(selectedApplication.id, "approved")
                        setSelectedApplication(null)
                      }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        handleApplicationAction(selectedApplication.id, "rejected")
                        setSelectedApplication(null)
                      }}
                      className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
