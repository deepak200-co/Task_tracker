import React, { useState } from 'react';
import './Header.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase';

const Header = () => {
  const [user] = useAuthState(auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setDropdownOpen(false);
      window.location.href = '/login';
    });
  };

  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        {user && (
          <div className='user-info'>
            <span className='welcome-text'>Welcome, {user.displayName}</span>
          </div>
        )}
      </div>
      <div className='navbar-center'>
        <h1>Task Tracker</h1>
      </div>
      <div className='navbar-right'>
        {user && (
          <div className='user-info' onClick={toggleDropdown}>
            <img src={user.photoURL} alt='User Profile' className='profile-pic' />
            <span className='user-name'>{user.displayName}</span>
            {dropdownOpen && (
              <div className="dropdown-content">
                <button onClick={handleLogout}>Logout</button>
                <button onClick={toggleDropdown}>Close</button>

              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
