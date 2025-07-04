import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      discordId?: string
      discordUsername?: string
      discordAvatar?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    discordId?: string
    discordUsername?: string
    discordAvatar?: string
  }
}
