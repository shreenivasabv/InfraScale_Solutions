const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// Models
const Admin = require("./models/Admin");

const app = express();

// --- MIDDLEWARE ---
const allowedOrigins = [
  "http://localhost:5173",
  "https://infra-scale-solutions-68c5.vercel.app",
  "https://infra-scale-solutions.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- STATIC FILES ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// --- ADMIN SEED FUNCTION ---
async function createDefaultAdmin() {
  try {
    const existing = await Admin.findOne({ email: "admin@infrascale.com" });
    if (!existing) {
      const hashed = await bcrypt.hash("admin123", 10);
      await Admin.create({
        email: "admin@infrascale.com",
        password: hashed
      });
      console.log("✅ Default Admin Created");
    }
  } catch (err) {
    console.error("❌ Admin Seeding Error:", err.message);
  }
}

// --- DATABASE CONNECTION ---
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/infrascale";

mongoose.connect(mongoUri)
  .then(async () => {
    console.log("✅ MongoDB Connected Successfully");
    
    // Fix: Only seed admin if NOT in test mode to prevent CI/CD "Topology Closed" errors
    if (process.env.NODE_ENV !== "test") {
      await createDefaultAdmin();
    }
  })
  .catch((err) => console.error("❌ MongoDB Error:", err && err.message ? err.message : err));

// --- ROUTES ---
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/detailed-services", require("./routes/detailedServiceRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/member-auth", require("./routes/MemberAuthRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/partners", require("./routes/partnerRoutes"));

// Cloudinary config (Optional: ensure this file exists or remove if unused)
// const cloudinary = require("./config/cloudinary");

// --- SERVER START ---
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server Running on port ${PORT}`);
    console.log("NODE_ENV:", process.env.NODE_ENV);
  });
}

// Export app for testing purposes
module.exports = app;