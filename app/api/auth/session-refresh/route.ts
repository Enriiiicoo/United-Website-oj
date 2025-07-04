import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    console.log("🔍 Session Refresh - Current session:", JSON.stringify(session, null, 2))

    return NextResponse.json({
      session: session || null,
      authenticated: !!session?.user?.discordId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Session Refresh - Error:", error)
    return NextResponse.json({ error: "Failed to refresh session" }, { status: 500 })
  }
}
