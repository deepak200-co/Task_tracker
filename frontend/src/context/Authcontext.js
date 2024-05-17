// frontend/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setAuth({ user: response.data, token });
        })
        .catch(() => {
          localStorage.removeItem('token');
          setAuth({ user: null, token: null });
        });
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/api/users/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    setAuth({ user: response.data.user, token });
  };

  const signup = async (email, password) => {
    await axios.post('/api/users/signup', { email, password });
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
