import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { queryRow } from "@/lib/mysql"

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Profile API - Getting session...")
    const session = await getServerSession(authOptions)
    console.log("📝 Profile API - Session:", JSON.stringify(session, null, 2))

    if (!session?.user?.discordId) {
      console.log("❌ Profile API - No Discord ID in session")
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    console.log("🔍 Profile API - Querying database for Discord ID:", session.user.discordId)

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

    console.log("📝 Profile API - Database result:", JSON.stringify(user, null, 2))

    if (!user) {
      console.log("❌ Profile API - User not found in database")
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    console.log("✅ Profile API - User found, returning profile")
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
    console.error("❌ Profile API - Error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
