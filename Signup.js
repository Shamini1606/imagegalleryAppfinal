// crc/pages/Signup.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../styles/Signup.css"; // Import specific CSS for Signup

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/register";

    // Registration validation
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits.");
      return;
    }
    if (new Date(dob) >= new Date()) {
      alert("Date of birth cannot be a future date.");
      return;
    }

    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if (age < 13) {
      alert("You must be at least 13 years old to register.");
      return;
    }

    try {
      const response = await axios.post(url, {
        name,
        email,
        phone,
        username,
        password,
        dob,
      });
      localStorage.setItem("token", response.data.token);

      // Set success message and redirect
      const message = "Registered successfully!";
      setSuccessMessage(message);
      setTimeout(() => {
        setSuccessMessage(""); // Clear message after 2 seconds
        navigate("/login"); // Redirect to login page after registration
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <h2>Sign Up</h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            required
          />
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
              {showPassword ? " 🔒" : "👁️"}
            </span>
          </div>
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? "🔒" : "👁️"}
            </span>
          </div>
          <button type="submit">Register</button>
          <br />
          <button type="button" onClick={() => navigate("/login")}>
            Switch to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
