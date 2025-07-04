import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { executeQuery } from "@/lib/mysql"

export async function GET() {
  try {
    console.log("🔍 Debug Auth API - Getting session...")
    const session = await getServerSession(authOptions)

    console.log("📝 Debug Auth API - Session:", JSON.stringify(session, null, 2))

    // Get all website users
    const users = await executeQuery(
      "SELECT id, username, email, discord_id, discord_username, account_id, created_at FROM website_users ORDER BY created_at DESC LIMIT 10",
    )

    // Get environment variables (safely)
    const envCheck = {
      hasDiscordClientId: !!process.env.DISCORD_CLIENT_ID,
      hasDiscordClientSecret: !!process.env.DISCORD_CLIENT_SECRET,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      nodeEnv: process.env.NODE_ENV,
    }

    return NextResponse.json({
      session: session || null,
      users: users || [],
      environment: envCheck,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Debug Auth API - Error:", error)
    return NextResponse.json(
      {
        error: "Database error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
