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
const [details, setDetails] = useState({username: localStorage.username.substring(0,localStorage.username.length-1),
                                        email: localStorage.email,
                                        fav_nfl: localStorage.nfl,
                                        fav_col: localStorage.col});
        const submitHandler = e => {
            e.preventDefault();
            ChangeProfile(details);
        }

    function ChangeProfile(details) {
        if(details.email == ""){
            window.alert("Update requires email.")
        }
        else{
            window.alert(details.email)
        }
    }

  return (
    <form onSubmit={submitHandler}>
    <div className="profile-info">
      <h1>Profile</h1>
      <label className='profile-item' htmlFor="username">Username: {localStorage.username.substring(0,localStorage.username.length-1)}</label>
      <label className= 'profile-item'> <text> Email: </text><input type="text" defaultValue = {details.email} name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} vaule={details.email}/></label>
      <label className='profile-item' ><text> Favorite NFL team: </text> <input type="text" defaultValue = {details.fav_nfl} name="fav_nfl" id="fav_nfl" onChange={e => setDetails({...details, fav_nfl: e.target.value})} vaule={details.fav_nfl}/></label>
      <label className='profile-item' ><text> Favorite NCAAF team: </text> <input type="text" defaultValue = {details.fav_col} name="fav_col" id="fav_col" onChange={e => setDetails({...details, fav_col: e.target.value})} vaule={details.fav_col}/></label>
      <input className='profile-item-save' type="submit" value="UPDATE PROFILE" />
    </div>
    </form>
  );
}

export default Profile;