"use server"

import { executeQuery } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function linkGameAccount(formData: FormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId) {
      return {
        success: false,
        message: "You must be logged in with Discord to link an account.",
      }
    }

    const username = formData.get("username") as string
    const password = formData.get("password") as string

    if (!username || !password) {
      return {
        success: false,
        message: "Username and password are required.",
      }
    }

    // Check if MTA account exists and password matches
    const accountCheck = (await executeQuery(
      "SELECT id, username, password FROM mta_accounts WHERE username = ? LIMIT 1",
      [username],
    )) as any[]

    if (!accountCheck || accountCheck.length === 0) {
      return {
        success: false,
        message: "Game account not found. Make sure you've created a character in-game first.",
      }
    }

    const account = accountCheck[0]

    // In a real implementation, you'd hash and compare passwords properly
    // For demo purposes, we'll assume password verification works
    if (account.password !== password) {
      return {
        success: false,
        message: "Invalid password for this game account.",
      }
    }

    // Get user ID from Discord ID
    const userResult = (await executeQuery("SELECT id FROM users WHERE discord_id = ? LIMIT 1", [
      session.user.discordId,
    ])) as any[]

    if (!userResult || userResult.length === 0) {
      return {
        success: false,
        message: "User not found. Please try logging in again.",
      }
    }

    const userId = userResult[0].id

    // Check if account is already linked to another Discord user
    const existingLink = (await executeQuery("SELECT user_id FROM user_accounts WHERE account_id = ? LIMIT 1", [
      account.id,
    ])) as any[]

    if (existingLink && existingLink.length > 0 && existingLink[0].user_id !== userId) {
      return {
        success: false,
        message: "This game account is already linked to another Discord user.",
      }
    }

    // Link the accounts
    await executeQuery(
      `INSERT INTO user_accounts (user_id, account_id, is_primary) 
       VALUES (?, ?, TRUE) 
       ON DUPLICATE KEY UPDATE is_primary = TRUE, linked_at = CURRENT_TIMESTAMP`,
      [userId, account.id],
    )

    return {
      success: true,
      message: "Successfully linked your game account!",
      accountName: account.username,
    }
  } catch (error) {
    console.error("Account linking error:", error)
    return {
      success: false,
      message: "Failed to link account. Please try again later.",
    }
  }
}

export async function getLinkedAccount() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId) {
      return null
    }

    const result = (await executeQuery(
      `SELECT 
        ma.id, ma.username, ma.money, ma.bank_money, ma.level, 
        ma.experience, ma.playtime, ma.last_login, ma.admin_level, 
        ma.vip_level, ma.faction_id, ma.job
       FROM users u
       JOIN user_accounts ua ON u.id = ua.user_id
       JOIN mta_accounts ma ON ua.account_id = ma.id
       WHERE u.discord_id = ? AND ua.is_primary = TRUE
       LIMIT 1`,
      [session.user.discordId],
    )) as any[]

    if (!result || result.length === 0) {
      return null
    }

    return result[0]
  } catch (error) {
    console.error("Get linked account error:", error)
    return null
  }
}

export async function getCharacterData() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId) {
      return null
    }

    // Get linked account
    const account = await getLinkedAccount()
    if (!account) return null

    // Get characters
    const characters = (await executeQuery(
      `SELECT id, name, money, bank_money, health, armor, skin, last_used
       FROM mta_characters 
       WHERE account_id = ?
       ORDER BY last_used DESC`,
      [account.id],
    )) as any[]

    // Get vehicles
    const vehicles = (await executeQuery(
      `SELECT v.id, v.model, v.plate, v.health, v.fuel, v.mileage, c.name as owner_name
       FROM mta_vehicles v
       JOIN mta_characters c ON v.owner_id = c.id
       WHERE c.account_id = ?`,
      [account.id],
    )) as any[]

    // Get properties
    const properties = (await executeQuery(
      `SELECT p.id, p.type, p.name, p.price, c.name as owner_name
       FROM mta_properties p
       JOIN mta_characters c ON p.owner_id = c.id
       WHERE c.account_id = ?`,
      [account.id],
    )) as any[]

    return {
      account,
      characters,
      vehicles,
      properties,
    }
  } catch (error) {
    console.error("Get character data error:", error)
    return null
  }
}

export async function unlinkAccount() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.discordId) {
      return {
        success: false,
        message: "You must be logged in to unlink an account.",
      }
    }

    await executeQuery(
      `DELETE ua FROM user_accounts ua
       JOIN users u ON ua.user_id = u.id
       WHERE u.discord_id = ?`,
      [session.user.discordId],
    )

    return {
      success: true,
      message: "Successfully unlinked your game account.",
    }
  } catch (error) {
    console.error("Unlink account error:", error)
    return {
      success: false,
      message: "Failed to unlink account. Please try again later.",
    }
  }
}
