import React from 'react';
import "./Header.css";

function Header() {
  return (
    <nav className="topnav">
      <a className='nav-link' href="#home">Home</a>
      <a className='nav-link' href="#news">Login</a>
      <a className='nav-link' href="#contact">Contact</a>
      <a className='nav-link' href="#about">About</a>
    </nav>
  );
}

export default Header;