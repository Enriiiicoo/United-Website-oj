import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { executeQuery } from "@/lib/mysql"
import { isAdmin } from "@/lib/admin"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!isAdmin(session?.user?.discordId)) {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    // Get whitelist with verification status
    const whitelist = await executeQuery(`
      SELECT 
        w.mta_serial,
        w.discord_id,
        w.added_by,
        w.added_at,
        u.discord_username,
        CASE 
          WHEN v.expires_at IS NULL THEN 'none'
          WHEN v.expires_at > NOW() THEN 'verified'
          ELSE 'expired'
        END as verification_status,
        v.expires_at as verification_expires,
        FALSE as is_online
      FROM mta_whitelist w
      LEFT JOIN users u ON w.discord_id = u.discord_id
      LEFT JOIN mta_verifications v ON w.discord_id = v.discord_id
      ORDER BY w.added_at DESC
    `)

    // Get stats
    const statsQuery = await executeQuery(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN v.expires_at > NOW() THEN 1 ELSE 0 END) as verified,
        SUM(CASE WHEN v.expires_at IS NOT NULL AND v.expires_at <= NOW() THEN 1 ELSE 0 END) as expired,
        SUM(CASE WHEN v.expires_at IS NULL THEN 1 ELSE 0 END) as pending,
        0 as online
      FROM mta_whitelist w
      LEFT JOIN mta_verifications v ON w.discord_id = v.discord_id
    `)

    const stats = statsQuery[0] || { total: 0, verified: 0, expired: 0, pending: 0, online: 0 }

    return NextResponse.json({ whitelist, stats })
  } catch (error) {
    console.error("Whitelist manager fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!isAdmin(session?.user?.discordId)) {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const { mta_serial, discord_id } = body

    // Validate MTA serial format (32 hex characters)
    if (!mta_serial || !/^[a-fA-F0-9]{32}$/.test(mta_serial)) {
      return NextResponse.json({ message: "Invalid MTA serial format" }, { status: 400 })
    }

    // Validate Discord ID format (17-20 digits)
    if (!discord_id || !/^\d{17,20}$/.test(discord_id)) {
      return NextResponse.json({ message: "Invalid Discord ID format" }, { status: 400 })
    }

    // Check if serial already exists
    const existing = await executeQuery("SELECT mta_serial FROM mta_whitelist WHERE mta_serial = ? LIMIT 1", [
      mta_serial.toLowerCase(),
    ])

    if (existing.length > 0) {
      return NextResponse.json({ message: "MTA serial already whitelisted" }, { status: 400 })
    }

    // Add to whitelist
    await executeQuery(
      `INSERT INTO mta_whitelist (mta_serial, discord_id, added_by, added_at) 
       VALUES (?, ?, ?, NOW())`,
      [mta_serial.toLowerCase(), discord_id, session.user.discordUsername || session.user.name],
    )

    return NextResponse.json({ message: "Player added to whitelist successfully" })
  } catch (error) {
    console.error("Whitelist add error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!isAdmin(session?.user?.discordId)) {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const { mta_serial } = body

    if (!mta_serial) {
      return NextResponse.json({ message: "MTA serial is required" }, { status: 400 })
    }

    // Remove from whitelist
    const result = await executeQuery("DELETE FROM mta_whitelist WHERE mta_serial = ?", [mta_serial.toLowerCase()])

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "MTA serial not found in whitelist" }, { status: 404 })
    }

    return NextResponse.json({ message: "Player removed from whitelist successfully" })
  } catch (error) {
    console.error("Whitelist remove error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
