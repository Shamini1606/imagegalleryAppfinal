// crc/pages/Login.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../styles/Login.css"; // Import specific CSS for Login

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login";

    try {
      const response = await axios.post(url, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);

      // Set success message and redirect
      const message = "Logged in successfully!";
      setSuccessMessage(message);
      setTimeout(() => {
        setSuccessMessage(""); // Clear message after 2 seconds
        navigate("/"); // Redirect to home page after login
      }, 2000);
    } catch (error) {
      console.error("Error during authentication:", error);
      alert(
        error.response?.data?.message ||
          "Authentication failed. Please try again."
      );
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <h2>Login</h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? "🔒" : "👁️"}
            </span>
          </div>
          <button type="submit">Login</button>
          <br />
          <button type="button" onClick={() => navigate("/signup")}>
            Switch to Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
