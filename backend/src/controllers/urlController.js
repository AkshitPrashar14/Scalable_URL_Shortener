const pool = require("../config/db");
const redisClient = require("../config/redis");
const { nanoid } = require("nanoid");
const validator = require("validator");

exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl || !validator.isURL(originalUrl)) {
      return res.status(400).json({
        error: "Valid URL is required",
      });
    }

    const shortCode = nanoid(7);

    await pool.query(
      "INSERT INTO urls (short_code, original_url) VALUES (?, ?)",
      [shortCode, originalUrl]
    );

    res.status(201).json({
      success: true,
      shortCode,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;

    const cachedUrl = await redisClient.get(code);

    if (cachedUrl) {
      console.log("Cache HIT");

      await pool.query(
        "UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?",
        [code]
      );

      return res.redirect(cachedUrl);
    }

    console.log("Cache MISS");

    const [rows] = await pool.query(
      "SELECT * FROM urls WHERE short_code = ?",
      [code]
    );

    if (!rows.length) {
      return res.status(404).json({
        error: "URL not found",
      });
    }

    const url = rows[0];

    await redisClient.set(code, url.original_url, {
      EX: 3600,
    });

    await pool.query(
      "UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?",
      [code]
    );

    return res.redirect(url.original_url);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const { code } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM urls WHERE short_code = ?",
      [code]
    );

    if (!rows.length) {
      return res.status(404).json({
        error: "URL not found",
      });
    }

    res.json(rows[0]);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
};