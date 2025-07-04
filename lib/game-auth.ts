import { queryRow } from "@/lib/mysql"
import crypto from "crypto"

export interface GameAccount {
  id: number
  username: string
  email: string
  password: string
  salt: string
  registerdate: string
  lastlogin: string | null
  activated?: string | number
}

export async function verifyGameCredentials(username: string, password: string): Promise<GameAccount | null> {
  try {
    console.log("🔍 Game Auth - Starting MTA verification for username:", username)

    // Get the account from the database
    console.log("🔍 Game Auth - Querying accounts table...")
    const account = (await queryRow(
      "SELECT id, username, email, password, salt, registerdate, lastlogin, activated FROM accounts WHERE username = ?",
      [username],
    )) as GameAccount | null

    console.log(
      "📝 Game Auth - Database query result:",
      account
        ? {
            id: account.id,
            username: account.username,
            email: account.email,
            hasPassword: !!account.password,
            hasSalt: !!account.salt,
            activated: account.activated,
            passwordLength: account.password?.length,
            saltLength: account.salt?.length,
          }
        : "No account found",
    )

    if (!account) {
      console.log("❌ Game Auth - Account not found for username:", username)
      return null
    }

    // Check if account is activated
    if (account.activated === "0" || account.activated === 0) {
      console.log("❌ Game Auth - Account not activated:", username)
      return null
    }

    console.log("🔍 Game Auth - Verifying password using MTA double MD5 method...")
    console.log("📝 Game Auth - Input password length:", password.length)
    console.log("📝 Game Auth - Stored password hash:", account.password)
    console.log("📝 Game Auth - Salt:", account.salt)

    // MTA Password hashing: MD5(MD5(password).toLowerCase() + salt).toLowerCase()
    // Step 1: MD5 the password and convert to lowercase
    const firstMd5 = crypto.createHash("md5").update(password).digest("hex").toLowerCase()
    console.log("📝 Game Auth - First MD5 (password):", firstMd5)

    // Step 2: Concatenate with salt and MD5 again, then lowercase
    const finalHash = crypto
      .createHash("md5")
      .update(firstMd5 + account.salt)
      .digest("hex")
      .toLowerCase()
    console.log("📝 Game Auth - Final hash (MD5(MD5(password) + salt)):", finalHash)
    console.log("📝 Game Auth - Expected hash:", account.password)

    if (finalHash === account.password) {
      console.log("✅ Game Auth - Password verified using MTA double MD5 method")
      return account
    }

    console.log("❌ Game Auth - Password verification failed")
    return null
  } catch (error) {
    console.error("❌ Game Auth - Error verifying credentials:", error)
    return null
  }
}

export async function checkAccountAlreadyLinked(accountId: number): Promise<boolean> {
  try {
    console.log("🔍 Game Auth - Checking if account is already linked:", accountId)
    const existingLink = await queryRow("SELECT id FROM website_users WHERE account_id = ?", [accountId])
    const isLinked = !!existingLink
    console.log("📝 Game Auth - Account already linked:", isLinked)
    return isLinked
  } catch (error) {
    console.error("❌ Game Auth - Error checking account link:", error)
    return false
  }
}

// Helper function to create MTA-style account (for testing purposes)
export function createMTAPasswordHash(password: string, salt: string): string {
  const firstMd5 = crypto.createHash("md5").update(password).digest("hex").toLowerCase()
  const finalHash = crypto
    .createHash("md5")
    .update(firstMd5 + salt)
    .digest("hex")
    .toLowerCase()
  return finalHash
}

// Helper function to generate MTA-style salt (10 random digits)
export function generateMTASalt(): string {
  let salt = ""
  for (let i = 0; i < 10; i++) {
    salt += Math.floor(Math.random() * 10).toString()
  }
  return salt
}
