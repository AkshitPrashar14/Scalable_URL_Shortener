const pool = require("../config/db");
const redisClient = require("../config/redis");
const { nanoid } = require("nanoid");
const validator = require("validator");

const BASE_URL =
  process.env.BASE_URL || "http://127.0.0.1:5000";

/*
  SHORTEN URL
*/
exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    /*
      Validate URL
    */
    if (!originalUrl || !validator.isURL(originalUrl)) {
      return res.status(400).json({
        success: false,
        error: "Valid URL is required",
      });
    }

    /*
      Generate Short Code
    */
    const shortCode = nanoid(7);

    /*
      Store in MySQL
    */
    await pool.query(
      "INSERT INTO urls (short_code, original_url) VALUES (?, ?)",
      [shortCode, originalUrl]
    );

    /*
      Return Short URL
    */
    return res.status(201).json({
      success: true,
      originalUrl,
      shortCode,
      shortUrl: `${BASE_URL}/${shortCode}`,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

/*
  REDIRECT URL
*/
exports.redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;

    /*
      Check Redis Cache
    */
    const cachedUrl = await redisClient.get(code);

    if (cachedUrl) {
      console.log("Cache HIT");

      /*
        Increase Click Count
      */
      await pool.query(
        "UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?",
        [code]
      );

      let finalUrl = cachedUrl;
      if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
        finalUrl = "https://" + finalUrl;
      }

      return res.redirect(finalUrl);
    }

    console.log("Cache MISS");

    /*
      Fetch From MySQL
    */
    const [rows] = await pool.query(
      "SELECT * FROM urls WHERE short_code = ?",
      [code]
    );

    /*
      URL Not Found
    */
    if (!rows.length) {
      return res.status(404).json({
        success: false,
        error: "URL not found",
      });
    }

    const url = rows[0];

    /*
      Store In Redis
    */
    await redisClient.set(code, url.original_url, {
      EX: 3600,
    });

    /*
      Increase Click Count
    */
    await pool.query(
      "UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?",
      [code]
    );

    /*
      Redirect User
    */
    let finalUrl = url.original_url;
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }

    return res.redirect(finalUrl);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

/*
  GET ANALYTICS
*/
exports.getAnalytics = async (req, res) => {
  try {
    const { code } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM urls WHERE short_code = ?",
      [code]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        error: "URL not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getAllUrls = async (req, res) => {

  try {

    const [rows] = await pool.query(
      "SELECT * FROM urls ORDER BY id DESC"
    );

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
};