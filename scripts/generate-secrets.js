const crypto = require("crypto")

console.log("=== Secret Key Generator ===\n")

// Generate NEXTAUTH_SECRET (32 bytes = 256 bits)
const nextAuthSecret = crypto.randomBytes(32).toString("hex")
console.log("NEXTAUTH_SECRET=" + nextAuthSecret)

// Generate JWT_SECRET (32 bytes = 256 bits)
const jwtSecret = crypto.randomBytes(32).toString("hex")
console.log("JWT_SECRET=" + jwtSecret)

console.log("\n=== Copy these to your .env.local file ===")
console.log("NEXTAUTH_SECRET=" + nextAuthSecret)
console.log("JWT_SECRET=" + jwtSecret)

// Alternative: Base64 encoded secrets
console.log("\n=== Alternative Base64 Secrets ===")
console.log("NEXTAUTH_SECRET=" + crypto.randomBytes(32).toString("base64"))
console.log("JWT_SECRET=" + crypto.randomBytes(32).toString("base64"))

console.log("\n=== Instructions ===")
console.log("1. Copy one of the NEXTAUTH_SECRET values above")
console.log("2. Add it to your .env.local file")
console.log("3. Make sure .env.local is in your .gitignore")
console.log("4. Restart your development server")
