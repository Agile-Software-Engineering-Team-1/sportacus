import React from "react";
import TeamCard from "../TeamCard/TeamCard";
import "./TeamsContainer.css"

function TeamsContainer(props) {
  return (
    <div className="teams-container">
      <TeamCard />
      <TeamCard />
      {/* <TeamCard className="team-right" /> */}
    </div>
  );
}

export default TeamsContainer;