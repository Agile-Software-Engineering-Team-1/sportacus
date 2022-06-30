import React, { useState } from "react";
import LoginForm from "./LoginForm";
import './LoginPage.css';

function LoginPage() {

  const userCredentials = {
    username: "User1",
    password: "password"
  }

  const [user, setUser] = useState({username: ""});
  const [error, setError] = useState("");

  function Login(details) {
    console.log(details);

    if (details.username === userCredentials.username && details.password === userCredentials.password) {
      console.log("Logged in!");
      setUser({username: details.username});
    } else {
      console.log("Unknown username or password!");
      setError("Unknown username or password!");
    }
  }

  const Logout = () => {
    console.log("Logged out!");
    setUser({username: ""});
    setError("");
  }

  return ( 
    <div className="LoginPage">
      {(user.username !== "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.username}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />

      )}
    </div>
  )
}

export default LoginPage;