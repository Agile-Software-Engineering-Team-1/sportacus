import React, { useState, useEffect, Fragment } from 'react';
import StatDataNFL from '../../json-data/nfl-teams.json'
import StatDataNCAAF from "../../json-data/ncaaf-teams.json";
import DropdownTeam from '../Dropdown/DropdownTeam';
import './Profile.css';

function Profile() {
  return (
    <div className="profile-info">
      <h1>Profile</h1>
      <label className='profile-item' htmlFor="username">Username: {/* GET username */}</label>
      <label className='profile-item' htmlFor='email'>Email: {/* GET email */}</label>
      <label className='profile-item' htmlFor="NFL Favorite:">NFL Favorite:
        <DropdownTeam className='dropdown' statFile={StatDataNFL} />
      </label>

      <label className='profile-item' htmlFor="NFL Favorite:">NCAA Favorite:
        <DropdownTeam className='dropdown' statFile={StatDataNCAAF} />
      </label>

      <input className='profile-item save' type="submit" value="SAVE" />
    </div>
  );
}

export default Profile;