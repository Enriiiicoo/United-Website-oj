import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { validateEnvironmentVariables } from "@/lib/env"
import mysql from "mysql2/promise"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables at runtime
    validateEnvironmentVariables()

    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { gameUsername, gamePassword } = await request.json()

    if (!gameUsername || !gamePassword) {
      return NextResponse.json({ error: "Game username and password are required" }, { status: 400 })
    }

    // Use Discord ID from session automatically
    const discordId = session.user.discordId

    // Create database connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })

    try {
      // Check if game account exists and password is correct
      const [rows] = await connection.execute("SELECT id, username, password, salt FROM accounts WHERE username = ?", [
        gameUsername,
      ])

      const accounts = rows as any[]
      if (accounts.length === 0) {
        return NextResponse.json({ error: "Game account not found" }, { status: 404 })
      }

      const account = accounts[0]

      // Verify password (assuming MD5 with salt)
      const hashedPassword = crypto
        .createHash("md5")
        .update(gamePassword + account.salt)
        .digest("hex")

      if (hashedPassword !== account.password) {
        return NextResponse.json({ error: "Invalid game password" }, { status: 401 })
      }

      // Check if Discord account is already linked to another game account
      const [existingLinks] = await connection.execute("SELECT * FROM discord_links WHERE discord_id = ?", [discordId])

      const links = existingLinks as any[]
      if (links.length > 0) {
        return NextResponse.json({ error: "Discord account is already linked to a game account" }, { status: 409 })
      }

      // Create the link
      await connection.execute("INSERT INTO discord_links (discord_id, account_id, linked_at) VALUES (?, ?, NOW())", [
        discordId,
        account.id,
      ])

      return NextResponse.json({
        success: true,
        message: "Account linked successfully",
        gameAccount: {
          id: account.id,
          username: account.username,
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
