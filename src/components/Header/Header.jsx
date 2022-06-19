import React from 'react';
import "./Header.css";
import logo from '../../assets/sportacus_temp_logo.svg';

function Header() {

  return (
    <div class="Header">
        <div class="Logo">
        <img width="75%" src={logo} alt="Sportacus Logo" class="img"/>
        </div>
    </div>
  );
}

export default Header;