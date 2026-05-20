require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const urlRoutes = require("./routes/urlRoutes");
const { register, httpRequestsTotal } = require("./metrics");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.on("finish", () => {
    if (req.path !== "/metrics" && req.path !== "/health") {
      httpRequestsTotal.inc({
        method: req.method,
        route: req.route ? req.route.path : req.path,
        status: res.statusCode
      });
    }
  });
  next();
});

/*
  Root Route
*/
app.get("/", (req, res) => {
  res.send("Scalable URL Shortener API Running 🚀");
});

/*
  Health Route
*/
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is healthy 🚀",
  });
});

/*
  Metrics Route
*/
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

/*
  URL Routes
*/
app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});