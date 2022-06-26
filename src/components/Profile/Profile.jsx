import React, { useState, useEffect } from 'react';
import StatDataNFL from '../../json-data/nfl-teams.json'
import StatDataNCAAF from "../../json-data/ncaaf-teams.json";
import DropdownTeam from '../Dropdown/DropdownTeam';
import './Profile.css';

/*
      <label className='profile-item' htmlFor="NFL Favorite:">NFL Favorite:
        <DropdownTeam className='dropdown' statFile={StatDataNFL} />
      </label>

      <label className='profile-item' htmlFor="NFL Favorite:">NCAA Favorite:
        <DropdownTeam className='dropdown' statFile={StatDataNCAAF} />
      </label>
*/

function Profile() {
  return (
    <div className="profile-info">
      <h1>Profile</h1>
      <label className='profile-item' htmlFor="username">Username: {localStorage.username.substring(0,localStorage.username.length-1)}</label>
      <label className='profile-item' htmlFor='email'>Email: {localStorage.email}</label>
      <label className='profile-item' htmlFor='email'>Favorite NFl team: {localStorage.nfl}</label>
      <label className='profile-item' htmlFor='email'>Favorite NCAAF team: {localStorage.col}</label>
      <input className='profile-item save' type="submit" value="SAVE" />
    </div>
  );
}

export default Profile;