import React from "react";
import { Dropdown } from 'react-dropdown-now';
import './Dropdown.css';

/**
 * DropdownTeam - Provides a Dropdown selection of team names.
 * @param {Properties} props statFile - json file containing stats, value - Current value string 
 * @returns {string} value - The selected value from the Dropdown.
 */
function DropdownTeam (props) {
    
    var SeasonList = ["2019", "2020", "2021", "2022"]
    SeasonList.sort()

    return (
    <div className="Dropdown">
        <Dropdown 
        baseClassName="rdn"
        arrowClosed={<span className="arrow-closed">-</span>}
        arrowOpen={<span className="arrow-opened">🠋</span>}
        matcher={function noRefCheck(){}}
        placeholder={SeasonList[2]}
        options={SeasonList}
        menu="div"
        onChange={(value) => props.changeValue(value.label)}
        onClose={function noRefCheck(){}}
        onOpen={function noRefCheck(){}}
    />
    </div>
    )
}

export default DropdownTeam;

