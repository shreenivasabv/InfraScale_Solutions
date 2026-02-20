const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const app = express();

// --- MIDDLEWARE ---
const allowedOrigins =
  process.env.NODE_ENV === "production"
<<<<<<< HEAD
    ? ["https://infra-scale-solutions.vercel.app/"]
=======
    ? ["https://infra-scale-solutions.vercel.app"]
>>>>>>> 4ceab6d0a01bd755301de1bb411a3fb59ff09b9a
    : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
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
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/member-auth", require("./routes/memberAuthRoutes"));
app.use("/api/members", require("./routes/memberProfileRoutes"));

const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server Running on ${PORT}`);
});
=======
app.listen(PORT, '0.0.0.0',() => {
  console.log(`🚀 Server Running on{PORT}`);
});
>>>>>>> 4ceab6d0a01bd755301de1bb411a3fb59ff09b9a
