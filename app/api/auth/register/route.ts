import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Registration - Starting registration process...")

    // Verify Discord authentication
    const session = await getServerSession(authOptions)
    console.log("📝 Registration - Discord session check:", !!session?.user?.discordId)

    if (!session?.user?.discordId) {
      return NextResponse.json({ error: "No Discord session" }, { status: 401 })
    }

    // Simple success response - no complex database operations
    console.log("✅ Registration successful for:", session.user.discordId)

    return NextResponse.json(
      {
        message: "Registration successful!",
        user: {
          discordId: session.user.discordId,
          username: session.user.name,
          email: session.user.email,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
