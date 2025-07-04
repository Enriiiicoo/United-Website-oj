import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { executeQuery } from "@/lib/mysql"
import { isAdmin } from "@/lib/admin"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!isAdmin(session?.user?.discordId)) {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const { title, description, imageUrl, category } = body

    if (!title || !imageUrl || !category) {
      return NextResponse.json({ message: "Title, image URL, and category are required" }, { status: 400 })
    }

    await executeQuery(
      `INSERT INTO gallery_photos 
       (title, description, image_url, category, uploaded_by_discord_id, uploaded_by_username, status) 
       VALUES (?, ?, ?, ?, ?, ?, 'approved')`,
      [
        title,
        description || "",
        imageUrl,
        category,
        session.user.discordId,
        session.user.discordUsername || session.user.name,
      ],
    )

    return NextResponse.json({ message: "Photo uploaded successfully!" })
  } catch (error) {
    console.error("Gallery upload error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
