import React, { useState } from "react";
import './Signup.css'
import auth from '../firebase';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Googlebutton from 'react-google-button'
import { useNavigate} from "react-router-dom";
import Regpic from '../assets/Regpic.jpg'
import axios from "axios";




const Signup = () => {
    const [username, setUsername] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
    const navigate = useNavigate();





    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

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

    const handleSubmit = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(email, password);

        const user = {
            username: username,
            name: name,
            email: email,

        }
        axios.post(`https://task-tracker-backend-bktk.onrender.com/register`, user);

    }
    const handleGoogleSignIn = () => {
        signInWithGoogle();
        const user = {
            name: googleuser.displayName,
            email: googleuser.email,
        };

        axios.post(`https://task-tracker-backend-bktk.onrender.com/register`, user);
    }


    const handleGoToLogin = () => {
        setTimeout(() => {
            navigate('/login');
        }, 300);
    };
    return (
        <div className="registration">
        <div className="reg"></div>
        <div>
            <h2 className="registermain">Join with us</h2>
            <p className="sufi">heartly thankful to join our club</p>
            <img className="Regim" src={Regpic} alt="img" />
            <center>
                <div className="div1">
                    <center>
                        <div className="drop5">
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            className="display-name"
                            placeholder="@username"
                            onChange={(e) => setUsername(e.target.value)} />
                        <input type="text"
                            className="display-name"
                            placeholder="Enter full name"
                            onChange={(e) => setUsername(e.target.value)} />
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
                            <button type="submit" className="loginButton" onClick={() => createUserWithEmailAndPassword(email, password)}>Signup</button>
                    </form>
                   
                    <hr />
                                <div className="google-btn">
                                    <Googlebutton
                                        className="g-btn"
                                        type="light"
                                        onClick={handleGoogleSignIn}
                                    />

                                </div>
                            </div>
                            <div className='registrationLoginButton' onClick={handleGoToLogin} >
                                Already have an account?
                                <span style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    fontWeight: '600',
                                    marginLeft: '5px',
                                    cursor: 'pointer', 
                                }}>
                                    Login
                                </span>
                            </div>
                        </center>
                    </div>
                </center>
            </div>
        </div>
    )
}

export default Signup;
