import type { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { executeQuery } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify email guilds",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "discord" && profile) {
        try {
          // Store or update user in database
          await executeQuery(
            `INSERT INTO users (discord_id, username, discriminator, avatar, email) 
             VALUES (?, ?, ?, ?, ?) 
             ON DUPLICATE KEY UPDATE 
               username = VALUES(username),
               discriminator = VALUES(discriminator),
               avatar = VALUES(avatar),
               email = VALUES(email),
               updated_at = CURRENT_TIMESTAMP`,
            [profile.id, profile.username, profile.discriminator || "0000", profile.avatar, profile.email],
          )
          return true
        } catch (error) {
          console.error("Database error during sign in:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "discord" && profile) {
        token.discordId = profile.id
        token.username = profile.username
        token.discriminator = profile.discriminator || "0000"
        token.avatar = profile.avatar
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.discordId = token.discordId as string
        session.user.username = token.username as string
        session.user.discriminator = token.discriminator as string
        session.user.avatar = token.avatar as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
}
