require("dotenv").config();

const pool = require("./config/db");

async function testDB() {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL Connected Successfully ✅");

    connection.release();
  } catch (error) {
    console.log("MySQL Connection Failed ❌");
    console.log(error);
  }
}

testDB();
testDB();