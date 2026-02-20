const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- STATIC FILES ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// --- DATABASE ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

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
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/member-auth", require("./routes/MemberAuthRoutes"));
app.use("/api/member-profile", require("./routes/MemberProfileRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}`);
});