import React, { useState, useEffect, Fragment } from 'react';
import "./Header.css";
import logo from '../../assets/sportacus_temp_logo.svg';

function Header() {
  // The following code is used to tell if a user is logged in
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
    // Uncommenting out the below code will display the current user's fav nfl/col team in an alert for debugging
    // window.alert(localStorage.nfl);
    // window.alert(localStorage.col);
  }, []);
  // End

  return (
    <div className='Header'>
      <div className='Logo'>
      <img width="75%" src={logo} alt="Sportacus Logo" className="img" />
      </div>
      <nav>
          {isAuth === true ? (
            <ul className='main-nav'>
              <li><a className='nav-link' href="/Stats">Home</a></li>
              <li><a className='nav-link' href="/About">About</a></li>
              <li className='push'><a className='nav-link' href="/Profile">Profile</a></li>
              <li><a className='nav-link' href="/Logout">Logout</a></li>
            </ul>
          ) : (
            <ul className='main-nav'>
              <li><a className='nav-link' href="/Stats">Home</a></li>
              <li><a className='nav-link' href="/About">About</a></li>
              <li className='push'><a className='nav-link' href="/Login">Login</a></li>
              <li><a className='nav-link' href="/Signup">Sign Up</a></li>
            </ul>
          )}
      </nav>
    </div>
  );
}

export default Header;