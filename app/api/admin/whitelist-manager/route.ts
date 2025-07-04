import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { executeQuery } from "@/lib/mysql"
import { isAdmin } from "@/lib/admin"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId || !isAdmin(session.user.discordId)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get whitelist entries with verification status
    const entries = await executeQuery(`
      SELECT 
        w.mta_serial,
        w.discord_id,
        w.added_by,
        w.added_at,
        u.discord_username,
        CASE 
          WHEN pv.discord_id IS NOT NULL THEN 'verified'
          WHEN v.expires_at > NOW() THEN 'verified'
          WHEN v.expires_at <= NOW() THEN 'expired'
          ELSE 'pending'
        END as verified_status,
        w.mta_serial as id
      FROM mta_whitelist w
      LEFT JOIN users u ON w.discord_id = u.discord_id
      LEFT JOIN mta_verifications v ON w.discord_id = v.discord_id
      LEFT JOIN permanent_verifications pv ON w.discord_id = pv.discord_id
      ORDER BY w.added_at DESC
    `)

    // Get stats
    const statsQuery = await executeQuery(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN pv.discord_id IS NOT NULL OR v.expires_at > NOW() THEN 1 ELSE 0 END) as verified,
        SUM(CASE WHEN v.expires_at <= NOW() AND pv.discord_id IS NULL THEN 1 ELSE 0 END) as expired,
        SUM(CASE WHEN v.discord_id IS NULL AND pv.discord_id IS NULL THEN 1 ELSE 0 END) as pending
      FROM mta_whitelist w
      LEFT JOIN mta_verifications v ON w.discord_id = v.discord_id
      LEFT JOIN permanent_verifications pv ON w.discord_id = pv.discord_id
    `)

    const stats =
      Array.isArray(statsQuery) && statsQuery.length > 0
        ? statsQuery[0]
        : {
            total: 0,
            verified: 0,
            expired: 0,
            pending: 0,
            online: 0,
          }

    return NextResponse.json({
      entries: Array.isArray(entries) ? entries : [],
      stats: {
        total: Number.parseInt(stats.total) || 0,
        verified: Number.parseInt(stats.verified) || 0,
        expired: Number.parseInt(stats.expired) || 0,
        pending: Number.parseInt(stats.pending) || 0,
        online: 0, // This would need to be fetched from MTA server
      },
    })
  } catch (error) {
    console.error("Whitelist manager GET error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId || !isAdmin(session.user.discordId)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { mta_serial, discord_id, discord_username } = body

    // Validation
    if (!mta_serial || !discord_id) {
      return NextResponse.json({ message: "MTA Serial and Discord ID are required" }, { status: 400 })
    }

    // Validate MTA serial format (32 hex chars)
    if (!/^[a-fA-F0-9]{32}$/.test(mta_serial)) {
      return NextResponse.json({ message: "Invalid MTA Serial format" }, { status: 400 })
    }

    // Validate Discord ID format (17-20 digits)
    if (!/^\d{17,20}$/.test(discord_id)) {
      return NextResponse.json({ message: "Invalid Discord ID format" }, { status: 400 })
    }

    // Check if serial or Discord ID already exists
    const existing = await executeQuery("SELECT mta_serial FROM mta_whitelist WHERE mta_serial = ? OR discord_id = ?", [
      mta_serial.toLowerCase(),
      discord_id,
    ])

    if (Array.isArray(existing) && existing.length > 0) {
      return NextResponse.json({ message: "Player already whitelisted" }, { status: 400 })
    }

    // Add to whitelist
    await executeQuery("INSERT INTO mta_whitelist (mta_serial, discord_id, added_by) VALUES (?, ?, ?)", [
      mta_serial.toLowerCase(),
      discord_id,
      session.user.discordUsername || session.user.name,
    ])

    // Update user's Discord username if provided
    if (discord_username) {
      await executeQuery("UPDATE users SET discord_username = ? WHERE discord_id = ?", [discord_username, discord_id])
    }

    return NextResponse.json({ message: "Player added to whitelist successfully" })
  } catch (error) {
    console.error("Whitelist manager POST error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId || !isAdmin(session.user.discordId)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id } = body // id is the mta_serial

    if (!id) {
      return NextResponse.json({ message: "MTA Serial is required" }, { status: 400 })
    }

    // Remove from whitelist
    const result = await executeQuery("DELETE FROM mta_whitelist WHERE mta_serial = ?", [id])

    return NextResponse.json({ message: "Player removed from whitelist successfully" })
  } catch (error) {
    console.error("Whitelist manager DELETE error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
