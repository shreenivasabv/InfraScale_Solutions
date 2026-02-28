const Member = require("../models/Member");
const Team = require("../models/Team");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Validation
const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) =>
  password && password.length >= 6;


// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    if (!validateEmail(email))
      return res.status(400).json({ message: "Invalid email format" });

    if (!validatePassword(password))
      return res.status(400).json({ message: "Password must be at least 6 characters" });

    // 🔥 IMPORTANT: Only allow if admin already created team member
    const teamMember = await Team.findOne({ email });

    if (!teamMember)
      return res.status(403).json({
        message: "You are not authorized. Contact admin."
      });

    const existing = await Member.findOne({ email });

    if (existing && existing.isRegistered)
      return res.status(400).json({ message: "Account already activated" });

    const hashed = await bcrypt.hash(password, 10);

    const member = await Member.findOneAndUpdate(
      { email },
      {
        password: hashed,
        isRegistered: true,
        teamMemberId: teamMember._id
      },
      { new: true, upsert: true }
    );

    res.status(201).json({
      message: "Account activated successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Member.findOne({ email });

    if (!user || !user.isRegistered)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      teamMemberId: user.teamMemberId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};