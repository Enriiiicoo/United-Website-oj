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

    const applications = await executeQuery(`SELECT * FROM whitelist_applications ORDER BY created_at DESC`)

    return NextResponse.json({ applications })
  } catch (error) {
    console.error("Admin whitelist fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!isAdmin(session?.user?.discordId)) {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const { applicationId, status, adminNotes } = body

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 })
    }

    await executeQuery(
      `UPDATE whitelist_applications 
       SET status = ?, admin_notes = ?, reviewed_by = ?, reviewed_at = NOW() 
       WHERE id = ?`,
      [status, adminNotes || "", session.user.discordUsername || session.user.name, applicationId],
    )

    return NextResponse.json({ message: "Application updated successfully" })
  } catch (error) {
    console.error("Admin whitelist update error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
