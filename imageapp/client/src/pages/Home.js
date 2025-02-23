// src/pages/Home.js

import React from 'react';
import '../styles/Home.css'; 


const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to the Image Gallery App</h1>
        <p>Discover, upload, and share your favorite images with the world.</p>
        <a href="/upload" className="cta-button">Upload Your Image</a>
      </header>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>Easy Uploads</h3>
            <p>Quickly upload your images with our user-friendly interface.</p>
          </div>
          <div className="feature">
            <h3>Image Gallery</h3>
            <p>Browse through a stunning collection of images shared by users.</p>
          </div>
          <div className="feature">
            <h3>Community Sharing</h3>
            <p>Connect with other photography enthusiasts and share your work.</p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>
          We are passionate about photography and believe in the power of sharing beautiful moments. Our platform allows users to showcase their creativity and connect with others who share their interests.
        </p>
      </section>

     
    </div>
  );
};

export default Home;