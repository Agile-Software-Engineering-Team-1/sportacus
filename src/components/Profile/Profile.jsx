import React, { useState, useEffect, Fragment } from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className="profile-info">
      <h1>Profile</h1>
      <label className='profile-item' htmlFor="username">Username: {/* GET username */}</label>
      <label className='profile-item' htmlFor='email'>Email: {/* GET email */}</label>
      <label className='profile-item' htmlFor="NFL Favorite:">NFL Favorite
        <select className='nfl-dropdown dropdown'>
          {/* Fill in options from what we can get from the API*/}
          <option value="">team name</option>
        </select>
      </label>

      <label className='profile-item' htmlFor="NFL Favorite:">NCAA Favorite
        <select className='ncaa-dropdown dropdown'>
          {/* Fill in options from what we can get from the API*/}
          <option value="">team name</option>
        </select>
      </label>

      <input className='profile-item save' type="submit" value="SAVE" />
    </div>
  );
}

export default Profile;