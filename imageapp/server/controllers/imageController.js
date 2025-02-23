// controllers/imageController.js
const Image = require('../models/Image');

exports.uploadImage = async (req, res) => {
    try {
        const { title, description } = req.body;
        const imageUrl = req.file.path; // Ensure this is the correct path

        // Validate title and description
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        const image = new Image({ title, description, imageUrl, userId: req.user.id });
        await image.save();
        res.status(201).json(image);
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Failed to upload image." });
    }
};

exports.getImages = async (req, res) => {
    try {
        const images = await Image.find({ userId: req.user.id });
        res.json(images);
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ message: "Failed to fetch images." });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedImage = await Image.findByIdAndDelete(id);

        if (!deletedImage) {
            return res.status(404).json({ message: "Image not found." });
        }

        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: "Failed to delete image." });
    }
};