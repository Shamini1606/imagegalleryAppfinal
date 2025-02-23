// ImageUpload.js
import React, { useState } from "react"; // Import React and useState
import axios from "axios"; // Import axios
import "../styles/ImageUpload.css"; // Import your CSS styles

const ImageUpload = () => {
  const [title, setTitle] = useState(""); // State for title
  const [description, setDescription] = useState(""); // State for description
  const [image, setImage] = useState(null); // State for the image file
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.post("http://localhost:5000/api/images", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Image uploaded successfully!");
      // Reset form fields
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="upload">
      <div className="upload-container">
        <h2>Upload Image</h2>
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}{" "}
        {/* Display error message if exists */}
        <form onSubmit={handleSubmit} className="upload-form">
          {" "}
          {/* Form submission */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state
            placeholder="Image Title"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state
            placeholder="Image Description"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])} // Update image state
            required
          />
          <button type="submit">Upload Image</button> {/* Submit button */}
        </form>
      </div>
    </div>
  );
};

export default ImageUpload; // Export the component
