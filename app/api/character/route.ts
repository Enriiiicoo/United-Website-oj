import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { queryRow } from "@/lib/mysql"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    // Get user's account ID from website_users table
    const user = await queryRow("SELECT account_id FROM website_users WHERE discord_id = ?", [session.user.discordId])

    if (!user?.account_id) {
      return NextResponse.json({ character: null, message: "No game account linked" })
    }

    // Get character data
    const character = await queryRow(
      `SELECT id, charactername, money, bankmoney, hoursplayed, age, gender, 
              skin, weight, height, description, faction_id, faction_rank, 
              lastlogin, creationdate, active
       FROM characters 
       WHERE account = ? AND active = 1 
       ORDER BY lastlogin DESC 
       LIMIT 1`,
      [user.account_id],
    )

    if (!character) {
      return NextResponse.json({ character: null, message: "No character found" })
    }

    return NextResponse.json({
      character: {
        id: character.id,
        name: character.charactername,
        money: character.money,
        bankMoney: character.bankmoney,
        hoursPlayed: character.hoursplayed,
        age: character.age,
        gender: character.gender === 0 ? "Male" : "Female",
        skin: character.skin,
        weight: character.weight,
        height: character.height,
        description: character.description,
        factionId: character.faction_id,
        factionRank: character.faction_rank,
        lastLogin: character.lastlogin,
        creationDate: character.creationdate,
        active: character.active,
      },
    })
  } catch (error) {
    console.error("Character fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
