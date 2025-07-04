import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { discordId, gameUsername, gamePassword } = await request.json()

    if (!discordId || !gameUsername || !gamePassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if Discord ID is already linked
    const existingLink = await db.query("SELECT * FROM discord_links WHERE discord_id = ?", [discordId])

    if (existingLink.length > 0) {
      return NextResponse.json({ error: "Discord account already linked" }, { status: 400 })
    }

    // Insert the new link
    await db.query(
      "INSERT INTO discord_links (discord_id, game_username, game_password, created_at) VALUES (?, ?, ?, NOW())",
      [discordId, gameUsername, gamePassword],
    )

    return NextResponse.json({ success: true, message: "Account linked successfully" })
  } catch (error) {
    console.error("Link account error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
