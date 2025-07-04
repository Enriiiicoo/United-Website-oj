"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Shield, CheckCircle, XCircle, Clock, User, FileText } from "lucide-react"

interface WhitelistApplication {
  id: number
  discord_id: string
  discord_username: string
  character_name: string
  character_backstory: string
  age: number
  previous_rp_experience: string
  why_join: string
  status: "pending" | "approved" | "rejected"
  admin_notes: string
  reviewed_by: string
  reviewed_at: string
  created_at: string
}

export default function AdminWhitelistPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [applications, setApplications] = useState<WhitelistApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState<WhitelistApplication | null>(null)
  const [adminNotes, setAdminNotes] = useState("")
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/admin/whitelist")
      if (response.ok) {
        const data = await response.json()
        setApplications(data.applications)
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
        description: "Failed to fetch applications.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (applicationId: number, status: "approved" | "rejected") => {
    setProcessing(true)
    try {
      const response = await fetch("/api/admin/whitelist", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId,
          status,
          adminNotes,
        }),
      })

      if (response.ok) {
        toast({
          title: "Application Updated",
          description: `Application has been ${status}.`,
        })
        fetchApplications()
        setSelectedApp(null)
        setAdminNotes("")
      } else {
        const data = await response.json()
        toast({
          title: "Update Failed",
          description: data.message || "Failed to update application.",
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-green-500 mx-auto mb-4 animate-spin" />
          <h1 className="text-2xl font-bold">Loading Applications...</h1>
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

  const pendingApps = applications.filter((app) => app.status === "pending")
  const approvedApps = applications.filter((app) => app.status === "approved")
  const rejectedApps = applications.filter((app) => app.status === "rejected")

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
            ADMIN PANEL
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Manage whitelist applications and review community members.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="backdrop-blur-xl bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">{pendingApps.length}</h3>
              <p className="text-gray-400">Pending Applications</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">{approvedApps.length}</h3>
              <p className="text-gray-400">Approved Applications</p>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/30">
            <CardContent className="p-6 text-center">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">{rejectedApps.length}</h3>
              <p className="text-gray-400">Rejected Applications</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Applications */}
          <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Clock className="w-6 h-6 text-yellow-500" />
                Pending Applications ({pendingApps.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {pendingApps.map((app) => (
                <div
                  key={app.id}
                  className="p-4 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-all duration-300"
                  onClick={() => setSelectedApp(app)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{app.character_name}</h4>
                    <Badge className="bg-yellow-600 text-white">Pending</Badge>
                  </div>
                  <p className="text-sm text-gray-400">by {app.discord_username}</p>
                  <p className="text-xs text-gray-500">Applied: {new Date(app.created_at).toLocaleDateString()}</p>
                </div>
              ))}
              {pendingApps.length === 0 && <p className="text-gray-400 text-center py-8">No pending applications</p>}
            </CardContent>
          </Card>

          {/* Application Details */}
          <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <FileText className="w-6 h-6 text-blue-500" />
                Application Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedApp ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Character Name</p>
                      <p className="text-white font-semibold">{selectedApp.character_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Age</p>
                      <p className="text-white font-semibold">{selectedApp.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Discord User</p>
                      <p className="text-white font-semibold">{selectedApp.discord_username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Applied</p>
                      <p className="text-white font-semibold">
                        {new Date(selectedApp.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Character Backstory</p>
                    <div className="bg-gray-800/50 p-3 rounded-lg max-h-32 overflow-y-auto">
                      <p className="text-white text-sm">{selectedApp.character_backstory}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Why Join</p>
                    <div className="bg-gray-800/50 p-3 rounded-lg max-h-24 overflow-y-auto">
                      <p className="text-white text-sm">{selectedApp.why_join}</p>
                    </div>
                  </div>

                  {selectedApp.previous_rp_experience && (
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Previous RP Experience</p>
                      <div className="bg-gray-800/50 p-3 rounded-lg max-h-24 overflow-y-auto">
                        <p className="text-white text-sm">{selectedApp.previous_rp_experience}</p>
                      </div>
                    </div>
                  )}

                  {selectedApp.status === "pending" && (
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Admin Notes (optional)</p>
                      <Textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="Add notes about this application..."
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                        rows={3}
                      />
                    </div>
                  )}

                  {selectedApp.status === "pending" && (
                    <div className="flex gap-4">
                      <Button
                        onClick={() => handleStatusUpdate(selectedApp.id, "approved")}
                        disabled={processing}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleStatusUpdate(selectedApp.id, "rejected")}
                        disabled={processing}
                        className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {selectedApp.status !== "pending" && (
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        {selectedApp.status === "approved" ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <Badge className={selectedApp.status === "approved" ? "bg-green-600" : "bg-red-600"}>
                          {selectedApp.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">
                        Reviewed by {selectedApp.reviewed_by} on{" "}
                        {new Date(selectedApp.reviewed_at).toLocaleDateString()}
                      </p>
                      {selectedApp.admin_notes && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-400">Admin Notes:</p>
                          <p className="text-white text-sm">{selectedApp.admin_notes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Select an application to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
