import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { executeQuery, queryRow } from "@/lib/mysql"
import { verifyGameCredentials, checkAccountAlreadyLinked } from "@/lib/game-auth"

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Registration - Starting registration process...")

    // Verify the user is authenticated
    const session = await getServerSession(authOptions)
    console.log("📝 Registration - Session check:", !!session?.user?.discordId)

    if (!session?.user?.discordId) {
      return NextResponse.json({ message: "Discord authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { username, email, gameUsername, gamePassword } = body
    console.log("📝 Registration - Form data received:", { username, email, gameUsername, hasPassword: !!gamePassword })

    // Validation
    if (!username || !email || !gameUsername || !gamePassword) {
      console.log("❌ Registration - Missing required fields")
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Game account verification
    console.log("🔍 Registration - Starting game credential verification...")
    const gameAccount = await verifyGameCredentials(gameUsername, gamePassword)

    if (!gameAccount) {
      console.log("❌ Registration - Game credential verification failed")
      return NextResponse.json(
        {
          message: "Invalid game credentials. Please check your username and password.",
          debug: "Game account not found or password incorrect",
        },
        { status: 401 },
      )
    }

    console.log("✅ Registration - Game credentials verified for account ID:", gameAccount.id)

    // Check if game account is already linked
    const isAlreadyLinked = await checkAccountAlreadyLinked(gameAccount.id)
    if (isAlreadyLinked) {
      console.log("❌ Registration - Game account already linked")
      return NextResponse.json(
        {
          message: "This game account is already linked to another Discord account.",
        },
        { status: 409 },
      )
    }

    // Email verification (optional)
    if (gameAccount.email.toLowerCase() !== email.toLowerCase()) {
      console.log("❌ Registration - Email mismatch")
      console.log("📝 Registration - Game email:", gameAccount.email)
      console.log("📝 Registration - Provided email:", email)
      return NextResponse.json(
        {
          message: "Email must match your game account email.",
          debug: `Game account email: ${gameAccount.email}, Provided: ${email}`,
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    console.log("🔍 Registration - Checking for existing users...")
    const existingUser = await queryRow(
      "SELECT id FROM website_users WHERE discord_id = ? OR email = ? OR username = ?",
      [session.user.discordId, email, username],
    )

    if (existingUser) {
      console.log("❌ Registration - User already exists")
      return NextResponse.json(
        { message: "User already exists with this Discord, email, or username" },
        { status: 409 },
      )
    }

    // Create new user
    console.log("🔍 Registration - Creating new user...")
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

    const userId = (insertResult as any).insertId
    console.log("✅ Registration - User created with ID:", userId)

    // Log verifications
    await executeQuery(
      "INSERT INTO verification_logs (user_id, verification_type, status, verified_at) VALUES (?, ?, ?, NOW())",
      [userId, "discord", "verified"],
    )

    await executeQuery(
      "INSERT INTO verification_logs (user_id, verification_type, status, verified_at) VALUES (?, ?, ?, NOW())",
      [userId, "account", "verified"],
    )

    console.log("✅ Registration - Complete success!")

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
    console.error("❌ Registration - Fatal error:", error)

    if (error instanceof Error) {
      if (error.message.includes("Duplicate entry")) {
        return NextResponse.json({ message: "User already exists" }, { status: 409 })
      }
    }

    return NextResponse.json(
      {
        message: "Internal server error",
        debug: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
