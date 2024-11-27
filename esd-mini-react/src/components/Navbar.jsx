import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

    // Check login status on component mount
    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, []);

    // Logout function
    const handleLogout = () => {
      // Clear login-related data from localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      // Update state to reflect logout
      setIsLoggedIn(false);
      navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Academia
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <a className="nav-link" href="/enroll">
                    Enroll
                  </a>
                </li>
              )}
               {isLoggedIn && (
                <li className="nav-item">
                  <a className="nav-link" href="/enrolled_courses">
                    Enrolled Courses
                  </a>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ms-auto">
              {!isLoggedIn && (
                <li className="nav-item">
                  <a className="nav-link" href="/signin">
                    Log in
                  </a>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;
