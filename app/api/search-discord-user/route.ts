import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { username } = await request.json()

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    // Discord Bot Token and Guild ID should be in your environment variables
    const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
    const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID

    if (!DISCORD_BOT_TOKEN || !DISCORD_GUILD_ID) {
      return NextResponse.json({ error: "Discord configuration missing" }, { status: 500 })
    }

    // Search for the user in the Discord server using REST API
    // This works even when the bot is offline - it's just an API call
    const response = await fetch(`https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members?limit=1000`, {
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error("Discord API error:", response.status, await response.text())
      return NextResponse.json({ error: "Failed to fetch Discord server members" }, { status: 500 })
    }

    const members = await response.json()

    // Search for user by username, display name, or nickname (case-insensitive)
    const foundMember = members.find(
      (member: any) =>
        member.user.username.toLowerCase() === username.toLowerCase() ||
        member.user.global_name?.toLowerCase() === username.toLowerCase() ||
        member.nick?.toLowerCase() === username.toLowerCase(),
    )

    if (!foundMember) {
      return NextResponse.json({ error: "User not found in Discord server" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: foundMember.user.id,
        username: foundMember.user.username,
        globalName: foundMember.user.global_name,
        nickname: foundMember.nick,
        avatar: foundMember.user.avatar,
      },
    })
  } catch (error) {
    console.error("Search Discord user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
