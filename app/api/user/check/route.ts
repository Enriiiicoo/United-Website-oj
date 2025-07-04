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

    // Check if user exists in database
    const user = await queryRow("SELECT id, username, email, account_id FROM website_users WHERE discord_id = ?", [
      session.user.discordId,
    ])

    if (user) {
      return NextResponse.json({
        exists: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          hasGameAccount: !!user.account_id,
        },
      })
    } else {
      return NextResponse.json({ exists: false })
    }
  } catch (error) {
    console.error("User check error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
