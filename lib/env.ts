/**
 * Runtime-only environment-variable validation.
 * Call this function **inside** a Route Handler / Server Action
 * (never at the top level of a file that is imported during build).
 */
export function validateEnvironmentVariables() {
  const required = [
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
    "DISCORD_CLIENT_ID",
    "DISCORD_CLIENT_SECRET",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
  ] as const

  const missing = required.filter((key) => !process.env[key])

  if (missing.length) {
    const message = `❌ Missing required environment variables: ${missing.join(", ")}`
    console.error(message)
    throw new Error(message)
  }
}
