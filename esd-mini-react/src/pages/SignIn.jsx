import React, { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import SigninCard from '../components/SigninCard'

function SignIn() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

    // Check login status on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);

    // If already logged in, redirect to the /enroll page
    if (loggedInStatus) {
      navigate('/enroll');
    }
  }, [navigate]);

  useEffect(
    ()=>{
      fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
    },[]);

  return (
    <>
      <Navbar />
      <div className="container">
        <SigninCard />
      </div>
    </>
  )
}

export default SignIn;