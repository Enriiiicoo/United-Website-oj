import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { executeQuery, queryRow } from "@/lib/mysql";
import { createMTAPasswordHash, generateSalt } from "@/lib/game-auth";

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Registration - Starting registration process...");

    // Verify Discord authentication
    const session = await getServerSession(authOptions);
    console.log("📝 Registration - Discord session check:", !!session?.user?.discordId);

    if (!session?.user?.discordId) {
      return NextResponse.json({ message: "Discord authentication required" }, { status: 401 });
    }

    const body = await request.json();
    const { username, email, gameUsername, gamePassword } = body;
    console.log("📝 Registration - Form data received:", { username, email, gameUsername, hasPassword: !!gamePassword });

    // Validate input
    if (!username || !email || !gameUsername || !gamePassword) {
      console.log("❌ Registration - Missing required fields");
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Check if the game account username already exists in MTA accounts
    console.log("🔍 Registration - Checking if game account exists...");
    const existingGameAccount = await queryRow("SELECT id FROM accounts WHERE username = ?", [gameUsername]);

    if (existingGameAccount) {
      console.log("❌ Registration - Game account already exists");
      return NextResponse.json({ message: "Game account username already exists" }, { status: 409 });
    }

    // Create salt and hashed password
    const salt = generateSalt();
    const hashedPassword = createMTAPasswordHash(gamePassword, salt);

    console.log("🔍 Registration - Creating game account...");
    const gameAccountInsert = await executeQuery(
      `INSERT INTO accounts (username, password, salt, email, registerdate, activated)
       VALUES (?, ?, ?, ?, NOW(), 1)`,
      [gameUsername, hashedPassword, salt, email]
    );

    const gameAccountId = (gameAccountInsert as any).insertId;
    console.log("✅ Registration - Game account created with ID:", gameAccountId);

    // Check if website user already exists
    console.log("🔍 Registration - Checking for existing website user...");
    const existingUser = await queryRow(
      "SELECT id FROM website_users WHERE discord_id = ? OR email = ? OR username = ?",
      [session.user.discordId, email, username]
    );

    if (existingUser) {
      console.log("❌ Registration - Website user already exists");
      return NextResponse.json({ message: "User already exists with this Discord, email, or username" }, { status: 409 });
    }

    // Create new website user
    console.log("🔍 Registration - Creating website user...");
    const websiteUserInsert = await executeQuery(
      `INSERT INTO website_users 
       (username, email, discord_id, discord_username, account_id, avatar_url, is_verified) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        username,
        email,
        session.user.discordId,
        session.user.discordUsername || session.user.name,
        gameAccountId,
        session.user.image || null,
        true, // Discord verified
      ]
    );

    const websiteUserId = (websiteUserInsert as any).insertId;
    console.log("✅ Registration - Website user created with ID:", websiteUserId);

    // Log verification steps
    await executeQuery(
      "INSERT INTO verification_logs (user_id, verification_type, status, verified_at) VALUES (?, ?, ?, NOW())",
      [websiteUserId, "discord", "verified"]
    );

    await executeQuery(
      "INSERT INTO verification_logs (user_id, verification_type, status, verified_at) VALUES (?, ?, ?, NOW())",
      [websiteUserId, "account", "verified"]
    );

    console.log("✅ Registration - Full process completed!");

    return NextResponse.json(
      {
        message: "Account created and linked successfully!",
        user: {
          id: websiteUserId,
          username,
          email,
          discordId: session.user.discordId,
          gameAccount: {
            id: gameAccountId,
            username: gameUsername,
            email,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Registration - Fatal error:", error);

    if (error instanceof Error && error.message.includes("Duplicate entry")) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    return NextResponse.json(
      {
        message: "Internal server error",
        debug: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
