import './Login.css';
import React, { useState, useEffect } from "react";
import { auth } from '../firebase';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Googlebutton from 'react-google-button'
import { useNavigate, Link } from 'react-router-dom';
import VanillaTilt from 'vanilla-tilt';




const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const box = document.querySelector('.form-container');

    VanillaTilt.init(box, {
      max: 25,
      speed: 400,
      glare: true,
    });

    return () => {
      box.vanillaTilt.destroy();
    };
  }, []); 

  const handleGoToSignup = () => {
    const formContainer = document.querySelector('.form-container');
    formContainer.classList.add('rotate');

    setTimeout(() => {
      navigate('/signup');
      formContainer.classList.remove('rotate');
    }, 300);
  };



  if (error) {
    console.log(error.message)
  }
  if (user || googleuser) {
    navigate('/')
    console.log(user)
    console.log(googleuser)
  }
  if (loading) {
    console.log('loading....')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.email}</p>
      </div>
    );
  }
  

  return (
    <>
      <div className="Login-container">
        <div class="form-container box">
          <div className="form-box">
            <form onSubmit={handleSubmit}>
              <input type="email"
                className="email"
                placeholder="email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input type="password"
                className="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="btn-login">
                <button type="submit" className="btn" onClick={() => signInWithEmailAndPassword(email, password)}>Login</button>
              </div>
            </form>
            <hr />
            <div className="google-btn">
              <Googlebutton
                className="g-btn"
                type="light"
                onClick={handleGoogleSignIn}
              />

            </div>
            <div className='sign-login'>
              Don't have an account?
              <span onClick={handleGoToSignup} style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: '600',
                marginLeft: '5px',
                cursor: 'pointer', // Add cursor pointer for better UX
              }}>
                Signup
              </span>
            </div>
          </div>

        </div>

      </div>
    </>

  );
};

export default Login;
