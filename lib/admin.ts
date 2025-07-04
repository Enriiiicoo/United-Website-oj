// Admin configuration - only users with these Discord IDs can access admin features
const ADMIN_DISCORD_IDS = [
  "708475369614999572", // Your Discord ID (anaas___)
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

// Get admin level (for future role-based permissions)
export function getAdminLevel(discordId: string | undefined): "none" | "admin" | "super_admin" {
  if (!discordId) return "none"

  // Super admins (full access)
  const SUPER_ADMIN_IDS = ["708475369614999572"]
  if (SUPER_ADMIN_IDS.includes(discordId)) return "super_admin"

  // Regular admins
  if (ADMIN_DISCORD_IDS.includes(discordId)) return "admin"

  return "none"
}
