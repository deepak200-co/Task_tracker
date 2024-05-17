import './Login.css';
import React, { useState, useEffect, useRef } from "react";
import  auth  from '../firebase';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Googlebutton from 'react-google-button'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';


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
  const formContainerRef = useRef(null);
  const navigate = useNavigate();


  const handleGoToSignup = () => {
    setTimeout(() => {
      navigate('/signup');
    }, 900);
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
    const user = {
      email
  };

  axios.post(`http://localhost:5000/login`, user);
  }
  const handleGoogleSignIn = () => {
    signInWithGoogle();

    if (googleuser && googleuser.email) {
        const user = {
            email: googleuser.email,
        };
        axios.post(`http://localhost:5000/login`, user);
    }
};

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
      {/* <div className="Login-container">
        <div ref={formContainerRef} class="form-container box">
          <div className="form-box"> */}
    <div className="logcir"></div>
      <div className="loginpage">
        <img
          className="logipic"
          src="https://raw.githubusercontent.com/trananhtuat/animated-login-registration/353a7bb31a0e21f6344af06868805656476d26d3/assets/undraw_creative_team_r90h.svg"
          alt=""
        />
        <div className="login">
          <div className="drop">
            <form onSubmit={handleSubmit}>
            <span className="loginTitle">LOGIN</span>
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
                <button type="submit" className="loginButton" onClick={() => signInWithEmailAndPassword(email, password)}>Login</button>
            </form>
            <hr />
            <div className="google-btn">
              <Googlebutton
                className="g-btn"
                type="light"
                onClick={handleGoogleSignIn}
              />

            </div>
            <div className='loginRegisterButton' onClick={handleGoToSignup}>
          Don't have an account?
              <span  style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: '600',
                marginLeft: '5px',
                cursor: 'pointer',
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
