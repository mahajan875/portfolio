const router = require("express").Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
});

router.post("/", async (req, res) => {
  await transporter.sendMail({
    from: req.body.email,
    to: process.env.EMAIL,
    subject: "Portfolio Contact",
    text: req.body.message,
  });
  res.json("Sent");
});

module.exports = router;