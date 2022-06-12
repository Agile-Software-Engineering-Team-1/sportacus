import React, { useState, useEffect, Fragment }  from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';

function Header() {

// The following code is used to tell if a user is logged in
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);
// End


  return (
    <nav className="topnav">
      {isAuth === true ? (
          <Fragment>
            {' '}
      <a className='nav-link' href="/Stats">Home</a>
      <a className='nav-link' href="/Contact">Contact</a>
      <a className='nav-link' href="/About">About</a>
      <a className='nav-link' href="/LoginPage">Logout</a>
          </Fragment>
            ) : (
    <fragment>
      <a className='nav-link' href="/Stats">Home</a>
      <a className='nav-link' href="/Contact">Contact</a>
      <a className='nav-link' href="/About">About</a>
      <a className='nav-link' href="/LoginPage">Login</a>
      <a className='nav-link' href="/Signup">Signup</a> //todo signup jsx
      </fragment>
         )}
    </nav>
  );
}

export default Header;