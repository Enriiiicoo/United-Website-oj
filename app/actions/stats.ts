"use server"

import { executeQuery } from "@/lib/db"

export async function getServerStats() {
  try {
    const query = "SELECT * FROM server_stats ORDER BY last_updated DESC LIMIT 1"
    const [stats] = (await executeQuery(query)) as any[]

    return {
      onlinePlayers: stats?.online_players || 45,
      maxPlayers: stats?.max_players || 100,
      uptime: stats?.uptime_percentage || 99.9,
    }
  } catch (error) {
    console.error("Error fetching server stats:", error)
    return {
      onlinePlayers: 45,
      maxPlayers: 100,
      uptime: 99.9,
    }
  }
}

export async function updateServerStats(onlinePlayers: number) {
  try {
    const query = `
      UPDATE server_stats 
      SET online_players = ?, last_updated = CURRENT_TIMESTAMP 
      WHERE id = 1
    `
    await executeQuery(query, [onlinePlayers])
    return { success: true }
  } catch (error) {
    console.error("Error updating server stats:", error)
    return { success: false }
  }
}
