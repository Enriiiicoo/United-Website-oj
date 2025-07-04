import { type NextRequest, NextResponse } from "next/server"
import { executeQuery, queryRow, testConnection } from "@/lib/mysql"
import { verifyGameCredentials } from "@/lib/game-auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password, testMode } = await request.json()

    console.log("🔍 Debug Game Auth - Starting debug for:", username)

    // Test database connection
    console.log("🔍 Debug Game Auth - Testing database connection...")
    const connectionTest = await testConnection()
    console.log("📝 Debug Game Auth - Connection test result:", connectionTest)

    if (!connectionTest) {
      return NextResponse.json(
        {
          error: "Database connection failed",
          details: "Cannot connect to MySQL database",
        },
        { status: 500 },
      )
    }

    // Check if accounts table exists
    console.log("🔍 Debug Game Auth - Checking accounts table...")
    const tableCheck = await executeQuery("SHOW TABLES LIKE 'accounts'")
    console.log("📝 Debug Game Auth - Accounts table exists:", Array.isArray(tableCheck) && tableCheck.length > 0)

    // Get table structure
    const tableStructure = await executeQuery("DESCRIBE accounts")
    console.log("📝 Debug Game Auth - Table structure:", tableStructure)

    // Search for the username (case-insensitive)
    console.log("🔍 Debug Game Auth - Searching for username...")
    const userSearch = await executeQuery(
      "SELECT id, username, email, LENGTH(password) as password_length, LENGTH(salt) as salt_length, registerdate FROM accounts WHERE username LIKE ?",
      [`%${username}%`],
    )
    console.log("📝 Debug Game Auth - User search results:", userSearch)

    // Get exact match
    const exactMatch = await queryRow(
      "SELECT id, username, email, password, salt, registerdate FROM accounts WHERE username = ?",
      [username],
    )
    console.log(
      "📝 Debug Game Auth - Exact match:",
      exactMatch
        ? {
            id: exactMatch.id,
            username: exactMatch.username,
            email: exactMatch.email,
            hasPassword: !!exactMatch.password,
            hasSalt: !!exactMatch.salt,
          }
        : "No exact match",
    )

    let verificationResult = null
    if (password && exactMatch) {
      console.log("🔍 Debug Game Auth - Testing password verification...")
      verificationResult = await verifyGameCredentials(username, password)
    }

    return NextResponse.json({
      success: true,
      debug: {
        connectionTest,
        tableExists: Array.isArray(tableCheck) && tableCheck.length > 0,
        tableStructure,
        userSearch,
        exactMatch: exactMatch
          ? {
              id: exactMatch.id,
              username: exactMatch.username,
              email: exactMatch.email,
              hasPassword: !!exactMatch.password,
              hasSalt: !!exactMatch.salt,
              passwordLength: exactMatch.password?.length,
              saltLength: exactMatch.salt?.length,
            }
          : null,
        verificationResult: verificationResult
          ? {
              success: true,
              accountId: verificationResult.id,
              username: verificationResult.username,
            }
          : { success: false },
      },
    })
  } catch (error) {
    console.error("❌ Debug Game Auth - Error:", error)
    return NextResponse.json(
      {
        error: "Debug failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // Test basic database connectivity
    const connectionTest = await testConnection()

    // Get some sample data (without passwords)
    const sampleAccounts = await executeQuery(
      "SELECT id, username, email, registerdate FROM accounts ORDER BY registerdate DESC LIMIT 5",
    )

    // Get table info
    const tableInfo = await executeQuery("SHOW TABLE STATUS LIKE 'accounts'")

    return NextResponse.json({
      connectionTest,
      sampleAccounts,
      tableInfo,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Debug Game Auth GET - Error:", error)
    return NextResponse.json(
      {
        error: "Database error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
