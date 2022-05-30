import React from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import "./TeamCard.css"

function TeamCard(props) {
  return (
    <div className="team-card">
      <img className="team-logo" src="https://www.rowanathletics.com/images/logos/site/site.png"></img>
      <table className="data-table" cellSpacing="20">
        <thead>
          <tr>
            <th className="data-header">Player</th>
            <th className="data-header">Position</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Player A</td>
            <td>Q</td>
          </tr>
          <tr>
            <td>Player B</td>
            <td>W</td>
          </tr>
          <tr>
            <td>Player C</td>
            <td>R</td>
          </tr>
        </tbody>
      </table>
      {/* <AgGridReact>
        <AgGridColumn field="Player"></AgGridColumn>
        <AgGridColumn field="Position"></AgGridColumn>
      </AgGridReact> */}
    </div>
  );
}

export default TeamCard;