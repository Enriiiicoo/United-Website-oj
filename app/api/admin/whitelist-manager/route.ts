import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { executeQuery, queryRow } from "@/lib/mysql"
import { isAdmin } from "@/lib/admin"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId || !isAdmin(session.user.discordId)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // Get whitelist entries with verification status
    const whitelist = await executeQuery(`
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
        END as verification_status,
        FALSE as is_online
      FROM mta_whitelist w
      LEFT JOIN website_users u ON w.discord_id = u.discord_id
      LEFT JOIN mta_verifications v ON w.discord_id = v.discord_id
      LEFT JOIN permanent_verifications pv ON w.discord_id = pv.discord_id
      ORDER BY w.added_at DESC
    `)

    // Get applications
    const applications = await executeQuery(`
      SELECT 
        wa.*,
        u.discord_username
      FROM whitelist_applications wa
      LEFT JOIN website_users u ON wa.discord_id = u.discord_id
      ORDER BY wa.submitted_at DESC
    `)

    // Calculate stats
    const stats = {
      total: Array.isArray(whitelist) ? whitelist.length : 0,
      verified: Array.isArray(whitelist)
        ? whitelist.filter((w: any) => w.verification_status === "verified").length
        : 0,
      expired: Array.isArray(whitelist) ? whitelist.filter((w: any) => w.verification_status === "expired").length : 0,
      pending: Array.isArray(whitelist) ? whitelist.filter((w: any) => w.verification_status === "pending").length : 0,
      online: 0, // TODO: Implement real-time online status
      applications: Array.isArray(applications) ? applications.length : 0,
    }

    return NextResponse.json({
      whitelist: whitelist || [],
      applications: applications || [],
      stats,
    })
  } catch (error) {
    console.error("Error fetching whitelist data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId || !isAdmin(session.user.discordId)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { mta_serial, discord_id, discord_username } = await request.json()

    // Validate MTA serial (32 hex characters)
    if (!mta_serial || !/^[a-fA-F0-9]{32}$/.test(mta_serial)) {
      return NextResponse.json({ error: "Invalid MTA serial - must be 32 hexadecimal characters" }, { status: 400 })
    }

    // Validate Discord ID (17-20 digits)
    if (!discord_id || !/^\d{17,20}$/.test(discord_id)) {
      return NextResponse.json({ error: "Invalid Discord ID - must be 17-20 digits" }, { status: 400 })
    }

    // Check if already whitelisted
    const existing = await queryRow("SELECT mta_serial FROM mta_whitelist WHERE mta_serial = ?", [mta_serial])
    if (existing) {
      return NextResponse.json({ error: "MTA serial already whitelisted" }, { status: 409 })
    }

    // Add to whitelist
    await executeQuery("INSERT INTO mta_whitelist (mta_serial, discord_id, added_by) VALUES (?, ?, ?)", [
      mta_serial,
      discord_id,
      session.user.discordUsername || session.user.name || "Admin",
    ])

    // Update website user if exists
    if (discord_username) {
      await executeQuery("UPDATE website_users SET discord_username = ? WHERE discord_id = ?", [
        discord_username,
        discord_id,
      ])
    }

    return NextResponse.json({ message: "Player added to whitelist successfully" })
  } catch (error) {
    console.error("Error adding to whitelist:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId || !isAdmin(session.user.discordId)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { mta_serial } = await request.json()

    if (!mta_serial) {
      return NextResponse.json({ error: "MTA serial is required" }, { status: 400 })
    }

    // Remove from whitelist
    const result = await executeQuery("DELETE FROM mta_whitelist WHERE mta_serial = ?", [mta_serial])

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "MTA serial not found in whitelist" }, { status: 404 })
    }

    return NextResponse.json({ message: "Player removed from whitelist successfully" })
  } catch (error) {
    console.error("Error removing from whitelist:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
