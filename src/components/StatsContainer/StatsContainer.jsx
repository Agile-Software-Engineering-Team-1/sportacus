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
var currentTeam = "";
var currentYear = "";

/**
 * StatsContainer, Component (Page) that is responsible for maintaining the Team Stats and Schedule data tables.
 * @returns HTML "Page" block that contains the Team Stats Table, Team Schedule Table and Selection Dropdowns for filtering data/stats
 */
function StatsContainer() {
  
  const [valueTeam, setValue1] = useState("Team Selection");
  const [valueSport, setValue2] = useState("NFL");
  const [valueYear, setValue3] = useState("2021");

  // Fetch Call that interacts with backend to update JSON files based on user selection.
  // Called every time a useState item is updated.
  // fetch(`http://127.0.0.1/${valueSport}/${valueTeam}/${valueYear}/`)
  if (valuesUpdated(valueTeam, valueYear)) {
    fetch(`http://localhost:8000/${valueSport.toLowerCase()}/${valueTeam}/${Number(valueYear)}/`)
  }
  
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

/**
 * valuesUpdated
 * @param {String} valueTeam, Value of selected team 
 * @param {String} valueYear, Value of selected year
 * @returns Boolean, If an update of the team or year has been made.
 */
function valuesUpdated(valueTeam, valueYear) {
  if ((valueTeam !== "Team Selection" & currentTeam !== valueTeam) | currentYear !== valueYear) {
    currentTeam = valueTeam;
    currentYear = valueYear;
    return true;
  }
  return false;
}

export default StatsContainer;