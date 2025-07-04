import type { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "identify email",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("🔍 JWT Callback - Token:", JSON.stringify(token, null, 2))
      console.log("🔍 JWT Callback - Account:", JSON.stringify(account, null, 2))
      console.log("🔍 JWT Callback - Profile:", JSON.stringify(profile, null, 2))

      if (account?.provider === "discord" && profile) {
        console.log("✅ Discord profile found, setting token data")
        token.discordId = profile.id
        token.discordUsername = profile.username
        token.discordAvatar = profile.avatar
        console.log("📝 Token updated with Discord data:", {
          discordId: token.discordId,
          discordUsername: token.discordUsername,
        })
      }
      return token
    },
    async session({ session, token }) {
      console.log("🔍 Session Callback - Session:", JSON.stringify(session, null, 2))
      console.log("🔍 Session Callback - Token:", JSON.stringify(token, null, 2))

      if (token.discordId) {
        console.log("✅ Adding Discord data to session")
        session.user.discordId = token.discordId as string
        session.user.discordUsername = token.discordUsername as string
        session.user.discordAvatar = token.discordAvatar as string
        console.log("📝 Session updated with Discord data:", {
          discordId: session.user.discordId,
          discordUsername: session.user.discordUsername,
        })
      } else {
        console.log("❌ No Discord ID in token")
      }
      return session
    },
    async signIn({ user, account, profile }) {
      console.log("🔍 SignIn Callback - User:", JSON.stringify(user, null, 2))
      console.log("🔍 SignIn Callback - Account:", JSON.stringify(account, null, 2))
      console.log("🔍 SignIn Callback - Profile:", JSON.stringify(profile, null, 2))
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log("🔍 Redirect Callback - URL:", url)
      console.log("🔍 Redirect Callback - Base URL:", baseUrl)

      // If it's the callback URL, let it proceed
      if (url.includes("/auth/callback")) {
        console.log("✅ Allowing redirect to callback")
        return url
      }

      // Default redirect logic
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: true, // Enable debug mode
  logger: {
    error(code, metadata) {
      console.error("❌ NextAuth Error:", code, metadata)
    },
    warn(code) {
      console.warn("⚠️ NextAuth Warning:", code)
    },
    debug(code, metadata) {
      console.log("🐛 NextAuth Debug:", code, metadata)
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
