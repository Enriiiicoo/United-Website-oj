"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Search,
  Copy,
  Trash2,
  Users,
  UserCheck,
  UserX,
  Activity,
} from "lucide-react"

interface WhitelistEntry {
  mta_serial: string
  discord_id: string
  discord_username?: string
  added_by: string
  added_at: string
  verification_status: "verified" | "expired" | "none"
  verification_expires?: string
  is_online?: boolean
}

interface WhitelistStats {
  total: number
  verified: number
  expired: number
  pending: number
  online: number
}

export default function WhitelistManagerPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([])
  const [stats, setStats] = useState<WhitelistStats>({ total: 0, verified: 0, expired: 0, pending: 0, online: 0 })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSerial, setNewSerial] = useState("")
  const [newDiscordId, setNewDiscordId] = useState("")
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetchWhitelist()
  }, [])

  const fetchWhitelist = async () => {
    try {
      const response = await fetch("/api/admin/whitelist-manager")
      if (response.ok) {
        const data = await response.json()
        setWhitelist(data.whitelist)
        setStats(data.stats)
      } else if (response.status === 403) {
        toast({
          title: "Access Denied",
          description: "You don't have admin permissions.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch whitelist data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddPlayer = async () => {
    if (!newSerial || !newDiscordId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    // Validate MTA serial format (32 hex characters)
    if (!/^[a-fA-F0-9]{32}$/.test(newSerial)) {
      toast({
        title: "Invalid Serial",
        description: "MTA serial must be 32 hexadecimal characters.",
        variant: "destructive",
      })
      return
    }

    // Validate Discord ID format (17-20 digits)
    if (!/^\d{17,20}$/.test(newDiscordId)) {
      toast({
        title: "Invalid Discord ID",
        description: "Discord ID must be 17-20 digits.",
        variant: "destructive",
      })
      return
    }

    setProcessing(true)
    try {
      const response = await fetch("/api/admin/whitelist-manager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mta_serial: newSerial.toLowerCase(),
          discord_id: newDiscordId,
        }),
      })

      if (response.ok) {
        toast({
          title: "Player Added",
          description: "Player has been successfully whitelisted.",
        })
        fetchWhitelist()
        setIsAddDialogOpen(false)
        setNewSerial("")
        setNewDiscordId("")
      } else {
        const data = await response.json()
        toast({
          title: "Failed to Add Player",
          description: data.message || "An error occurred.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
    }
  }

  const handleRemovePlayer = async (serial: string) => {
    setProcessing(true)
    try {
      const response = await fetch("/api/admin/whitelist-manager", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mta_serial: serial }),
      })

      if (response.ok) {
        toast({
          title: "Player Removed",
          description: "Player has been removed from whitelist.",
        })
        fetchWhitelist()
      } else {
        const data = await response.json()
        toast({
          title: "Failed to Remove Player",
          description: data.message || "An error occurred.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "Text copied to clipboard.",
    })
  }

  const filteredWhitelist = whitelist.filter((entry) => {
    const matchesSearch =
      entry.mta_serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.discord_id.includes(searchTerm) ||
      (entry.discord_username && entry.discord_username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      entry.added_by.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "verified" && entry.verification_status === "verified") ||
      (filterStatus === "expired" && entry.verification_status === "expired") ||
      (filterStatus === "none" && entry.verification_status === "none") ||
      (filterStatus === "online" && entry.is_online)

    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4 animate-spin" />
          <h1 className="text-2xl font-bold">Loading Whitelist...</h1>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-400">Please sign in to access the admin panel.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-orange-900/10"></div>
      </div>

      <Navigation />

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="relative inline-block">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 bg-red-500 blur-2xl opacity-30 animate-pulse"></div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            WHITELIST MANAGER
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Manage MTA serials and Discord verification for server access control.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">{stats.total}</h3>
              <p className="text-gray-400">Total Whitelisted</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30">
            <CardContent className="p-6 text-center">
              <UserCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">{stats.verified}</h3>
              <p className="text-gray-400">Verified</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/30">
            <CardContent className="p-6 text-center">
              <UserX className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">{stats.expired}</h3>
              <p className="text-gray-400">Expired</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">{stats.pending}</h3>
              <p className="text-gray-400">Pending</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30">
            <CardContent className="p-6 text-center">
              <Activity className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">{stats.online}</h3>
              <p className="text-gray-400">Online Now</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by serial, Discord ID, username, or admin..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === "all" ? "default" : "outline"}
                    onClick={() => setFilterStatus("all")}
                    className="bg-gray-700 hover:bg-gray-600"
                  >
                    All
                  </Button>
                  <Button
                    variant={filterStatus === "verified" ? "default" : "outline"}
                    onClick={() => setFilterStatus("verified")}
                    className="bg-green-700 hover:bg-green-600"
                  >
                    Verified
                  </Button>
                  <Button
                    variant={filterStatus === "expired" ? "default" : "outline"}
                    onClick={() => setFilterStatus("expired")}
                    className="bg-red-700 hover:bg-red-600"
                  >
                    Expired
                  </Button>
                  <Button
                    variant={filterStatus === "online" ? "default" : "outline"}
                    onClick={() => setFilterStatus("online")}
                    className="bg-purple-700 hover:bg-purple-600"
                  >
                    Online
                  </Button>
                </div>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Player
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle>Add Player to Whitelist</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="serial">MTA Serial (32 hex characters)</Label>
                      <Input
                        id="serial"
                        value={newSerial}
                        onChange={(e) => setNewSerial(e.target.value)}
                        placeholder="e.g., 1A2B3C4D5E6F7890ABCDEF1234567890"
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        maxLength={32}
                      />
                    </div>
                    <div>
                      <Label htmlFor="discordId">Discord ID (17-20 digits)</Label>
                      <Input
                        id="discordId"
                        value={newDiscordId}
                        onChange={(e) => setNewDiscordId(e.target.value)}
                        placeholder="e.g., 123456789012345678"
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={handleAddPlayer}
                        disabled={processing}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white flex-1"
                      >
                        {processing ? "Adding..." : "Add Player"}
                      </Button>
                      <Button
                        onClick={() => setIsAddDialogOpen(false)}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Whitelist Table */}
        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">
              Whitelist Entries ({filteredWhitelist.length} of {whitelist.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
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
                  {filteredWhitelist.map((entry) => (
                    <TableRow key={entry.mta_serial} className="border-gray-700 hover:bg-gray-800/50">
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-400">{entry.mta_serial}</span>
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
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-purple-400 font-mono text-sm">{entry.discord_id}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(entry.discord_id)}
                              className="h-6 w-6 p-0 hover:bg-gray-700"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                          {entry.discord_username && (
                            <div className="text-gray-400 text-sm">@{entry.discord_username}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge
                            className={
                              entry.verification_status === "verified"
                                ? "bg-green-600 text-white"
                                : entry.verification_status === "expired"
                                  ? "bg-red-600 text-white"
                                  : "bg-gray-600 text-white"
                            }
                          >
                            {entry.verification_status === "verified" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {entry.verification_status === "expired" && <XCircle className="w-3 h-3 mr-1" />}
                            {entry.verification_status === "none" && <Clock className="w-3 h-3 mr-1" />}
                            {entry.verification_status.toUpperCase()}
                          </Badge>
                          {entry.is_online && (
                            <Badge className="bg-purple-600 text-white">
                              <Activity className="w-3 h-3 mr-1" />
                              ONLINE
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{entry.added_by}</TableCell>
                      <TableCell className="text-gray-400 text-sm">
                        {new Date(entry.added_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemovePlayer(entry.mta_serial)}
                          disabled={processing}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredWhitelist.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No whitelist entries found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
