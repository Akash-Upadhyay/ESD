import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home-module.css';
import homeBackground from '../images/home-t.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Redirects to the login page
  };

  return (
    <div
      className='container'
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      <div className={'overlay'}>
        <h1 className={'heading'}>Welcome to Academia IIITB</h1>
        <p className={'text'}>Your Gateway to Course Enrollment.</p>
        <button className={'button'} onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
