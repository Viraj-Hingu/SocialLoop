const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const cookie = require("cookie-parser");
const express = require("express");

const db = require("../config/database.config");
const authRoutes = require("../routes/auth.routes");
const postRoutes = require("../routes/post.routes");
const followRoutes = require("../routes/follow.routes");

const app = express();
app.use(cookie());
app.use(express.json());
app.use(express.static("./public"));
const cors = require("cors");
const defaultAllowedOrigins = [
  "http://localhost:5173",
  "https://viraj-hingu.github.io",
];
const envAllowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);
const allowedOriginSet = new Set([...defaultAllowedOrigins, ...envAllowedOrigins]);
const isLocalOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

app.use(
  cors({
    origin: (origin, callback) => {
      const normalizedOrigin = origin?.replace(/\/$/, "");
      if (
        !normalizedOrigin ||
        allowedOriginSet.has(normalizedOrigin) ||
        isLocalOrigin(normalizedOrigin)
      ) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", followRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("*name", (req, res) => [
  res.sendFile(path.join(__dirname, "..", "/public/index.html")),
]);
db();
module.exports = app;
