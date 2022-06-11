import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StatsComponent from './StatsComponent';
import DropDownTeam from './DropDownTeam';
import StatData from "./json-data/nfl-teams.json";

//ReactDOM.render(<DropDownTeam statFile={StatData}/>,document.getElementById('root'));
//ReactDOM.render(<StatsComponent teamName="" statFile={StatData}/>,document.getElementById('root'));

ReactDOM.render(<App/>, document.getElementById('root'));
