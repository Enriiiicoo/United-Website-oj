export function validateEnvironmentVariables() {
  const requiredEnvVars = [
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
    "DISCORD_CLIENT_ID",
    "DISCORD_CLIENT_SECRET",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
  ]

  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    console.error("❌ Missing required environment variables:")
    missingVars.forEach((varName) => {
      console.error(`   - ${varName}`)
    })

    console.log("\n📝 To fix this:")
    console.log("1. Create a .env.local file in your project root")
    console.log("2. Run: node scripts/generate-secrets.js")
    console.log("3. Copy the generated secrets to your .env.local file")
    console.log("4. Add your database and Discord OAuth credentials")

    throw new Error("Missing required environment variables")
  }

  console.log("✅ All required environment variables are set")
}
