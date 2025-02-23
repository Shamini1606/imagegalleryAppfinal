// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address."],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits."],
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value <= new Date(); 
      },
      message: "Date of birth cannot be in the future.",
    },
  },
});

// Method to check if the user is an adult
userSchema.methods.isAdult = function () {
  const today = new Date();
  const age = today.getFullYear() - this.dob.getFullYear();
  const monthDiff = today.getMonth() - this.dob.getMonth();
  return age > 18 || (age === 18 && monthDiff >= 0);
};

module.exports = mongoose.model("User", userSchema); 
