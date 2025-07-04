import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { executeQuery } from "@/lib/mysql"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { characterName, characterBackstory, age, previousRpExperience, whyJoin, rulesAcknowledged } = body

    // Validation
    if (!characterName || !characterBackstory || !age || !whyJoin) {
      return NextResponse.json({ message: "All required fields must be filled" }, { status: 400 })
    }

    if (age < 16 || age > 100) {
      return NextResponse.json({ message: "Age must be between 16 and 100" }, { status: 400 })
    }

    if (characterBackstory.length < 100) {
      return NextResponse.json({ message: "Character backstory must be at least 100 characters" }, { status: 400 })
    }

    if (whyJoin.length < 50) {
      return NextResponse.json({ message: "Why join section must be at least 50 characters" }, { status: 400 })
    }

    // Check if user already has an application
    const existingApplication = await executeQuery("SELECT id FROM whitelist_applications WHERE discord_id = ?", [
      session.user.discordId,
    ])

    if (Array.isArray(existingApplication) && existingApplication.length > 0) {
      return NextResponse.json({ message: "You already have a pending application" }, { status: 400 })
    }

    // Insert new application
    await executeQuery(
      `INSERT INTO whitelist_applications 
       (discord_id, discord_username, character_name, character_backstory, age, previous_rp_experience, why_join, rules_acknowledged) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        session.user.discordId,
        session.user.discordUsername || session.user.name,
        characterName,
        characterBackstory,
        age,
        previousRpExperience || "",
        whyJoin,
        rulesAcknowledged ? 1 : 0,
      ],
    )

    return NextResponse.json({ message: "Application submitted successfully!" })
  } catch (error) {
    console.error("Whitelist application error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
