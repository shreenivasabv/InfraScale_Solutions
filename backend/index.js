const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const app = express();

// --- MIDDLEWARE ---
const allowedOrigins = [
  "http://localhost:5173",
  "https://infra-scale-solutions-68c5.vercel.app",
  "https://infra-scale-solutions.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser tools (Postman)
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- STATIC FILES ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// --- DATABASE ---
// Allow a local fallback for development when MONGO_URI is not set.
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/infrascale";
mongoose.connect(mongoUri)
  .then(() => console.log("✅ MongoDB Connected Successfully ->", mongoUri))
  .catch((err) => console.error("❌ MongoDB Error:", err && err.message ? err.message : err));

// --- ADMIN SEED ---
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");

async function createDefaultAdmin() {
  const existing = await Admin.findOne({ email: "admin@infrascale.com" });
  if (!existing) {
    const hashed = await bcrypt.hash("admin123", 10);
    await Admin.create({
      email: "admin@infrascale.com",
      password: hashed
    });
    console.log("✅ Default Admin Created");
  }
}
createDefaultAdmin();

// --- ROUTES ---
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/detailed-services", require("./routes/detailedServiceRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/member-auth", require("./routes/MemberAuthRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));

const cloudinary = require("./config/cloudinary");


const PORT = process.env.PORT || 5000;
console.log("NODE_ENV:", process.env.NODE_ENV);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server Running on port ${PORT}`);
});
