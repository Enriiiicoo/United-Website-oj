import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import mysql from "mysql2/promise"
import crypto from "crypto"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          // Create database connection
          const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          })

          try {
            // Check if user exists in game accounts table
            const [rows] = await connection.execute(
              "SELECT id, username, password, salt, email FROM accounts WHERE username = ?",
              [credentials.username],
            )

            const accounts = rows as any[]
            if (accounts.length === 0) {
              return null
            }

            const account = accounts[0]

            // Verify password using MD5 with salt (same as game)
            const hashedPassword = crypto
              .createHash("md5")
              .update(credentials.password + account.salt)
              .digest("hex")

            if (hashedPassword !== account.password) {
              return null
            }

            return {
              id: account.id.toString(),
              name: account.username,
              email: account.email || `${account.username}@unitedserver.com`,
              username: account.username,
            }
          } finally {
            await connection.end()
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username
        token.gameAccountId = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.username = token.username as string
        session.user.gameAccountId = token.gameAccountId as string
      }
      return session
    },
  },
}
