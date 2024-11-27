//import homeBackground from '../images/home-t.jpg';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Redirects to the login page
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Welcome to Academia IIITB</h1>
        <p style={styles.text}>Explore, Enroll, and Achieve your academic goals!</p>
        <button style={styles.button} onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    //backgroundImage: `url(${homeBackground})`, // Use backticks for template literals
    //backgroundSize: 'cover',
    //backgroundPosition: 'center',
    //position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay with less opacity for a lighter effect
    padding: '30px 40px',
    borderRadius: '15px',
    textAlign: 'center',
    color: '#fff',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)', // Add shadow for a modern touch
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '0.8rem',
    fontWeight: '700',
    color: '#ff8c00', // Bright color to make the title stand out
  },
  text: {
    fontSize: '1.4rem',
    marginBottom: '2rem',
    fontStyle: 'italic',
    color: '#f5f5f5', // Lighter shade for the text to differentiate from the title
  },
  button: {
    padding: '12px 25px',
    fontSize: '1.1rem',
    color: '#fff',
    backgroundColor: '#28a745', // Fresh green button for a positive, inviting action
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s',
  },
  buttonHover: {
    backgroundColor: '#218838', // Darker shade when hovered
    transform: 'scale(1.05)', // Slight increase in size on hover
  },
};

export default Home;
