"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Search,
  Trash2,
  Eye,
  Shield,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Copy,
  Filter,
  Gamepad2,
  Server,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"

interface WhitelistEntry {
  id: string
  mta_serial: string
  discord_id: string
  discord_username?: string
  added_by: string
  added_at: string
  verified_status: "verified" | "expired" | "pending"
  last_seen?: string
  ip_address?: string
  is_online?: boolean
}

interface WhitelistStats {
  total: number
  verified: number
  expired: number
  pending: number
  online: number
}

// Floating particle component for background effects
const WhitelistParticle = ({ delay }: { delay: number }) => (
  <div
    className="absolute w-1 h-1 bg-gradient-to-r from-red-400 to-orange-500 rounded-full animate-pulse opacity-70"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }}
  />
)

export default function WhitelistManager() {
  const { data: session } = useSession()
  const [entries, setEntries] = useState<WhitelistEntry[]>([])
  const [filteredEntries, setFilteredEntries] = useState<WhitelistEntry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<WhitelistEntry | null>(null)
  const [newEntry, setNewEntry] = useState({ mta_serial: "", discord_id: "", discord_username: "" })
  const [stats, setStats] = useState<WhitelistStats>({ total: 0, verified: 0, expired: 0, pending: 0, online: 0 })
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { toast } = useToast()

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Load whitelist data
  useEffect(() => {
    fetchWhitelistData()
  }, [])

  const fetchWhitelistData = async () => {
    try {
      const response = await fetch("/api/admin/whitelist-manager")
      if (response.ok) {
        const data = await response.json()
        setEntries(data.entries || [])
        setStats(data.stats || { total: 0, verified: 0, expired: 0, pending: 0, online: 0 })
      } else {
        // Mock data for demonstration
        const mockData: WhitelistEntry[] = [
          {
            id: "1",
            mta_serial: "A1B2C3D4E5F6789012345678901234AB",
            discord_id: "123456789012345678",
            discord_username: "PlayerOne#1234",
            added_by: "AdminUser",
            added_at: "2024-01-15 14:30:00",
            verified_status: "verified",
            last_seen: "2024-01-20 18:45:00",
            ip_address: "192.168.1.100",
            is_online: true,
          },
          {
            id: "2",
            mta_serial: "B2C3D4E5F6789012345678901234ABC1",
            discord_id: "234567890123456789",
            discord_username: "GamerTwo#5678",
            added_by: "ModeratorX",
            added_at: "2024-01-16 09:15:00",
            verified_status: "expired",
            last_seen: "2024-01-18 12:20:00",
            ip_address: "192.168.1.101",
            is_online: false,
          },
          {
            id: "3",
            mta_serial: "C3D4E5F6789012345678901234ABC12D",
            discord_id: "345678901234567890",
            discord_username: "RoleplayKing#9999",
            added_by: "AdminUser",
            added_at: "2024-01-17 16:45:00",
            verified_status: "pending",
            last_seen: "Never",
            ip_address: "N/A",
            is_online: false,
          },
        ]
        setEntries(mockData)
        setStats({
          total: mockData.length,
          verified: mockData.filter((e) => e.verified_status === "verified").length,
          expired: mockData.filter((e) => e.verified_status === "expired").length,
          pending: mockData.filter((e) => e.verified_status === "pending").length,
          online: mockData.filter((e) => e.is_online).length,
        })
      }
    } catch (error) {
      console.error("Failed to fetch whitelist data:", error)
      toast({
        title: "Error",
        description: "Failed to load whitelist data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Filter and search logic
  useEffect(() => {
    let filtered = entries

    if (searchTerm) {
      filtered = filtered.filter(
        (entry) =>
          entry.mta_serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.discord_id.includes(searchTerm) ||
          entry.discord_username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.added_by.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((entry) => entry.verified_status === filterStatus)
    }

    setFilteredEntries(filtered)
  }, [entries, searchTerm, filterStatus])

  const handleAddEntry = async () => {
    if (!newEntry.mta_serial || !newEntry.discord_id) {
      toast({
        title: "Error",
        description: "MTA Serial and Discord ID are required",
        variant: "destructive",
      })
      return
    }

    // Validate MTA serial format (32 hex chars)
    if (!/^[a-fA-F0-9]{32}$/.test(newEntry.mta_serial)) {
      toast({
        title: "Invalid MTA Serial",
        description: "MTA Serial must be 32 hexadecimal characters",
        variant: "destructive",
      })
      return
    }

    // Validate Discord ID format (17-20 digits)
    if (!/^\d{17,20}$/.test(newEntry.discord_id)) {
      toast({
        title: "Invalid Discord ID",
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
          description: "Player added to whitelist successfully",
        })
        setNewEntry({ mta_serial: "", discord_id: "", discord_username: "" })
        setIsAddDialogOpen(false)
        fetchWhitelistData()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.message || "Failed to add player to whitelist",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleRemoveEntry = async (id: string) => {
    try {
      const response = await fetch("/api/admin/whitelist-manager", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Player removed from whitelist",
        })
        fetchWhitelistData()
      } else {
        toast({
          title: "Error",
          description: "Failed to remove player from whitelist",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg shadow-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "expired":
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-rose-600 text-white border-0 shadow-lg shadow-red-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0 shadow-lg shadow-yellow-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-orange-900/10"></div>
          {Array.from({ length: 20 }).map((_, i) => (
            <WhitelistParticle key={i} delay={i * 0.1} />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4"></div>
          <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-spin mx-auto mb-4 opacity-20 blur-sm"></div>
          <p className="text-white text-xl">Loading Whitelist System...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-orange-900/10"></div>

        {/* Particle System */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <WhitelistParticle key={i} delay={i * 0.1} />
          ))}
        </div>

        {/* Mouse Follow Glow */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-red-500/20 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="relative inline-block">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-red-500 blur-2xl opacity-30 animate-pulse"></div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            MTA WHITELIST MANAGER
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Manage player access to your MTA server. Control who can join with advanced serial and Discord verification.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300 mb-1">Total Players</p>
                  <p className="text-3xl font-bold text-blue-400">{stats.total}</p>
                </div>
                <div className="relative">
                  <Users className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-blue-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-300 mb-1">Verified</p>
                  <p className="text-3xl font-bold text-green-400">{stats.verified}</p>
                </div>
                <div className="relative">
                  <CheckCircle className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-green-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-300 mb-1">Expired</p>
                  <p className="text-3xl font-bold text-red-400">{stats.expired}</p>
                </div>
                <div className="relative">
                  <XCircle className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-red-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-300 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
                </div>
                <div className="relative">
                  <Clock className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-yellow-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-gradient-to-br from-orange-900/30 to-orange-800/20 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-300 mb-1">Online</p>
                  <p className="text-3xl font-bold text-orange-400">{stats.online}</p>
                </div>
                <div className="relative">
                  <Server className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-orange-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Management Card */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-500/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 animate-pulse"></div>

          <CardHeader className="relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                  Whitelist Management
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage MTA serials and Discord verification status for server access
                </CardDescription>
              </div>

              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Player
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-gray-900 border border-red-500/30 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-red-400">Add Player to Whitelist</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      Enter the player's MTA serial and Discord information
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="mta_serial" className="text-white">
                        MTA Serial *
                      </Label>
                      <Input
                        id="mta_serial"
                        placeholder="32-character hexadecimal string"
                        value={newEntry.mta_serial}
                        onChange={(e) => setNewEntry({ ...newEntry, mta_serial: e.target.value.toUpperCase() })}
                        className="font-mono bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                      />
                      <p className="text-xs text-gray-400 mt-1">Example: A1B2C3D4E5F6789012345678901234AB</p>
                    </div>
                    <div>
                      <Label htmlFor="discord_id" className="text-white">
                        Discord ID *
                      </Label>
                      <Input
                        id="discord_id"
                        placeholder="17-20 digit Discord ID"
                        value={newEntry.discord_id}
                        onChange={(e) => setNewEntry({ ...newEntry, discord_id: e.target.value })}
                        className="font-mono bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                      />
                      <p className="text-xs text-gray-400 mt-1">Example: 123456789012345678</p>
                    </div>
                    <div>
                      <Label htmlFor="discord_username" className="text-white">
                        Discord Username (Optional)
                      </Label>
                      <Input
                        id="discord_username"
                        placeholder="Username#1234"
                        value={newEntry.discord_username}
                        onChange={(e) => setNewEntry({ ...newEntry, discord_username: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddEntry}
                      className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
                    >
                      Add Player
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by MTA serial, Discord ID, username, or admin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48 bg-gray-800/50 border-gray-600 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-gray-700 overflow-hidden">
              <Table>
                <TableHeader className="bg-gradient-to-r from-red-900/30 to-orange-900/30">
                  <TableRow className="border-gray-700 hover:bg-transparent">
                    <TableHead className="font-semibold text-red-300">MTA Serial</TableHead>
                    <TableHead className="font-semibold text-red-300">Discord Info</TableHead>
                    <TableHead className="font-semibold text-red-300">Status</TableHead>
                    <TableHead className="font-semibold text-red-300">Added By</TableHead>
                    <TableHead className="font-semibold text-red-300">Added At</TableHead>
                    <TableHead className="font-semibold text-red-300">Last Seen</TableHead>
                    <TableHead className="font-semibold text-red-300 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow
                      key={entry.id}
                      className="border-gray-700 hover:bg-red-900/10 transition-colors duration-200"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <code className="bg-gradient-to-r from-gray-800 to-gray-700 px-3 py-2 rounded text-xs font-mono text-green-400 border border-gray-600">
                              {entry.mta_serial.slice(0, 8)}...{entry.mta_serial.slice(-4)}
                            </code>
                            {entry.is_online && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(entry.mta_serial)}
                            className="h-6 w-6 p-0 hover:bg-gray-700"
                          >
                            <Copy className="w-3 h-3 text-gray-400" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <code className="bg-gradient-to-r from-blue-900 to-blue-800 px-2 py-1 rounded text-xs font-mono text-blue-300 border border-blue-600/30">
                              {entry.discord_id}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(entry.discord_id)}
                              className="h-6 w-6 p-0 hover:bg-gray-700"
                            >
                              <Copy className="w-3 h-3 text-gray-400" />
                            </Button>
                          </div>
                          {entry.discord_username && <p className="text-sm text-gray-400">{entry.discord_username}</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(entry.verified_status)}
                          {entry.is_online && (
                            <Badge className="bg-gradient-to-r from-green-600 to-emerald-700 text-white border-0">
                              <Gamepad2 className="w-3 h-3 mr-1" />
                              Online
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {entry.added_by}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-400">
                        {new Date(entry.added_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm text-gray-400">
                        {entry.last_seen === "Never" ? (
                          <Badge variant="outline" className="border-gray-600 text-gray-500">
                            Never
                          </Badge>
                        ) : (
                          new Date(entry.last_seen!).toLocaleDateString()
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedEntry(entry)
                              setIsViewDialogOpen(true)
                            }}
                            className="hover:bg-blue-900/30 hover:text-blue-400"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveEntry(entry.id)}
                            className="hover:bg-red-900/30 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredEntries.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl mb-2">No players found</p>
                <p className="text-sm">No players match your current search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* View Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-lg bg-gray-900 border border-red-500/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-red-400">Player Details</DialogTitle>
              <DialogDescription className="text-gray-300">
                Complete information for whitelisted player
              </DialogDescription>
            </DialogHeader>
            {selectedEntry && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-400">MTA Serial</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-gradient-to-r from-gray-800 to-gray-700 px-3 py-2 rounded text-sm font-mono text-green-400 border border-gray-600 flex-1">
                        {selectedEntry.mta_serial}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(selectedEntry.mta_serial)}
                        className="h-8 w-8 p-0 hover:bg-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-400">Discord ID</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-gradient-to-r from-blue-900 to-blue-800 px-3 py-2 rounded text-sm font-mono text-blue-300 border border-blue-600/30 flex-1">
                        {selectedEntry.discord_id}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(selectedEntry.discord_id)}
                        className="h-8 w-8 p-0 hover:bg-gray-700"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-400">Discord Username</Label>
                  <p className="mt-1 text-white">{selectedEntry.discord_username || "Not provided"}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-400">Status</Label>
                    <div className="mt-1 flex items-center gap-2">
                      {getStatusBadge(selectedEntry.verified_status)}
                      {selectedEntry.is_online && (
                        <Badge className="bg-gradient-to-r from-green-600 to-emerald-700 text-white border-0">
                          <Gamepad2 className="w-3 h-3 mr-1" />
                          Online
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-400">IP Address</Label>
                    <p className="mt-1 font-mono text-sm text-gray-300">{selectedEntry.ip_address}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-400">Added By</Label>
                    <Badge variant="outline" className="mt-1 border-gray-600 text-gray-300">
                      {selectedEntry.added_by}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-400">Added At</Label>
                    <p className="mt-1 text-sm text-gray-300">{new Date(selectedEntry.added_at).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-400">Last Seen</Label>
                  <p className="mt-1 text-sm text-gray-300">
                    {selectedEntry.last_seen === "Never"
                      ? "Never joined the server"
                      : new Date(selectedEntry.last_seen!).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-red-500 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-orange-500 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-yellow-500 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-40 right-10 w-2 h-2 bg-red-500 rounded-full animate-bounce opacity-60"></div>
    </div>
  )
}
