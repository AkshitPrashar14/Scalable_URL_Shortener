const express = require("express");

const router = express.Router();

const {
  shortenUrl,
  redirectUrl,
  getAnalytics,
  getAllUrls,
} = require("../controllers/urlController");

const { register } = require("../metrics");

/*
  Metrics Route
*/
router.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());
});

/*
  Shorten URL
*/
router.post("/shorten", shortenUrl);

/*
  Analytics Route
*/
router.get("/analytics/:code", getAnalytics);

router.get("/urls", getAllUrls);

/*
  Redirect Route
*/
router.get("/:code", redirectUrl);

module.exports = router;