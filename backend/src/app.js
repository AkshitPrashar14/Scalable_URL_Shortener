require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const urlRoutes = require("./routes/urlRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

/*
  ROOT ROUTE
*/
app.get("/", (req, res) => {
  res.send("Scalable URL Shortener API Running 🚀");
});

/*
  HEALTH CHECK ROUTE
*/
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

/*
  URL ROUTES
*/
app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});