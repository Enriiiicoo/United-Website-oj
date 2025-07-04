import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { executeQuery, queryRow } from "@/lib/mysql"
import { verifyGameCredentials, checkAccountAlreadyLinked } from "@/lib/game-auth"

export async function POST(request: NextRequest) {
  try {
    // Verify the user is authenticated
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId) {
      return NextResponse.json({ message: "Discord authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { username, email, gameUsername, gamePassword } = body

    // Replace validation
    if (!username || !email || !gameUsername || !gamePassword) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Add game account verification before checking existing users
    console.log("🔍 Verifying game credentials for:", gameUsername)
    const gameAccount = await verifyGameCredentials(gameUsername, gamePassword)

    if (!gameAccount) {
      return NextResponse.json(
        {
          message: "Invalid game credentials. Please check your username and password.",
        },
        { status: 401 },
      )
    }

    // Check if game account is already linked
    const isAlreadyLinked = await checkAccountAlreadyLinked(gameAccount.id)
    if (isAlreadyLinked) {
      return NextResponse.json(
        {
          message: "This game account is already linked to another Discord account.",
        },
        { status: 409 },
      )
    }

    // Verify email matches (optional - you can remove this if emails don't need to match)
    if (gameAccount.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json(
        {
          message: "Email must match your game account email.",
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await queryRow(
      "SELECT id FROM website_users WHERE discord_id = ? OR email = ? OR username = ?",
      [session.user.discordId, email, username],
    )

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this Discord, email, or username" },
        { status: 409 },
      )
    }

    // Replace the INSERT query to include account_id
    const insertResult = await executeQuery(
      `INSERT INTO website_users 
       (username, email, discord_id, discord_username, account_id, avatar_url, is_verified) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        username,
        email,
        session.user.discordId,
        session.user.discordUsername || session.user.name,
        gameAccount.id,
        session.user.image || null,
        true, // Discord verified
      ],
    )

    // Get the inserted user ID
    const userId = (insertResult as any).insertId

    // Log the verification
    await executeQuery(
      "INSERT INTO verification_logs (user_id, verification_type, status, verified_at) VALUES (?, ?, ?, NOW())",
      [userId, "discord", "verified"],
    )

    // Add account verification log
    await executeQuery(
      "INSERT INTO verification_logs (user_id, verification_type, status, verified_at) VALUES (?, ?, ?, NOW())",
      [userId, "account", "verified"],
    )

    console.log("✅ New user registered and linked to game account:", {
      id: userId,
      username,
      email,
      discordId: session.user.discordId,
      gameAccountId: gameAccount.id,
      gameUsername: gameAccount.username,
    })

    return NextResponse.json(
      {
        message: "Account created and linked successfully!",
        user: {
          id: userId,
          username,
          email,
          discordId: session.user.discordId,
          gameAccount: {
            id: gameAccount.id,
            username: gameAccount.username,
            email: gameAccount.email,
          },
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)

    // Handle specific MySQL errors
    if (error instanceof Error) {
      if (error.message.includes("Duplicate entry")) {
        return NextResponse.json({ message: "User already exists" }, { status: 409 })
      }
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
