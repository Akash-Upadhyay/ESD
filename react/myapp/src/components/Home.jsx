// import homeBackground from '../images/home-t.jpg';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate('/login'); // Redirects to the login page
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.overlay}>
//         <h1 style={styles.heading}>Welcome to Academia IIITB</h1>
//         <p style={styles.text}>Your gateway to Course Enrollment.</p>
//         <button style={styles.button} onClick={handleLoginClick}>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundImage: `url(${homeBackground})`, // Use backticks for template literals
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     position: 'relative',
//   },
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent black overlay
//     padding: '20px',
//     borderRadius: '10px',
//     textAlign: 'center',
//     color: '#fff',
//   },
//   heading: {
//     fontSize: '2.5rem',
//     marginBottom: '1rem',
//   },
//   text: {
//     fontSize: '1.25rem',
//     marginBottom: '2rem',
//   },
//   button: {
//     padding: '10px 20px',
//     fontSize: '1rem',
//     color: '#fff',
//     backgroundColor: '#007bff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
// };

// export default Home;


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
        <p className={'text'}>Your gateway to Course Enrollment.</p>
        <button className={'button'} onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
