// Admin configuration - Discord IDs that have admin access
const ADMIN_DISCORD_IDS = [
  "708475369614999572", // Your Discord ID
  // Add more admin Discord IDs here as needed
]

export function isAdmin(discordId: string | undefined): boolean {
  if (!discordId) return false
  return ADMIN_DISCORD_IDS.includes(discordId)
}

export function requireAdmin(discordId: string | undefined): boolean {
  if (!isAdmin(discordId)) {
    throw new Error("Admin access required")
  }
  return true
}

// Get admin level (for future use)
export function getAdminLevel(discordId: string | undefined): "none" | "admin" | "superadmin" {
  if (!discordId) return "none"
  if (discordId === "708475369614999572") return "superadmin" // Your ID as superadmin
  if (ADMIN_DISCORD_IDS.includes(discordId)) return "admin"
  return "none"
}
