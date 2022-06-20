import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import './Dropdown.css';

/**
 * DropdownTeam - Provides a Dropdown selection of team names.
 * @param {Properties} props statFile - json file containing stats, value - Current value string 
 * @returns {string} value - The selected value from the Dropdown.
 */
function DropdownTeam (props) {
    
    var data = props.statFile;
    var nameList = []
    for (var i = 0; i < data.length; ++i) {
      if (!nameList.includes(data[i].abrv + " | " + data[i].name)) {
        nameList.push(data[i].abrv + " | " + data[i].name);
      }
    }
    nameList.sort()
    return (
    <div className="Dropdown">
        <Dropdown 
        baseClassName="rdn"
        arrowClosed={<span className="arrow-closed">-</span>}
        arrowOpen={<span className="arrow-opened">🠋</span>}
        matcher={function noRefCheck(){}}
        placeholder="Team Selection"
        options={nameList}
        menu="div"
        onChange={(value) => props.changeValue(value.label.split(' ')[0])}
        onClose={function noRefCheck(){}}
        onOpen={function noRefCheck(){}}
    />
    </div>
    )
}

export default DropdownTeam;

