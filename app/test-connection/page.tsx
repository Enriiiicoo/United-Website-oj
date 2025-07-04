import { executeQuery } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

async function testDatabaseConnection() {
  try {
    const result = await executeQuery("SELECT 1 as test")
    return { success: true, message: "Database connection successful", data: result }
  } catch (error) {
    return { success: false, message: "Database connection failed", error: error.message }
  }
}

async function testEnvironmentVariables() {
  const requiredVars = [
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
    "DISCORD_CLIENT_ID",
    "DISCORD_CLIENT_SECRET",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
  ]

  const results = {}
  for (const varName of requiredVars) {
    results[varName] = process.env[varName] ? "✅ Set" : "❌ Missing"
  }

  return results
}

export default async function TestConnectionPage() {
  const session = await getServerSession(authOptions)
  const dbTest = await testDatabaseConnection()
  const envTest = await testEnvironmentVariables()

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">System Test Page</h1>

        {/* Environment Variables Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(envTest).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-2 border rounded">
                <span className="font-mono text-sm">{key}</span>
                <span className={value.includes("✅") ? "text-green-600" : "text-red-600"}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Database Connection Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Database Connection</h2>
          <div className={`p-4 rounded ${dbTest.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            <p className="font-semibold">{dbTest.success ? "✅ Success" : "❌ Failed"}</p>
            <p>{dbTest.message}</p>
            {dbTest.error && <p className="text-sm mt-2">Error: {dbTest.error}</p>}
          </div>
        </div>

        {/* Authentication Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          {session ? (
            <div className="bg-green-100 text-green-800 p-4 rounded">
              <p className="font-semibold">✅ Authenticated</p>
              <p>Discord ID: {session.user.discordId}</p>
              <p>Username: {session.user.username}</p>
              <p>Email: {session.user.email}</p>
            </div>
          ) : (
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
              <p className="font-semibold">⚠️ Not Authenticated</p>
              <p>
                You are not logged in.{" "}
                <a href="/auth/signin" className="underline">
                  Sign in here
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <div className="space-y-2">
            <p>
              1. ✅ Generate secrets:{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">node scripts/generate-secrets.js</code>
            </p>
            <p>2. ✅ Set up environment variables in .env.local</p>
            <p>3. 🔄 Test database connection (check above)</p>
            <p>
              4. 🔄 Test Discord authentication:{" "}
              <a href="/auth/signin" className="text-blue-600 underline">
                Sign in
              </a>
            </p>
            <p>
              5. 🔄 Link game account:{" "}
              <a href="/link-account" className="text-blue-600 underline">
                Link Account
              </a>
            </p>
            <p>
              6. 🔄 View dashboard:{" "}
              <a href="/dashboard" className="text-blue-600 underline">
                Dashboard
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
