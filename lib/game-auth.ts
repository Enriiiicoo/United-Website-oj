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
    // Get the account from the database
    const account = (await queryRow(
      "SELECT id, username, email, password, salt, registerdate, lastlogin FROM accounts WHERE username = ?",
      [username],
    )) as GameAccount | null

    if (!account) {
      console.log("Account not found for username:", username)
      return null
    }

    // Verify password using MD5 + salt (matching your game's auth system)
    const hashedPassword = crypto
      .createHash("md5")
      .update(password + account.salt)
      .digest("hex")

    if (hashedPassword !== account.password) {
      console.log("Password mismatch for username:", username)
      return null
    }

    console.log("✅ Game credentials verified for:", username)
    return account
  } catch (error) {
    console.error("Error verifying game credentials:", error)
    return null
  }
}

export async function checkAccountAlreadyLinked(accountId: number): Promise<boolean> {
  try {
    const existingLink = await queryRow("SELECT id FROM website_users WHERE account_id = ?", [accountId])
    return !!existingLink
  } catch (error) {
    console.error("Error checking account link:", error)
    return false
  }
}
