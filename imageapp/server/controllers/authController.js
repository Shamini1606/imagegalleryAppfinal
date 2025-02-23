//controllers/authController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// controllers/authController.js
exports.register = [
  // Validate and sanitize input
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  body("email").isEmail().withMessage("Invalid email address."),
  body("phone").isMobilePhone().withMessage("Invalid phone number."),
  body("dob").isDate().withMessage("Invalid date of birth."),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password, email, phone, dob } = req.body;

      // Check for existing user by username or email
      const existingUser = await User.findOne({
        $or: [
          { username: username.toLowerCase() },
          { email: email.toLowerCase() },
        ],
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username: username.toLowerCase(),
        password: hashedPassword,
        email,
        phone,
        dob,
      });
      await user.save();

      res.status(201).json({ message: "User  registered successfully." });
    } catch (error) {
      console.error("Registration error:", error);
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  },
];
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
