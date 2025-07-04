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
}

export async function verifyGameCredentials(username: string, password: string): Promise<GameAccount | null> {
  try {
    console.log("🔍 Game Auth - Starting verification for username:", username)

    // Get the account from the database
    console.log("🔍 Game Auth - Querying accounts table...")
    const account = (await queryRow(
      "SELECT id, username, email, password, salt, registerdate, lastlogin FROM accounts WHERE username = ?",
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
            passwordLength: account.password?.length,
            saltLength: account.salt?.length,
          }
        : "No account found",
    )

    if (!account) {
      console.log("❌ Game Auth - Account not found for username:", username)
      return null
    }

    console.log("🔍 Game Auth - Verifying password...")
    console.log("📝 Game Auth - Input password length:", password.length)
    console.log("📝 Game Auth - Stored password hash:", account.password)
    console.log("📝 Game Auth - Salt:", account.salt)

    // Try different hashing methods
    const methods = [
      // Method 1: MD5(password + salt)
      {
        name: "MD5(password + salt)",
        hash: crypto
          .createHash("md5")
          .update(password + account.salt)
          .digest("hex"),
      },
      // Method 2: MD5(salt + password)
      {
        name: "MD5(salt + password)",
        hash: crypto
          .createHash("md5")
          .update(account.salt + password)
          .digest("hex"),
      },
      // Method 3: Just MD5(password)
      {
        name: "MD5(password)",
        hash: crypto.createHash("md5").update(password).digest("hex"),
      },
      // Method 4: SHA1(password + salt)
      {
        name: "SHA1(password + salt)",
        hash: crypto
          .createHash("sha1")
          .update(password + account.salt)
          .digest("hex"),
      },
    ]

    console.log("🔍 Game Auth - Testing different hash methods:")
    for (const method of methods) {
      console.log(`📝 ${method.name}: ${method.hash}`)
      if (method.hash === account.password) {
        console.log(`✅ Game Auth - Password verified using ${method.name}`)
        return account
      }
    }

    console.log("❌ Game Auth - Password verification failed for all methods")
    console.log("📝 Game Auth - Expected hash:", account.password)
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
