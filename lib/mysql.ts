import mysql from "mysql2/promise"

// Create connection pool for better performance
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: Number.parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
})

// Test connection function
export async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log("✅ MySQL connected successfully")
    connection.release()
    return true
  } catch (error) {
    console.error("❌ MySQL connection failed:", error)
    return false
  }
}

// Execute query function
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(query, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Get single row
export async function queryRow(query: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(query, params)
    return Array.isArray(results) && results.length > 0 ? results[0] : null
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

export default pool
