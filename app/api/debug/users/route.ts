import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/mysql"

export async function GET() {
  try {
    // Get all website users (limit to 10 for safety)
    const users = await executeQuery(
      "SELECT id, username, email, discord_id, account_id, created_at FROM website_users ORDER BY created_at DESC LIMIT 10",
    )

    return NextResponse.json({
      users,
      count: Array.isArray(users) ? users.length : 0,
    })
  } catch (error) {
    console.error("Debug users error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}
