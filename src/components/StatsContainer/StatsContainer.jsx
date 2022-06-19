//import React from "react";
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
//import LogoNFL from "../../assets/nfl-logo.png";
//import LogoNCAA from "../../assets/ncaa-logo";


var StatData = null;
var ScheduleData = null;
//var SportLogo = LogoNFL;

function StatsContainer(props) {
  
  const [valueTeam, setValue1] = useState("Team Selection");
  const [valueSport, setValue2] = useState("NFL");
  const [valueYear, setValue3] = useState("2021");

  //fetch(`http://127.0.0.1/${valueSport}/${valueTeam}/${valueYear}/`)
  
  if (valueSport === "NFL") {
    StatData = StatDataNFL;
    ScheduleData = ScheduleDataNFL;
    //SportLogo = LogoNFL
  } else if (valueSport === "NCAAF") {
    StatData = StatDataNCAAF;
    ScheduleData = ScheduleDataNCAAF;
    //SportLogo = LogoNCAA
  }

  return (
    <div className="stats-container">
        {/* <img src={SportLogo} alt="Sport Logo" class="stats-img"/> */}
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