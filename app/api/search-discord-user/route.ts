import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    // Get Discord bot token and guild ID from environment
    const botToken = process.env.DISCORD_BOT_TOKEN
    const guildId = process.env.DISCORD_GUILD_ID

    if (!botToken || !guildId) {
      return NextResponse.json({ error: "Discord configuration missing" }, { status: 500 })
    }

    // Search for the user in the Discord server
    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch Discord members" }, { status: 500 })
    }

    const members = await response.json()

    // Find user by username (case insensitive)
    const foundMember = members.find(
      (member: any) =>
        member.user.username.toLowerCase() === username.toLowerCase() ||
        member.user.global_name?.toLowerCase() === username.toLowerCase() ||
        member.nick?.toLowerCase() === username.toLowerCase(),
    )

    if (!foundMember) {
      return NextResponse.json(
        {
          error: "Discord user not found in server",
          discordInvite: process.env.DISCORD_INVITE_URL || "https://discord.gg/your-server",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      discordId: foundMember.user.id,
      username: foundMember.user.username,
      displayName: foundMember.user.global_name || foundMember.nick || foundMember.user.username,
      avatar: foundMember.user.avatar
        ? `https://cdn.discordapp.com/avatars/${foundMember.user.id}/${foundMember.user.avatar}.png`
        : null,
    })
  } catch (error) {
    console.error("Discord search error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
