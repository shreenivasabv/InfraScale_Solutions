const router = require("express").Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");
const sendContactEmails = require("../services/emailService");
// Validate contact data
const validateContact = (data) => {
  const { name, email, message } = data;
  if (!name || !email || !message) {
    return "Name, email, and message are required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  return null;
};

// POST: /api/contact (Public)
router.post("/", async (req, res) => {
  try {

    const error = validateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const contact = new Contact(req.body);
    await contact.save();

    if (process.env.NODE_ENV !== "test") {
      sendContactEmails(req.body).catch(err =>
        console.error("Email error:", err)
      );
    }

    res.status(201).json({
      message: "Message sent successfully. Our engineers will contact you shortly."
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to process request" });
  }
});

// GET: /api/contact (Admin only)
router.get("/", auth, async (req, res) => {
  try {
    console.log("📥 Admin fetching contacts | User ID:", req.user?.id);
    const contacts = await Contact.find().sort({ createdAt: -1 });
    console.log(`✅ Fetched ${contacts.length} contacts`);
    res.json(contacts);
  } catch (err) {
    console.error("❌ Error fetching contacts:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// DELETE: /api/contact/:id (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    console.log("🗑️ Admin deleting contact:", req.params.id);
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      console.error("❌ Contact not found:", req.params.id);
      return res.status(404).json({ message: "Message not found" });
    }
    console.log("✅ Contact deleted successfully");
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting contact:", err);
    res.status(500).json({ message: "Failed to delete message" });
  }
});

module.exports = router;