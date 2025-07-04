import { pgTable, serial, varchar, text, timestamp, integer } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const discordLinks = pgTable("discord_links", {
  id: serial("id").primaryKey(),
  discordId: varchar("discord_id", { length: 20 }).notNull().unique(),
  discordUsername: varchar("discord_username", { length: 50 }).notNull(),
  gameUsername: varchar("game_username", { length: 50 }).notNull(),
  gamePassword: varchar("game_password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const playerStats = pgTable("player_stats", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull(),
  level: integer("level").default(1),
  experience: integer("experience").default(0),
  kills: integer("kills").default(0),
  deaths: integer("deaths").default(0),
  playtime: integer("playtime").default(0),
  lastSeen: timestamp("last_seen").defaultNow(),
})

export const whitelist = pgTable("whitelist", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  addedBy: varchar("added_by", { length: 50 }).notNull(),
  reason: text("reason"),
  addedAt: timestamp("added_at").defaultNow(),
})
