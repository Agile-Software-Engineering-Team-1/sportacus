import React, { Component } from "react";
import axiosInstance from "../../axiosApi";

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email:"",
            fav_nfl:"none",
            fav_col:"none",
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
            <div>
                Signup
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                        { this.state.errors.username ? this.state.errors.username : null}
                    </label>
                    <label>
                        Email:
                        <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                        { this.state.errors.email ? this.state.errors.email : null}
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                        { this.state.errors.password ? this.state.errors.password : null}
                    </label>
                    <label>
                        Favorite NFL Team:
                        <input name="fav_nfl" type="fav_nfl" value={this.state.fav_nfl} onChange={this.handleChange}/>
                        { this.state.errors.fav_nfl ? this.state.errors.fav_nfl : null}
                    </label>
                    <label>
                        Favorite NCAAF Team:
                        <input name="fav_col" type="fav_col" value={this.state.fav_col} onChange={this.handleChange}/>
                        { this.state.errors.fav_col ? this.state.errors.fav_col : null}
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default Signup;