import React from "react";
import './StatsTable.css';

/**
 * StatsTable
 * @param {Properties} props 
 *  - statFile, JSON file containing stats
 *  - teamAbrv, Team abrv used in filtering
 *  - teamYear, Year used in filter
 * @returns Stat Table - Table of stats provided by the json file
 *  - The stat table is dynamic.  It will adjust to any properly formatted json for team statistcs.
 * Styled using StatsTable.css.
 */
function StatsTable(props) {

 var statData = props.statFile;
 var abrv = props.teamAbrv;
 var year = props.teamYear;

  if(props.statFile === null | statData.length == 0) {
    return(noDataResoponse("Data Not Available"))
  } else if (abrv === null | abrv === "" | abrv === "Team Selection") {
    return(noDataResoponse("Awaiting Team Selection"))
  } else {

    let dataFilterYear = statData.filter((teamStats) => (teamStats.year === year) )
    if (dataFilterYear.length === 0) {
      return(noDataResoponse("Data Not Available For This Year"))
    }

    let dataFilterAbrv = dataFilterYear.filter((teamStats) => (teamStats.abrv === abrv) )
    if (dataFilterAbrv.length === 0) {
      return(noDataResoponse("Data Not Available For This Year"))
    } else {

      var keyList = Object.keys(dataFilterAbrv[0]);
      var headerList = keyList.map((key, index)=>{
        return <th key={key}>{key.toUpperCase()}</th>
      })


      let tbData = dataFilterAbrv.map((teamStats)=>{
        return (
        <tr key={teamStats.name}>
          {getTDList(teamStats,keyList)}
        </tr>
        )
      })
      return (
        <div className="ContainerStatsTable">
          <table>
            <thead>
            <tr>{headerList}</tr>
            </thead>
            <tbody> {tbData} </tbody>
          </table>
        </div>
    )}
  }
}


/**
 * noDataResoponse
 * @param {String} response 
 * @returns A Html block containing the response
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

export default StatsTable;
