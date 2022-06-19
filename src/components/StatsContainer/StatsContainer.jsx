import "./StatsContainer.css"
import React, { useState } from 'react';
import StatsTable from '../StatsTable/StatsTable';
import ScheduleTable from '../ScheduleTable/ScheduleTable';
import DropdownSport from '../Dropdown/DropdownSport';
import DropdownTeam from '../Dropdown/DropdownTeam';
import DropdownYear from '../Dropdown/DropdownYear';
import StatDataNFL from "../../json-data/nfl-teams.json";
import ScheduleDataNFL from "../../json-data/nfl-schedules.json";
import StatDataNCAAF from "../../json-data/ncaaf-teams.json";
import ScheduleDataNCAAF from "../../json-data/ncaaf-schedules.json";

var StatData = null;
var ScheduleData = null;

function StatsContainer(props) {
  
  const [valueTeam, setValue1] = useState("Team Selection");
  const [valueSport, setValue2] = useState("NFL");
  const [valueYear, setValue3] = useState("2021");

  // Fetch Call that interacts with backend to update JSON files based on user selection.
  // Called every time a useState item is updated.
  // Needs to be tested.
  // fetch(`http://127.0.0.1/${valueSport}/${valueTeam}/${valueYear}/`)
  
  if (valueSport === "NFL") {
    StatData = StatDataNFL;
    ScheduleData = ScheduleDataNFL;
  } else if (valueSport === "NCAAF") {
    StatData = StatDataNCAAF;
    ScheduleData = ScheduleDataNCAAF;
  }

  return (
    <div className="stats-container">
      <div className="childSC">
        <DropdownSport changeValue={(valueSport, valueTeam) => (setValue2(valueSport), setValue1(valueTeam))} />
        <DropdownTeam statFile={StatData} changeValue={valueTeam => setValue1(valueTeam)}/>
        <DropdownYear statFile={ScheduleData} changeValue={valueYear => setValue3(valueYear)}/>
      </div>
      <div className="childSC"><h1>STATISTICS</h1></div>
      <div className="childSC"><StatsTable teamAbrv={valueTeam} teamYear={valueYear} statFile={StatData}/></div>
      <h1 className="childSC">SCHEDULE</h1>
      <div className="childSC"><ScheduleTable teamAbrv={valueTeam} teamYear={valueYear} statFile={ScheduleData}/></div>
    </div>
  );
}

export default StatsContainer;