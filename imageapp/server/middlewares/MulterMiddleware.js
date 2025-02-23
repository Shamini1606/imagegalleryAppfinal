const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Set up storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`); // Use original file extension
  },
});

// File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only JPEG and PNG are allowed."), false); // Reject the file with an error
  }
};

// Create the upload middleware with optional file size limit (e.g., 5MB)
const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = uploadMiddleware;
