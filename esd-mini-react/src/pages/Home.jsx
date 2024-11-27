import React from "react";
import Navbar from "../components/Navbar";
import "../styles/home.css"; // Import CSS styles

function Home() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-box">
          <h1>Welcome to ACADEMIA</h1>
          <p>Your gateway to quality education and seamless learning management. Explore courses, manage enrollments, and much more!</p>
        </div>
      </div>
    </>
  );
}

export default Home;
