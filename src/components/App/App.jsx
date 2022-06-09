import React from "react";
import './App.css';
import Header from "../Header/Header"
import TeamsContainer from "../TeamsContainer/TeamsContainer";
import Stats from "../Stats/Stats"
import LoginPage from "../LoginPage/LoginPage"

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
