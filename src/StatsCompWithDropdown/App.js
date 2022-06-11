import React, { useState } from 'react';
import StatsComponent from './StatsComponent';
import DropDownTeam from './DropDownTeam';
import StatData from "./json-data/nfl-teams.json";

function App() {

  const [value, setValue] = useState("Selection");

  return (
    <div className="App">
      <header className="App-header">
      <div><DropDownTeam statFile={StatData} changeValue={value => setValue(value)}/></div>
      <div><StatsComponent teamName={value} statFile={StatData}/></div>
      </header>
    </div>
  );
}

export default App;
