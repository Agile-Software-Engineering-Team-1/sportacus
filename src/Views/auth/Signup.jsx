import React, { Component } from "react";
import axiosInstance from "../../axiosApi";
import '../../components/Profile/Profile.css'
import nflTeamNames from '../../json-data/nfl-team-names.json'
import colTeamNames from "../../json-data/ncaaf-team-names.json";
import DropdownTeam from '../../components/Dropdown/DropdownTeam';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email:"",
            fav_nfl:"None",
            fav_col:"None",
            errors:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/user/create/', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                fav_nfl: this.state.fav_nfl,
                fav_col: this.state.fav_col
            });
            window.alert("Success. Redirecting to Login page.")
            window.location.replace('http://localhost:3000/Login');
            return response;
        } catch (error) {
            console.log(error.stack);
            this.setState({
                errors:error.response.data
            });
        }
    }



    render() {
        return (
            <div className="profile-info">
            <center>
                <h1>Signup</h1>
                <form onSubmit={this.handleSubmit}>
                    <label className= 'profile-item'>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                        { this.state.errors.username ? this.state.errors.username : null}
                    </label>
                    <label className= 'profile-item'>
                        Email:
                        <input name="email" type="text" value={this.state.email} onChange={this.handleChange}/>
                        { this.state.errors.email ? this.state.errors.email : null}
                    </label>
                    <label className= 'profile-item'>
                        Password:
                        <input name="password" type="text" value={this.state.password} onChange={this.handleChange}/>
                        { this.state.errors.password ? this.state.errors.password : null}
                    </label>
                    <label className= 'profile-item'>
                        Favorite NFL Team:
                        <div><label className='Dropdown2' ><DropdownTeam namesFile={nflTeamNames} changeValue={nflTeam => this.state.fav_nfl = nflTeam}/> </label></div>
                        { this.state.errors.fav_nfl ? this.state.errors.fav_nfl : null}
                    </label>
                    <label className= 'profile-item'>
                        Favorite NCAAF Team:
                        <div><label className='Dropdown2' > <DropdownTeam namesFile={nflTeamNames} changeValue={colTeam => this.state.fav_col = colTeam}/>  </label></div>
                        { this.state.errors.fav_col ? this.state.errors.fav_col : null}
                    </label>
                    <input className='profile-item-save' type="submit" value="SIGN UP" />
                </form>
                </center>
            </div>
        )
    }
}

export default Signup;