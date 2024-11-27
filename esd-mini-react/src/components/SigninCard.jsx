import React, { useState } from 'react';
import { fetchLogin } from '../utils/login';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function SigninCard() {
  var [email, setEmail ] = useState('');
  var [password, setPassword ] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 
  const API_URL = config || "http://localhost:8080";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchLogin(email, password);
      if (response.success) {
        setErrorMessage('');
        navigate('/enrolled_courses');
      } else {
        setErrorMessage(response.message);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <div className="signin-container">
        <div className="sign-up">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h3 id="sign_up_header">Sign In</h3>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email Address"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </form >
        </div>
      </div>
    </>
  );
}

export default SigninCard;
