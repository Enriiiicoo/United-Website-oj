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
      if (account?.provider === "discord" && profile) {
        token.discordId = profile.id
        token.discordUsername = profile.username
        token.discordAvatar = profile.avatar
      }
      return token
    },
    async session({ session, token }) {
      if (token.discordId) {
        session.user.discordId = token.discordId as string
        session.user.discordUsername = token.discordUsername as string
        session.user.discordAvatar = token.discordAvatar as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}
