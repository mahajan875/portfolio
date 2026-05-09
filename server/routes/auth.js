const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// register
router.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  await new User({ email: req.body.email, password: hash }).save();
  res.json("Registered");
});

// login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).json("Wrong password");

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;