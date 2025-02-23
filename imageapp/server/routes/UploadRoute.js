// routes/UploadRoutes.js

const { Router } = require("express");
const multer = require("multer"); // Import multer
const uploadMiddleware = require("../middlewares/MulterMiddleware");
const UploadModel = require("../models/UploadModel");

const router = Router();

// GET route to fetch all photos
router.get("/get", async (req, res) => {
  try {
    const allPhotos = await UploadModel.find().sort({
      createdAt: "descending",
    });
    res.status(200).json(allPhotos); // Use status 200 for successful GET
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ error: "Failed to fetch photos." });
  }
});

// POST route to save an uploaded photo
router.post("/images", uploadMiddleware.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { title, description } = req.body;
    const imageUrl = req.file.filename; // Adjust based on how you store the image

    // Create a new entry in the database
    const newImage = await ImageModel.create({ title, description, imageUrl });
    res.status(201).json(newImage); // Respond with the created image data
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({ error: "Failed to save the image." });
  }
});

// Error handling middleware for Multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    return res.status(500).json({ error: err.message });
  } else if (err) {
    // An unknown error occurred when uploading.
    return res.status(500).json({ error: "An unknown error occurred." });
  }
  next();
});

module.exports = router;
