const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendContactEmails = async (data) => {
  const { name, email, environment, message } = data;

  // email to admin
  const adminMail = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Contact Request - InfraScale",
    html: `
      <h2>New Contact Request</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Environment:</b> ${environment || "Not provided"}</p>
      <p><b>Message:</b></p>
      <p>${message}</p>
    `
  };

  // confirmation email to user
  const userMail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "InfraScale Support Request Received",
    html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for contacting InfraScale.</p>
      <p>Your request has been successfully received.</p>
      <p>Our engineers will contact you shortly.</p>
      <br/>
      <b>InfraScale Engineering Team</b>
    `
  };

  await transporter.sendMail(adminMail);
  await transporter.sendMail(userMail);
};

module.exports = sendContactEmails;
