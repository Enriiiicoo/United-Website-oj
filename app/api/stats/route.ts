import { executeQuery } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = (await executeQuery(
      "SELECT online_players, max_players, uptime_percentage FROM server_stats ORDER BY last_updated DESC LIMIT 1",
    )) as any[]

    if (result && result.length > 0) {
      const stats = result[0]
      return NextResponse.json({
        onlinePlayers: stats.online_players,
        maxPlayers: stats.max_players,
        uptime: stats.uptime_percentage,
      })
    }

    // Return default values if no stats found
    return NextResponse.json({
      onlinePlayers: 45,
      maxPlayers: 100,
      uptime: 99.9,
    })
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json({ error: "Failed to fetch server stats" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { onlinePlayers, maxPlayers, uptime } = await request.json()

    await executeQuery(
      "UPDATE server_stats SET online_players = ?, max_players = ?, uptime_percentage = ? WHERE id = 1",
      [onlinePlayers, maxPlayers, uptime],
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Stats update error:", error)
    return NextResponse.json({ error: "Failed to update server stats" }, { status: 500 })
  }
}
