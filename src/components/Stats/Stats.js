import React from "react";
import './Stats.css';
import Header from "../Header/Header"
import TeamsContainer from "../TeamsContainer/TeamsContainer";
{/* import pages for routing */}

function Stats() {
  return (
    <div className="Stats">
      <TeamsContainer />
    </div>
  );
}

export default Stats;