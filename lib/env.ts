/**
 * Central place to check for required environment variables.
 * Importing this file does NOT trigger validation – you must call
 * `validateEnvironmentVariables()` explicitly inside runtime code.
 */

const REQUIRED_VARS = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "NEXTAUTH_SECRET",
  "DISCORD_CLIENT_ID",
  "DISCORD_CLIENT_SECRET",
  "DISCORD_BOT_TOKEN",
  "DISCORD_GUILD_ID",
  "NEXTAUTH_URL",
] as const

export function validateEnvironmentVariables(vars: readonly string[] = REQUIRED_VARS) {
  const missing = vars.filter((key) => !process.env[key] || process.env[key]?.length === 0)

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }
}
