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
      `SELECT wu.id, wu.username, wu.email, wu.discord_id, wu.discord_username, wu.account_id,
          wu.avatar_url, wu.is_verified, wu.is_active, wu.created_at,
          a.username as game_username, a.email as game_email, a.registerdate as game_register_date
   FROM website_users wu
   LEFT JOIN accounts a ON wu.account_id = a.id
   WHERE wu.discord_id = ?`,
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
        avatarUrl: user.avatar_url,
        isVerified: user.is_verified,
        isActive: user.is_active,
        createdAt: user.created_at,
        gameAccount: user.account_id
          ? {
              id: user.account_id,
              username: user.game_username,
              email: user.game_email,
              registerDate: user.game_register_date,
            }
          : null,
      },
    })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
