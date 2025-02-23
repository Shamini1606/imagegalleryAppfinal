// routes/imageRoutes.js

const express = require("express");
const {
  uploadImage,
  getImages,
  deleteImage,
} = require("../controllers/imageController");
const { verifyToken } = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp as the filename
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

// Image upload route
router.post("/images", verifyToken, upload.single("image"), uploadImage); // Changed to /upload
router.get("/images", verifyToken, getImages); // Changed to /images
router.delete("/images/:id", verifyToken, deleteImage); // Ensure the delete route is correct

module.exports = router;
