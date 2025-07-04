"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export function SetupGuide() {
  const [copiedSecret, setCopiedSecret] = useState(false)

  const generateSecret = () => {
    // Generate a random 32-byte hex string
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
  }

  const copySecret = async () => {
    const secret = generateSecret()
    await navigator.clipboard.writeText(`NEXTAUTH_SECRET=${secret}`)
    setCopiedSecret(true)
    setTimeout(() => setCopiedSecret(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🔐 Generate NEXTAUTH_SECRET</CardTitle>
          <CardDescription>
            Click the button below to generate a secure NEXTAUTH_SECRET and copy it to your clipboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={copySecret} className="w-full">
            {copiedSecret ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Generate & Copy NEXTAUTH_SECRET
              </>
            )}
          </Button>
          <p className="text-sm text-gray-600 mt-2">After copying, paste it into your .env.local file</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📝 Your .env.local file should look like this:</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name

# Discord OAuth (get from Discord Developer Portal)
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_here

# JWT Secret (optional, for custom operations)
JWT_SECRET=another_generated_secret_here`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🎮 Discord OAuth Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            1. Go to{" "}
            <a
              href="https://discord.com/developers/applications"
              target="_blank"
              className="text-blue-600 underline"
              rel="noreferrer"
            >
              Discord Developer Portal
            </a>
          </p>
          <p>2. Create a new application</p>
          <p>3. Go to OAuth2 → General</p>
          <p>
            4. Add redirect URL:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000/api/auth/callback/discord</code>
          </p>
          <p>5. Copy Client ID and Client Secret to your .env.local</p>
        </CardContent>
      </Card>
    </div>
  )
}
