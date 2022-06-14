import React from "react";
import './App.css';
import Header from "../Header/Header"
import TeamsContainer from "../TeamsContainer/TeamsContainer"
import Stats from "../Stats/Stats"
import LoginPage from "../LoginPage/LoginPage"
import Login from '../../Views/auth/Login'
import Signup from '../../Views/auth/Signup'
import Logout from '../../Views/auth/Logout'


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
          <Route exact path="/LoginPage" element={<LoginPage/>}/>
          <Route exact path="/Stats" element={<Stats/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/Signup" element={<Signup/>}/>
          <Route exact path="/Logout" element={<Logout/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
