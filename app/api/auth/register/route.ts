import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { executeQuery, queryRow } from "@/lib/mysql"

export async function POST(request: NextRequest) {
  try {
    // Verify the user is authenticated
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId) {
      return NextResponse.json({ message: "Discord authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { username, email, gameId } = body

    // Validate required fields
    if (!username || !email) {
      return NextResponse.json({ message: "Username and email are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await queryRow(
      "SELECT id FROM website_users WHERE discord_id = ? OR email = ? OR username = ?",
      [session.user.discordId, email, username],
    )

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this Discord, email, or username" },
        { status: 409 },
      )
    }

    // Insert new user
    const insertResult = await executeQuery(
      `INSERT INTO website_users 
       (username, email, discord_id, discord_username, game_character_id, avatar_url, is_verified) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        username,
        email,
        session.user.discordId,
        session.user.discordUsername || session.user.name,
        gameId || null,
        session.user.image || null,
        true, // Discord verified
      ],
    )

    // Get the inserted user ID
    const userId = (insertResult as any).insertId

    // Log the verification
    await executeQuery(
      "INSERT INTO verification_logs (user_id, verification_type, status, verified_at) VALUES (?, ?, ?, NOW())",
      [userId, "discord", "verified"],
    )

    console.log("✅ New user registered:", {
      id: userId,
      username,
      email,
      discordId: session.user.discordId,
    })

    return NextResponse.json(
      {
        message: "Account created successfully!",
        user: {
          id: userId,
          username,
          email,
          discordId: session.user.discordId,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)

    // Handle specific MySQL errors
    if (error instanceof Error) {
      if (error.message.includes("Duplicate entry")) {
        return NextResponse.json({ message: "User already exists" }, { status: 409 })
      }
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
