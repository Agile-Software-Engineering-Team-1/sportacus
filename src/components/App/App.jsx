import React from "react";
import './App.css';
import Header from "../Header/Header"
import StatsContainer from "../StatsContainer/StatsContainer"
import LoginPage from "../LoginPage/LoginPage"
import Login from '../../Views/auth/Login'
import Signup from '../../Views/auth/Signup'
import Logout from '../../Views/auth/Logout'
// import Profile from '../Profile/Profile'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Routes>
          <Route exact path="" element={<StatsContainer/>}/>
          <Route exact path="/LoginPage" element={<LoginPage/>}/>
          <Route exact path="/Stats" element={<StatsContainer/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/Signup" element={<Signup/>}/>
          <Route exact path="/Logout" element={<Logout/>}/>
          {/* <Route exact path="/Profile" element={<Profile/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
