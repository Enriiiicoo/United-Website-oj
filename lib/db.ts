import mysql, { type Pool } from "mysql2/promise"

/**
 * Create a singleton MySQL connection pool.
 * We expose it as both the default export **and** a named export (`db`)
 * so that various modules can import it whichever way they need.
 *
 * Environment variables are NOT validated here to avoid build-time failures.
 * You should validate them at runtime (inside request handlers) instead.
 */
const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "united_server",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export const db = pool // ← named export

/**
 * Helper to execute a single SQL statement with optional placeholders.
 * Returns the typed result array.
 */
export async function executeQuery<T = any>(sql: string, params: any[] = []): Promise<T> {
  const [rows] = await pool.execute(sql, params)
  return rows as T
}

export default pool // ← default export
