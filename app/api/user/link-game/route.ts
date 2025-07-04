import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { executeQuery, queryRow } from "@/lib/mysql"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { gameCharacterId } = body

    if (!gameCharacterId) {
      return NextResponse.json({ message: "Game character ID is required" }, { status: 400 })
    }

    // Get user from database
    const user = await queryRow("SELECT id FROM website_users WHERE discord_id = ?", [session.user.discordId])

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Update user with game character ID
    await executeQuery("UPDATE website_users SET game_character_id = ?, updated_at = NOW() WHERE id = ?", [
      gameCharacterId,
      user.id,
    ])

    // Optional: Verify the game character exists in your game database
    // const gameCharacter = await queryRow(
    //   'SELECT * FROM your_game_users_table WHERE id = ?',
    //   [gameCharacterId]
    // )

    console.log("✅ Game account linked:", {
      userId: user.id,
      gameCharacterId,
      discordId: session.user.discordId,
    })

    return NextResponse.json({
      message: "Game account linked successfully!",
      gameCharacterId,
    })
  } catch (error) {
    console.error("Game linking error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
