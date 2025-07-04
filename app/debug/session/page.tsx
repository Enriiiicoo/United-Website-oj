"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function SessionDebugPage() {
  const { data: session, status } = useSession()
  const [serverSession, setServerSession] = useState(null)
  const [loading, setLoading] = useState(false)

  const refreshServerSession = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/session-refresh")
      const data = await response.json()
      setServerSession(data)
    } catch (error) {
      console.error("Failed to refresh session:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshServerSession()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto pt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Session Debug Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Client Session Status: {status}</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(session, null, 2)}</pre>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold">Server Session</h3>
                <Button onClick={refreshServerSession} disabled={loading} size="sm" variant="outline">
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(serverSession, null, 2)}
              </pre>
            </div>

            <div className="space-y-2">
              <Button onClick={() => (window.location.href = "/auth/signin")}>Go to Sign In</Button>
              <Button onClick={() => (window.location.href = "/dashboard")}>Go to Dashboard</Button>
              <Button onClick={() => (window.location.href = "/")}>Go to Home</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
