import { queryRow } from "@/lib/mysql";
import crypto from "crypto";

// Account structure from the database
export interface GameAccount {
  id: number;
  username: string;
  email: string;
  password: string;
  salt: string;
  registerdate: string;
  lastlogin: string | null;
  activated?: string | number;
}

/**
 * Verifies a username and password using the MTA double-MD5 method.
 */
export async function verifyGameCredentials(username: string, password: string): Promise<GameAccount | null> {
  try {
    console.log("🔍 Game Auth - Verifying credentials for:", username);

    // Fetch account by username
    const account = (await queryRow(
      "SELECT id, username, email, password, salt, registerdate, lastlogin, activated FROM accounts WHERE username = ?",
      [username]
    )) as GameAccount | null;

    if (!account) {
      console.log("❌ Game Auth - Account not found");
      return null;
    }

    if (account.activated === "0" || account.activated === 0) {
      console.log("❌ Game Auth - Account not activated");
      return null;
    }

    // Recreate the MTA double-MD5 hash
    const expectedHash = createMTAPasswordHash(password, account.salt);

    if (expectedHash === account.password) {
      console.log("✅ Game Auth - Password verified successfully");
      return account;
    }

    console.log("❌ Game Auth - Incorrect password");
    return null;
  } catch (error) {
    console.error("❌ Game Auth - Error verifying credentials:", error);
    return null;
  }
}

/**
 * Checks if an MTA account is already linked to a website account.
 */
export async function checkAccountAlreadyLinked(accountId: number): Promise<boolean> {
  try {
    const existingLink = await queryRow("SELECT id FROM website_users WHERE account_id = ?", [accountId]);
    return !!existingLink;
  } catch (error) {
    console.error("❌ Game Auth - Error checking account link:", error);
    return false;
  }
}

/**
 * Creates a password hash using the MTA double-MD5 + salt method.
 */
export function createMTAPasswordHash(password: string, salt: string): string {
  const firstMd5 = crypto.createHash("md5").update(password).digest("hex").toLowerCase();
  const finalHash = crypto.createHash("md5").update(firstMd5 + salt).digest("hex").toLowerCase();
  return finalHash;
}

/**
 * Generates an MTA-style salt: a 10-digit random numeric string.
 */
export function generateSalt(): string {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10).toString()).join("");
}
