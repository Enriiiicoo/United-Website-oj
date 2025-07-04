import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const botToken = process.env.DISCORD_BOT_TOKEN
    const guildId = process.env.DISCORD_GUILD_ID

    if (!botToken || !guildId) {
      return NextResponse.json({ error: "Discord configuration missing" }, { status: 500 })
    }

    // Search for the user in the Discord server
    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`, {
      headers: {
        Authorization: `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch Discord members" }, { status: 500 })
    }

    const members = await response.json()

    // Search for user by username or display name
    const foundUser = members.find(
      (member: any) =>
        member.user.username.toLowerCase() === username.toLowerCase() ||
        member.user.global_name?.toLowerCase() === username.toLowerCase() ||
        member.nick?.toLowerCase() === username.toLowerCase(),
    )

    if (!foundUser) {
      return NextResponse.json({ error: "User not found in Discord server" }, { status: 404 })
    }

    return NextResponse.json({
      discordId: foundUser.user.id,
      username: foundUser.user.username,
      displayName: foundUser.user.global_name || foundUser.nick || foundUser.user.username,
      avatar: foundUser.user.avatar
        ? `https://cdn.discordapp.com/avatars/${foundUser.user.id}/${foundUser.user.avatar}.png`
        : null,
    })
  } catch (error) {
    console.error("Discord search error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
