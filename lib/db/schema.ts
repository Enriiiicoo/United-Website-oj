/**
 * Minimum “schema” stub so that any `import { accounts } from "@/lib/db/schema"` works
 * even if you’re not using an ORM yet.
 *
 * If you later adopt Drizzle ORM, Prisma, etc., replace this with the real
 * model definition—those files will still re-export `accounts`.
 */

/* eslint-disable @typescript-eslint/consistent-type-definitions */

export type Account = {
  id: number
  username: string | null
  password: string
  salt: string
  email: string
  registerdate: string // ISO date string
  lastlogin: string | null // ISO date string
  ip: string | null
  activated: number // tinyint(1)
  // ...add other columns as needed
}

/**
 * A tiny helper to make raw SQL easier to write/read:
 *
 *   await db.query(sql`SELECT * FROM ${accounts} WHERE id = ?`, [id])
 *
 * It’s just the literal table name (“accounts”) wrapped in an object so
 * you can consistently import & reference it.
 */
export const accounts = "accounts" as const
