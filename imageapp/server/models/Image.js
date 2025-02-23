// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User " }, // Reference to User model
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);