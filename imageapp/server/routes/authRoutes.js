const express = require("express");
const { register, login } = require("../controllers/authController");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const registerValidation = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  body("email").isEmail().withMessage("Invalid email address."),
  body("phone").isMobilePhone("any").withMessage("Invalid phone number."), // Specify locale if needed
  body("dob").isDate().withMessage("Invalid date of birth."),
];

const loginValidation = [
  body("username").notEmpty().withMessage("Username is required."),
  body("password").notEmpty().withMessage("Password is required."),
];

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Register route
router.post("/register", registerValidation, validate, register);

// Login route
router.post("/login", loginValidation, validate, login);

module.exports = router;
