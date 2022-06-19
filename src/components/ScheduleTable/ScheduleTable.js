import React from "react";
import './ScheduleTable.css';

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
function ScheduleTable(props) {

  var abrv = props.teamAbrv;
  var year = props.teamYear;
  var schdata = props.statFile[0].games;
  var abrvData = props.statFile[0].team;
  
  if(props.statFile === null | schdata.length == 0) {
    return(noDataResoponse("Data Not Available"))
  } else if (abrv === null | abrv === "" | abrv === "Team Selection") {
    return(noDataResoponse("Awaiting Team Selection"))
  } else {

  let dataFilterYear = schdata.filter((teamSchedules) => (teamSchedules.year === year & abrvData === abrv) )
  if (dataFilterYear.length === 0) {
    return(noDataResoponse("Data Not Available For This Year"))
  } else {



      var keyList = Object.keys(dataFilterYear[0]);
      var headerList = keyList.map((key, index)=>{
      return <th key={key}>{key.toUpperCase()}</th>
      })
      
      let tbData = dataFilterYear.map((teamSchedules)=>{
        return (
        <tr key={teamSchedules.team}>
          {getTDList(teamSchedules,keyList)}
        </tr>
        )
      })
      return (
        <div className="ContainerST">
          <table>
            <thead>
            <tr>{headerList}</tr>
            </thead>
            <tbody> {tbData} </tbody>
          </table>
        </div>
    )
  }
}

/**
 * noDataResoponse
 * @param {String} response 
 * @returns A html block containing the response
 */
function noDataResoponse(response) {
  return (
    <div className="ContainerNoData">
      <h1 style={{textAlign: 'center'}}>{response}</h1>
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
}

export default ScheduleTable;