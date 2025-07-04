import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { validateEnvironmentVariables } from "@/lib/env"

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    validateEnvironmentVariables()

    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { discordId, discordUsername, gameUsername, gamePassword } = await request.json()

    if (!discordId || !gameUsername || !gamePassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if Discord ID is already linked
    const existingLink = await db.query("SELECT * FROM discord_links WHERE discord_id = ?", [discordId])

    if (existingLink.length > 0) {
      return NextResponse.json({ error: "Discord account is already linked" }, { status: 400 })
    }

    // Verify game account credentials (you'll need to implement this based on your game's authentication)
    // For now, we'll assume the credentials are valid
    const gameAccountValid = await verifyGameAccount(gameUsername, gamePassword)

    if (!gameAccountValid) {
      return NextResponse.json({ error: "Invalid game account credentials" }, { status: 400 })
    }

    // Create the link
    await db.query(
      "INSERT INTO discord_links (discord_id, discord_username, game_username, linked_at) VALUES (?, ?, ?, NOW())",
      [discordId, discordUsername, gameUsername],
    )

    return NextResponse.json({
      success: true,
      message: "Account linked successfully!",
    })
  } catch (error) {
    console.error("Link account error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Mock function - replace with your actual game authentication logic
async function verifyGameAccount(username: string, password: string): Promise<boolean> {
  // This is where you'd verify against your game's database or API
  // For now, we'll just check if the username and password are not empty
  return username.length > 0 && password.length > 0
}
