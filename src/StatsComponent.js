import React, { Component } from "react";
import './StatsComponent.css';

/**
 * StatsComponent
 * Pass in team name and stats json file using the following notation in the react js object that is calling this component.
 *  ---- StatsComponent teamName="<team name or leave empty string>" statFile={StatData}
 *  ---- importing the StatData in other js object -> import StatData from "./json-data/nfl-teams.json";
 * ***This is currently set up to handle NFL stats based on the NFL json structure****
 * Output: Stat Table
 * Styled using StatsComponent.css.  Not fully stylized.
 */
class StatsComponent extends Component {

  render () {
        let tb_data = this.props.statFile.filter((teamStats)=> {
         if (teamStats.name.toLocaleLowerCase().includes(this.props.teamName.toLocaleLowerCase())) {
           return teamStats
          }
        }).map((teamStats)=>{
          return (
            <tr key={teamStats.name}>
              <td>{teamStats.name}</td>
              <td>{teamStats.abrv}</td>
              <td>{teamStats.wins}</td>
              <td>{teamStats.losses}</td>
              <td>{teamStats.winpcnt}</td>
              <td>{teamStats.tds}</td>
              <td>{teamStats.rushtd}</td>
              <td>{teamStats.passtd}</td>
              <td>{teamStats.yards}</td>
              <td>{teamStats.trnovs}</td>
              <td>{teamStats.fmbls}</td>
              <td>{teamStats.ints}</td>
              <td>{teamStats.ydspplay}</td>
            </tr>
          )
        })
        return (
          <div className="container">
            <table className="stattable">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Abrv</th>
                  <th>Wins</th>
                  <th>Losses</th>
                  <th>Win %</th>
                  <th>Touch Downs</th>
                  <th>Rushing TDs</th>
                  <th>Passing TDs</th>
                  <th>Yards</th>
                  <th>Turnovers</th>
                  <th>Fumbles</th>
                  <th>Interceptions</th>
                  <th>Yards/Play</th>
                </tr>
              </thead>
              <tbody>
                {tb_data}
              </tbody>
            </table>
          </div>
        )
  }
}

export default StatsComponent;
