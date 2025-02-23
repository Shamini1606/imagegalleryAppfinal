// src/pages/ImageGallery.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/ImageGallery.css';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null); // State to hold error messages

  const fetchImages = async () => {
    try {
      const response = await axios.get("/api/images", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Fetched images:", response.data); // Log the fetched images
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error); // Log the error
      setError("Failed to fetch images. Please try again."); // Set error message
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/images/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchImages(); // Refresh the image list
    } catch (error) {
      console.error("Error deleting image:", error); // Log the error
      setError("Failed to delete image. Please try again."); // Set error message
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <div className="gallery">
        {images.map((image) => (
          <div key={image._id}>
            <img src={image.imageUrl} alt={image.title} />
            <h2>{image.title}</h2>
            <p>{image.description}</p>
            <button onClick={() => handleDelete(image._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;