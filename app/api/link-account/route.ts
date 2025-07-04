import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { executeQuery } from "@/lib/db"
import crypto from "crypto"
import { validateEnvironmentVariables } from "@/lib/env"

function hashPassword(password: string, salt: string): string {
  return crypto
    .createHash("md5")
    .update(password + salt)
    .digest("hex")
}

export async function POST(request: NextRequest) {
  // ensure required env-vars exist – only at runtime, not during build
  validateEnvironmentVariables()

  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Check if the game account exists and verify credentials
    const accountResult = (await executeQuery("SELECT id, username, password, salt FROM accounts WHERE username = ?", [
      username,
    ])) as any[]

    if (accountResult.length === 0) {
      return NextResponse.json({ error: "Game account not found" }, { status: 404 })
    }

    const account = accountResult[0]
    const hashedPassword = hashPassword(password, account.salt)

    if (hashedPassword !== account.password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    // Check if this game account is already linked to another Discord account
    const existingLinkResult = (await executeQuery("SELECT discord_id FROM users WHERE linked_account_id = ?", [
      account.id,
    ])) as any[]

    if (existingLinkResult.length > 0 && existingLinkResult[0].discord_id !== session.user.discordId) {
      return NextResponse.json(
        {
          error: "This game account is already linked to another Discord account",
        },
        { status: 409 },
      )
    }

    // Link the accounts
    await executeQuery(
      `UPDATE users 
       SET linked_account_id = ?, linked_username = ?, linked_at = CURRENT_TIMESTAMP 
       WHERE discord_id = ?`,
      [account.id, account.username, session.user.discordId],
    )

    return NextResponse.json({
      message: "Account linked successfully!",
      linkedUsername: account.username,
    })
  } catch (error) {
    console.error("Account linking error:", error)
    return NextResponse.json(
      {
        error: "An error occurred while linking your account",
      },
      { status: 500 },
    )
  }
}
