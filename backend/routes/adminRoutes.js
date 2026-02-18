const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });

  if (!admin) return res.status(400).json({ msg: "Admin not found" });

  const valid = await bcrypt.compare(req.body.password, admin.password);

  if (!valid) return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ token });
});

module.exports = router;
