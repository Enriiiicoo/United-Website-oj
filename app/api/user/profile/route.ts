import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { queryRow } from "@/lib/mysql"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // Get user profile from database
    const user = await queryRow(
      `SELECT id, username, email, discord_id, discord_username, game_character_id, 
              avatar_url, is_verified, is_active, created_at 
       FROM website_users 
       WHERE discord_id = ?`,
      [session.user.discordId],
    )

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        discordId: user.discord_id,
        discordUsername: user.discord_username,
        gameCharacterId: user.game_character_id,
        avatarUrl: user.avatar_url,
        isVerified: user.is_verified,
        isActive: user.is_active,
        createdAt: user.created_at,
      },
    })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
