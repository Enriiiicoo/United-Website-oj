import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { validateEnvironmentVariables } from "@/lib/env"
import mysql from "mysql2/promise"

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables at runtime
    validateEnvironmentVariables()

    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { discordId, discordUsername } = await request.json()

    if (!discordId || !discordUsername) {
      return NextResponse.json({ error: "Discord ID and username are required" }, { status: 400 })
    }

    // Create database connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    try {
      // Check if Discord account is already linked to another game account
      const [existingLinks] = await connection.execute("SELECT * FROM discord_links WHERE discord_id = ?", [discordId])

      const links = existingLinks as any[]
      if (links.length > 0) {
        return NextResponse.json(
          { error: "Discord account is already linked to another game account" },
          { status: 409 },
        )
      }

      // Check if this game account is already linked to another Discord account
      const [existingGameLinks] = await connection.execute("SELECT * FROM discord_links WHERE account_id = ?", [
        session.user.gameAccountId,
      ])

      const gameLinks = existingGameLinks as any[]
      if (gameLinks.length > 0) {
        return NextResponse.json(
          { error: "Game account is already linked to another Discord account" },
          { status: 409 },
        )
      }

      // Create the link using the authenticated user's game account
      await connection.execute(
        "INSERT INTO discord_links (discord_id, discord_username, account_id, account_username, linked_at) VALUES (?, ?, ?, ?, NOW())",
        [discordId, discordUsername, session.user.gameAccountId, session.user.username],
      )

      return NextResponse.json({
        success: true,
        message: "Discord account linked successfully",
        gameAccount: {
          id: session.user.gameAccountId,
          username: session.user.username,
        },
        discordAccount: {
          id: discordId,
          username: discordUsername,
        },
      })
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error("Link account error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
