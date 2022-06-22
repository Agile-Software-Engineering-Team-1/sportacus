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

    var YearList = ["2020", "2021", "2022", "2023"]
    /* for (var i = 0; i < data[0].games.length; ++i) {
      var year = data[0].games[i].year
      if (!YearList.includes(year)) {
        YearList.push(year);
      }
    }
    YearList.sort() */

    return (
    <div className="Dropdown">
        <Dropdown 
        baseClassName="rdn"
        arrowClosed={<span className="arrow-closed">-</span>}
        arrowOpen={<span className="arrow-opened">🠋</span>}
        matcher={function noRefCheck(){}}
        placeholder="2021"
        options={YearList}
        menu="div"
        onChange={(value) => props.changeValue(value.label)}
        onClose={function noRefCheck(){}}
        onOpen={function noRefCheck(){}}
    />
    </div>
    )
}

export default DropdownTeam;

