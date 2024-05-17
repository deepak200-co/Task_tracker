// frontend/src/App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Login from './Login/Login';
import Signup from "./Login/Signup";
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './context/Authcontext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
