import React, { Component } from "react";
import axiosInstance from "../../axiosApi";
import jwt_decode from "jwt-decode";
import axios from "axios"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "",totalReactPackages:null};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
        this.handleAllSubmit = this.handleAllSubmit.bind(this);
        if (localStorage.getItem('access_token') !== null){
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('username');
            localStorage.removeItem('nfl');
            localStorage.removeItem('col');
            window.alert("Logged out!")
        }
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmitWThen(event){
        event.preventDefault();
        axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            }).then(
                result => {
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                    localStorage.setItem('access_token', result.data.access);
                    localStorage.setItem('refresh_token', result.data.refresh);
                    localStorage.setItem('username',this.state.username + '/');

                    const headers = { 'Content-Type': 'application/json' }
                    fetch('http://127.0.0.1:8000/user/info/' + localStorage.username, { headers })
                    .then(response => response.text())
                    .then(data => {
                        const teams = data.split(',');
                        teams[0] = teams[0].substring(2,teams[0].length-1);
                        teams[1] = teams[1].substring(2,teams[1].length-2);
                        localStorage.setItem('nfl',teams[0]);
                        localStorage.setItem('col',teams[1]);
                        })
                }
            ).catch (error => {
            window.alert('error')
                throw error;
            })
    }
    handleAllSubmit(event){
        this.handleSubmitWThen(event);
        setTimeout(() => { if(localStorage.username != undefined){
            window.alert("Username: " + localStorage.username.substring(0,localStorage.username.length-1));
            window.alert("Favorite NFL Team: " + localStorage.nfl);
            window.alert("Favorite College Team: " + localStorage.col);
            window.location.replace("http://127.0.0.1:3000/Stats");
            }
            else{
            window.alert("There was an error logging in.");
            window.location.replace("http://127.0.0.1:3000/Login");
            }
         }, 500);
    }

    render() {
        return (
            <div>
                Login
                <form onSubmit={this.handleAllSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
export default Login;