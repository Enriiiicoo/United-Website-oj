// Admin configuration - only users with these Discord IDs can access admin features
const ADMIN_DISCORD_IDS = [
  "YOUR_DISCORD_ID_HERE", // Replace with your actual Discord ID
  // Add more admin Discord IDs as needed
]

export function isAdmin(discordId: string | undefined): boolean {
  if (!discordId) return false
  return ADMIN_DISCORD_IDS.includes(discordId)
}

export function requireAdmin(discordId: string | undefined) {
  if (!isAdmin(discordId)) {
    throw new Error("Admin access required")
  }
}
