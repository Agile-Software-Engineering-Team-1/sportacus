import React, { useState, useEffect, Fragment } from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className="profile-info">
      <label className='profile-item' htmlFor="username">Username:</label>
      <label className='profile-item' htmlFor='email'>Email:</label>
      <label className='profile-item' htmlFor="NFL Favorite:"></label>
      <label className='profile-item' htmlFor=''></label>
      <input className='profile-item' type="submit" value="SAVE" />
    </div>
  );
}

export default Profile;