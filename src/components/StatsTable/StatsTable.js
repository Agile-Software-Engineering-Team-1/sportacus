import React from "react";
import './StatsTable.css';

/**
 * StatsTable
 * Pass in team name and stats json file using the following notation in the react js object that is calling this component.
 *  ---- StatsTable teamAbrv="<team abrv or leave empty string>" statFile={StatData}
 *  ---- importing the StatData in other js object -> import StatData from "./json-data/nfl-teams.json";
 * @param {Properties} props statFile - json file containing stats, teamName - Name of team used in filtering
 * @returns Stat Table - Table of stats provided by the json file
 *  ---- The stat table is dynamic.  It will adjust to any properly formatted json.
 * Styled using StatsTable.css.
 */
function StatsTable(props) {

 var data = props.statFile;
 var abrv = props.teamAbrv;
 var keyList = Object.keys(data[0]);
 var headerList = keyList.map((key, index)=>{
    return <th key={key}>{key.toUpperCase()}</th>
    })
    console.log(abrv);
    let tbData = data.filter((teamStats)=> {
    if (abrv !== null & abrv !== "All" & abrv !== "Selection") {
      if (teamStats.abrv.toString().toLocaleLowerCase() === abrv.toString().toLocaleLowerCase()) {
       return teamStats
      }
    }
    else {
      return teamStats
    }
    }).map((teamStats)=>{
      return (
      <tr key={teamStats.name}>
        {getTDList(teamStats,keyList)}
      </tr>
      )
    })
     return (
      <div>
        <table>
          <thead>
           <tr>{headerList}</tr>
           </thead>
          <tbody> {tbData} </tbody>
        </table>
      </div>
  )
}

/**
 * getTDList
 * @param {Dictionary} stats Dictionary of team stat values
 * @param {Array} keyList List of keys found in the json data
 * @returns An array of table cell data containing stat value keys
 */
function getTDList(stats,keyList) {
  var arr = []

  for (var i = 0; i < keyList.length; i++) {
    arr.push(<td>{stats[keyList[i]]}</td>);
  } 
  return(arr)
}

export default StatsTable;
