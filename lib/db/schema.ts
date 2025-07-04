/**
 * Database schema definitions for the United Server project
 * This reflects the actual MySQL database structure
 */

/* eslint-disable @typescript-eslint/consistent-type-definitions */

// Game accounts table (existing from your game)
export type Account = {
  id: number
  username: string
  password: string // MD5 hashed with salt
  salt: string
  email: string
  registerdate: string // ISO date string
  lastlogin: string | null // ISO date string
  ip: string | null
  activated: number // tinyint(1)
}

// Discord links table (new for website)
export type DiscordLink = {
  id: number
  discord_id: string
  discord_username: string
  account_id: number // references accounts.id
  account_username: string
  linked_at: string // ISO date string
}

// Table name constants for queries
export const accounts = "accounts" as const
export const discordLinks = "discord_links" as const
