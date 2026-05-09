require("dotenv").config();

const client = require("./config/redis");

async function testRedis() {
  try {
    await client.set("test", "hello");

    const value = await client.get("test");

    console.log("Redis Connected ✅");
    console.log(value);
  } catch (error) {
    console.log(error);
  }
}

testRedis();