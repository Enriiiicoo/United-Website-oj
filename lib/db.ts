import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "united_server",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export { pool }

// Database helper functions
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(query, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

export async function executeTransaction(queries: { query: string; params: any[] }[]) {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    const results = []
    for (const { query, params } of queries) {
      const [result] = await connection.execute(query, params)
      results.push(result)
    }

    await connection.commit()
    return results
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}
