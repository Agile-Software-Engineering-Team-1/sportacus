import React from "react";
import './ScheduleTable.css';

/**
 * StatsTable
 * @param {Properties} props 
 *  - statFile, JSON file containing stats
 *  - teamAbrv, Team abrv used in filtering
 *  - teamSeason, Season used in filter
 * @returns Stat Table - Table of stats populated by the team schedules json file
 *  - The stat table is dynamic.  It will adjust to any properly formatted json for the team schedules.
 * Styled using ScheduleTable.css.
 */
function ScheduleTable(props) {

  var abrv = props.teamAbrv;
  var season = props.teamSeason;
  var schdata = props.statFile[0].games;
  var abrvData = props.statFile[0].team;
  
  if(props.statFile === null | schdata.length === 0) {
    return(noDataResoponse("Data Not Available"))
  } else if (abrv === null | abrv === "" | abrv === "Team Selection") {
    return(noDataResoponse("Awaiting Team Selection"))
  } else {

    let dataFilterSeason = schdata.filter((teamSchedules) => (teamSchedules.season === season) )
    if (dataFilterSeason.length === 0) {
      return(noDataResoponse("Data Not Available For This Season"))
    }

    let dataFilterAbrv = dataFilterSeason.filter((teamSchedules) => (abrvData === abrv) )
    if (dataFilterAbrv.length === 0) {
      return(noDataResoponse("Loading..."))
    } else {

      var keyList = Object.keys(dataFilterAbrv[0]);
      var headerList = keyList.map((key, index)=>{
      return <th key={key}>{key.toUpperCase()}</th>
      })
      
      let tbData = dataFilterAbrv.map((teamSchedules)=>{
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
