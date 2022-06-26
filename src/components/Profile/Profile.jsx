import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-dropdown-now';
import nflTeamNames from '../../json-data/nfl-team-names.json'
import colTeamNames from "../../json-data/ncaaf-team-names.json";
import DropdownTeam from '../Dropdown/DropdownTeam';
import './Profile.css';

/*
      <label className='profile-item' htmlFor="NFL Favorite:">NFL Favorite:
        <DropdownTeam className='dropdown' statFile={StatDataNFL} />
      </label>

      <label className='profile-item' htmlFor="NFL Favorite:">NCAA Favorite:
        <DropdownTeam className='dropdown' statFile={StatDataNCAAF} />
      </label>

      <input type="text" defaultValue = {details.fav_nfl} name="fav_nfl" id="fav_nfl" onChange={e => setDetails({...details, fav_nfl: e.target.value})} vaule={details.fav_nfl}/>
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
const [nflTeam, setValue1] = useState(localStorage.nfl);
const [colTeam, setValue2] = useState("Team Selection");

    function ChangeProfile(details) {
        if(details.email == ""){
            window.alert("Update requires email.")
        }
        else if(details.email.includes('@') == false){
            window.alert("Invalid email address. Requires '@'")
        }
        else{
        window.alert(nflTeam)
            const headers = { 'Content-Type': 'application/json' }
                    fetch('http://127.0.0.1:8000/user/info/' + localStorage.username + details.email + '/' + nflTeam + '/' + details.fav_col, { headers })
                    .then(response => response.text())
                    .then(data => {
                        window.alert(data);
                                            fetch('http://127.0.0.1:8000/user/info/' + localStorage.username, { headers })
                                            .then(response => response.text())
                                            .then(data => {
                                            const teams = data.split(',');
                                            teams[0] = teams[0].substring(2,teams[0].length-1);
                                            teams[1] = teams[1].substring(2,teams[1].length-1);
                                            teams[2] = teams[2].substring(2,teams[2].length-2);
                                            localStorage.setItem('nfl',teams[0]);
                                            localStorage.setItem('col',teams[1]);
                                            localStorage.setItem('email',teams[2])
                                            })
                    })
        }
    }



  return (
    <form onSubmit={submitHandler}>
    <div className="profile-info">
      <h1>Profile</h1>
      <label className='profile-item' htmlFor="username">Username: {localStorage.username.substring(0,localStorage.username.length-1)}</label>
      <label className= 'profile-item'> <text> Email: </text><input type="text" defaultValue = {details.email} name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} vaule={details.email}/></label>
      <label className='profile-item' ><text> Favorite NFL team: </text> </label>
      <label className = 'profile-item'><DropdownTeam namesFile={nflTeamNames} changeValue={nflTeam => setValue1(nflTeam)}/> </label>
      <label className='profile-item' ><text> Favorite NCAAF team: </text> <input type="text" defaultValue = {details.fav_col} name="fav_col" id="fav_col" onChange={e => setDetails({...details, fav_col: e.target.value})} vaule={details.fav_col}/></label>
      <input className='profile-item-save' type="submit" value="UPDATE PROFILE" />
    </div>
    </form>
  );
}

export default Profile;