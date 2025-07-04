"use server"

import { executeQuery } from "@/lib/db"
import { headers } from "next/headers"

export async function verifyUser(formData: FormData) {
  try {
    const discordId = formData.get("discordId") as string

    // Validate Discord ID format (17-20 digits)
    if (!discordId || !discordId.match(/^\d{17,20}$/)) {
      return {
        success: false,
        message: "Invalid Discord ID format. Must be 17-20 digits.",
      }
    }

    // Check if user is whitelisted
    const whitelistCheck = (await executeQuery("SELECT discord_id FROM mta_whitelist WHERE discord_id = ? LIMIT 1", [
      discordId,
    ])) as any[]

    if (!whitelistCheck || whitelistCheck.length === 0) {
      return {
        success: false,
        message: "Discord ID not found in whitelist. Please contact an administrator.",
      }
    }

    // Get user's IP and user agent for tracking
    const headersList = headers()
    const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"
    const userAgent = headersList.get("user-agent") || "unknown"

    // Set verification to expire in 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now
    const expiresAtString = expiresAt.toISOString().slice(0, 19).replace("T", " ")

    // Insert or update verification
    await executeQuery(
      `
      INSERT INTO mta_verifications (discord_id, expires_at, ip_address, user_agent)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        expires_at = VALUES(expires_at),
        verified_at = CURRENT_TIMESTAMP,
        ip_address = VALUES(ip_address),
        user_agent = VALUES(user_agent)
    `,
      [discordId, expiresAtString, ipAddress, userAgent],
    )

    return {
      success: true,
      message: "Successfully verified! You can now join the server for the next 5 minutes.",
      expiresAt: expiresAt.toISOString(),
    }
  } catch (error) {
    console.error("Verification error:", error)
    return {
      success: false,
      message: "Verification failed. Please try again later.",
    }
  }
}

export async function checkVerificationStatus(discordId: string) {
  try {
    if (!discordId || !discordId.match(/^\d{17,20}$/)) {
      return {
        success: false,
        message: "Invalid Discord ID format.",
      }
    }

    const result = (await executeQuery(
      `
      SELECT 
        expires_at,
        verified_at,
        CASE 
          WHEN expires_at > NOW() THEN 'active'
          ELSE 'expired'
        END as status,
        TIMESTAMPDIFF(SECOND, NOW(), expires_at) as seconds_remaining
      FROM mta_verifications 
      WHERE discord_id = ? 
      LIMIT 1
    `,
      [discordId],
    )) as any[]

    if (!result || result.length === 0) {
      return {
        success: false,
        message: "No verification found for this Discord ID.",
      }
    }

    const verification = result[0]

    return {
      success: true,
      status: verification.status,
      expiresAt: verification.expires_at,
      verifiedAt: verification.verified_at,
      secondsRemaining: Math.max(0, verification.seconds_remaining || 0),
    }
  } catch (error) {
    console.error("Check verification error:", error)
    return {
      success: false,
      message: "Failed to check verification status.",
    }
  }
}

export async function getWhitelistStats() {
  try {
    const whitelistCount = (await executeQuery("SELECT COUNT(*) as count FROM mta_whitelist")) as any[]

    const activeVerifications = (await executeQuery(
      "SELECT COUNT(*) as count FROM mta_verifications WHERE expires_at > NOW()",
    )) as any[]

    const totalVerifications = (await executeQuery("SELECT COUNT(*) as count FROM mta_verifications")) as any[]

    return {
      whitelisted: whitelistCount[0]?.count || 0,
      activeVerifications: activeVerifications[0]?.count || 0,
      totalVerifications: totalVerifications[0]?.count || 0,
    }
  } catch (error) {
    console.error("Stats error:", error)
    return {
      whitelisted: 0,
      activeVerifications: 0,
      totalVerifications: 0,
    }
  }
}
