import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { accounts } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { validateEnvironmentVariables } from "@/lib/env"

export async function POST(request: NextRequest) {
  // Validate env-vars at runtime (NOT during build)
  validateEnvironmentVariables()

  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const userId = session.user.id
  const { providerAccountId, provider } = await request.json()

  try {
    // Check if the account already exists
    const existingAccount = await db.select().from(accounts).where(eq(accounts.providerAccountId, providerAccountId))

    if (existingAccount.length > 0) {
      return new NextResponse(JSON.stringify({ message: "Account already linked" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    // Link the account to the user
    await db.insert(accounts).values({
      userId: userId,
      providerAccountId: providerAccountId,
      provider: provider,
    })

    return new NextResponse(JSON.stringify({ message: "Account linked successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error linking account:", error)
    return new NextResponse(JSON.stringify({ error: "Failed to link account" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
