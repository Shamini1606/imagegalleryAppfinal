const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const UploadRoute = require("./routes/UploadRoute");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Connect to the database
connectDB(); // Ensure this function handles the connection properly

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/upload", UploadRoute); // Ensure this is a valid route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
