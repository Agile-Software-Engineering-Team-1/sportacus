import React from 'react';
import "./Header.css";

function Header() {
  return (
    <nav className="topnav">
      <a className='nav-link' href="/Stats">Home</a>
      <a className='nav-link' href="/LoginPage">Login</a>
      <a className='nav-link' href="/Contact">Contact</a>
      <a className='nav-link' href="/About">About</a>
    </nav>
  );
}

export default Header;