import "./StatsContainer.css"
import React, { useState } from 'react';
import StatsTable from '../StatsTable/StatsTable';
import ScheduleTable from '../ScheduleTable/ScheduleTable';
import DropdownSport from '../Dropdown/DropdownSport';
import DropdownTeam from '../Dropdown/DropdownTeam';
import DropdownSeason from '../Dropdown/DropdownSeason';
import StatDataNFL from "../../json-data/nfl-teams.json";
import ScheduleDataNFL from "../../json-data/nfl-schedules.json";
import TeamNamesNFL from "../../json-data/nfl-team-names.json";
import StatDataNCAAF from "../../json-data/ncaaf-teams.json";
import ScheduleDataNCAAF from "../../json-data/ncaaf-schedules.json";
import TeamNamesNCAAF from "../../json-data/ncaaf-team-names.json";

var StatData = null;
var ScheduleData = null;
var TeamNames = null;
var currentTeam = "";
//var currentSeason = "";
var currentSport = "";

/**
 * StatsContainer, Component (Page) that is responsible for maintaining the Team Stats and Schedule data tables.
 * @returns HTML "Page" block that contains the Team Stats Table, Team Schedule Table and Selection Dropdowns for filtering data/stats
 */
function StatsContainer() {
  
  const [valueTeam, setValue1] = useState("Team Selection");
  const [valueSport, setValue2] = useState("NFL");
  const [valueSeason, setValue3] = useState("2021");

  // Fetch Call that interacts with backend to update JSON files based on user selection.
  // Called every time a useState item is updated.
  // fetch(`http://127.0.0.1/${valueSport}/${valueTeam}/${valueSeason}/`)
  if (valuesUpdatedSport(valueSport)) {
    fetch(`http://localhost:8000/${valueSport.toLowerCase()}/`)
  }

  if (valuesUpdatedTeam(valueTeam) ){ //}, valueSeason)) {
    fetch(`http://localhost:8000/${valueSport.toLowerCase()}/${valueTeam}/2021/`)
  }

  console.log("test " + getTeamName())
  return (
    <div className="stats-container">
      <div className="childSC">
        <DropdownSport changeValue={(valueSport, valueTeam) => (setValue2(valueSport), setValue1(valueTeam))} />
        <DropdownTeam namesFile={TeamNames} changeValue={valueTeam => setValue1(valueTeam)}/>
        <DropdownSeason changeValue={valueSeason => setValue3(valueSeason)}/>
      </div>
      <div className="childSC"><h1>{getTeamName()} {currentSport} {valueSeason}</h1></div>
      <div className="childSC"><h3>STATISTICS</h3></div>
      <div className="childSC"><StatsTable teamAbrv={valueTeam} teamSeason={valueSeason} statFile={StatData}/></div>
      <h3 className="childSC">SCHEDULE</h3>
      <div className="childSC"><ScheduleTable teamAbrv={valueTeam} teamSeason={valueSeason} statFile={ScheduleData}/></div>
    </div>
  );
}

/**
 * valuesUpdatedTeamSeason
 * @param {String} valueTeam, Value of selected team 
 * @param {String} valueSeason, Value of selected season
 * @returns Boolean, If an update of the team or season has been made.
 */
function valuesUpdatedTeam(valueTeam) { //}, valueSeason) {
  //currentSeason = valueSeason;
  if ((valueTeam !== "Team Selection" & currentTeam !== valueTeam)) {
    currentTeam = valueTeam;
    return true;
  }
  return false;
}

/**
 * valuesUpdatedSport
 * @param {String} valueSport, Value of selected sport 
 * @returns Boolean, If an update of the sport has been made.
 */
function valuesUpdatedSport(valueSport) {
  if (valueSport !== currentSport) {
    currentSport = valueSport;
    if (currentSport === "NFL") {
      currentTeam = "";
      StatData = StatDataNFL;
      ScheduleData = ScheduleDataNFL;
      TeamNames = TeamNamesNFL;
    } else if (currentSport === "NCAAF") {
      currentTeam = "";
      StatData = StatDataNCAAF;
      ScheduleData = ScheduleDataNCAAF;
      TeamNames = TeamNamesNCAAF;
    }

    return true;
  }
  return false;
}

function getTeamName() {
  if (TeamNames !== null & currentTeam !== null) {
    for (var i = 0; i < TeamNames[0].abrv.length; ++i) {
     if (currentTeam === TeamNames[0].abrv[i]) {
       return TeamNames[1].name[i] + " -";
     }
    }
  }
  return "";
}

export default StatsContainer;