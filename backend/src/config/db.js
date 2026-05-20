require("dotenv").config();

const mysql = require("mysql2/promise");



const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const initDb = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS urls (
        id INT AUTO_INCREMENT PRIMARY KEY,
        short_code VARCHAR(255) NOT NULL UNIQUE,
        original_url TEXT NOT NULL,
        clicks INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    connection.release();
    console.log("MySQL Database Initialized ✅");
  } catch (error) {
    console.log("Database Init Error:", error);
  }
};
initDb();

module.exports = pool;