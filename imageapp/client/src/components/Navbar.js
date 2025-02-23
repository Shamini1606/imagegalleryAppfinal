import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false); // Close the dropdown
  };

  return (
    <nav>
      <NavLink to="/home">
        <i className="fas fa-home"></i> Home
      </NavLink>
      <NavLink to="/upload">
        <i className="fas fa-upload"></i> Upload Image
      </NavLink>
      <NavLink to="/gallery">
        <i className="fas fa-images"></i> Gallery
      </NavLink>
      <NavLink to="/">
        <i className="fas fa-user"></i> Login
      </NavLink>
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropbtn">
          <i className="fas fa-ellipsis-v"></i> More
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            <NavLink to="/about" onClick={handleLinkClick}>
              <i className="fas fa-info-circle"></i> About
            </NavLink>
            {/* <NavLink to="/contact" onClick={handleLinkClick}>
              <i className="fas fa-envelope"></i> Contact
            </NavLink>
            <NavLink to="/help" onClick={handleLinkClick}>
              <i className="fas fa-question-circle"></i> Help
            </NavLink> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
