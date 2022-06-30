import React, { useState, useEffect, Fragment } from 'react';
import "./Header.css";
import logo from '../../assets/sportacus_temp_logo.svg';
import "../../assets/bootstrap/dist/css/bootstrap.css"


function Header() {
  // The following code is used to tell if a user is logged in
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
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
	      <li><button class="nav-link" type="button" onClick={(e) => {e.preventDefault(); window.location.href='/Stats';}}>Stats</button></li>
              <li><button class="nav-link" type="button" onClick={(e) => {e.preventDefault(); window.location.href='/About';}}>About</button></li>
              <li className='push'><button class="nav-link" type="button" onClick={(e) => {e.preventDefault(); window.location.href='/Profile';}}>{localStorage.username.substring(0,localStorage.username.length-1)}</button></li>
              <li><button class="nav-link" type="button" onClick={(e) => {e.preventDefault(); window.location.href='/Logout';}}>Logout</button></li>
            </ul>
          ) : (
            <ul className='main-nav'>
              <li><button class="outline-primary" type="button" onClick={(e) => {e.preventDefault(); window.location.href='/Stats';}}>Stats</button></li>
              <li><button class="nav-link" type="button" onClick={(e) => {e.preventDefault(); window.location.href='/About';}}>About</button></li>
	      <li className='push'><button class="nav-link" type="button" onClick={(e) => {e.preventDefault(); window.location.href='/Login';}}>Login</button></li>
	      <li><button class="nav-link" type="button" onClick={(e) => {e.preventDefault(); window.location.href='/Signup';}}>Sign Up</button></li>
            </ul>
          )}
      </nav>
    </div>
  );
}

export default Header;
