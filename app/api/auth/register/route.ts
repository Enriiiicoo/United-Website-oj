import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { executeQuery, queryRow } from "@/lib/mysql"
import { createMTAPasswordHash, generateSalt } from "@/lib/game-auth"

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Registration - Starting registration process...")

    // Verify Discord authentication
    const session = await getServerSession(authOptions)
    console.log("📝 Registration - Discord session check:", !!session?.user?.discordId)

    if (!session?.user?.discordId) {
      return NextResponse.json(
        {
          error: "Discord authentication required",
          message: "Please authenticate with Discord first",
        },
        { status: 401 },
      )
    }

    const body = await request.json()
    const { username, email, gameUsername, gamePassword, gameCredentials } = body

    // Use session data if form data is missing
    const finalUsername = username || session.user.name || session.user.discordUsername
    const finalEmail = email || session.user.email

    console.log("📝 Registration - Processing for Discord ID:", session.user.discordId)
    console.log("📝 Registration - Username:", finalUsername)
    console.log("📝 Registration - Email:", finalEmail)

    // Check if website user already exists
    console.log("🔍 Registration - Checking for existing website user...")
    const existingUser = await queryRow("SELECT id FROM website_users WHERE discord_id = ?", [session.user.discordId])

    if (existingUser) {
      console.log("✅ Registration - User already exists, returning success")
      return NextResponse.json(
        {
          message: "User already exists",
          user: {
            id: existingUser.id,
            discordId: session.user.discordId,
            existing: true,
          },
        },
        { status: 200 },
      )
    }

    // Handle game credentials if provided
    let gameAccountId = null
    if (gameCredentials || (gameUsername && gamePassword)) {
      const credentials = gameCredentials || { username: gameUsername, password: gamePassword }

      console.log("🔍 Registration - Creating game account...")

      // Check if game account exists
      const existingGameAccount = await queryRow("SELECT id FROM accounts WHERE username = ?", [credentials.username])

      if (existingGameAccount) {
        return NextResponse.json(
          {
            error: "Game account already exists",
            message: "Game account username already exists",
          },
          { status: 409 },
        )
      }

      // Create game account
      const salt = generateSalt()
      const hashedPassword = createMTAPasswordHash(credentials.password, salt)

      const gameAccountInsert = await executeQuery(
        `INSERT INTO accounts (username, password, salt, email, registerdate, activated)
         VALUES (?, ?, ?, ?, NOW(), 1)`,
        [credentials.username, hashedPassword, salt, finalEmail],
      )

      gameAccountId = (gameAccountInsert as any).insertId
      console.log("✅ Registration - Game account created with ID:", gameAccountId)
    }

    // Create website user
    console.log("🔍 Registration - Creating website user...")
    const websiteUserInsert = await executeQuery(
      `INSERT INTO website_users 
       (username, email, discord_id, discord_username, account_id, avatar_url, is_verified, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        finalUsername,
        finalEmail,
        session.user.discordId,
        session.user.discordUsername || session.user.name,
        gameAccountId,
        session.user.image || null,
        true, // Discord verified
      ],
    )

    const websiteUserId = (websiteUserInsert as any).insertId
    console.log("✅ Registration - Website user created with ID:", websiteUserId)

    // Log verification
    await executeQuery(
      "INSERT INTO verification_logs (user_id, verification_type, status, verified_at) VALUES (?, ?, ?, NOW())",
      [websiteUserId, "discord", "verified"],
    )

    console.log("✅ Registration - Full process completed!")

    return NextResponse.json(
      {
        message: "Account created successfully!",
        user: {
          id: websiteUserId,
          username: finalUsername,
          email: finalEmail,
          discordId: session.user.discordId,
          gameAccount: gameAccountId
            ? {
                id: gameAccountId,
                username: gameCredentials?.username || gameUsername,
              }
            : null,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Registration - Fatal error:", error)

    return NextResponse.json(
      {
        error: "Registration failed",
        message: "An error occurred during registration. Please try again.",
        debug:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Unknown error"
            : undefined,
      },
      { status: 500 },
    )
  }
}
