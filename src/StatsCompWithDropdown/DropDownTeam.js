import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import './DropDown.css';

/**
 * DropDownTeam - Provides a dropdown selection of team names.
 * @param {Properties} props statFile - json file containing stats, value - Current value string 
 * @returns {string} value - The selected value from the dropdown.
 */
function DropDownTeam (props) {
    var data = props.statFile;

    var nameList = []
    for (var i = 0; i < data.length; ++i) {
      nameList.push(data[i].name);
    }
    nameList.push("(All Available)");

    return (
    <div className="DropDownTeam">
        <Dropdown
        baseClassName="rdn"
        arrowClosed={<span className="arrow-closed">-</span>}
        arrowOpen={<span className="arrow-opened">🠋</span>}
        matcher={function noRefCheck(){}}
        placeholder="Selection"
        options={nameList}
        menu="div"
        value={props.changeValue}
        onChange={(value) => props.changeValue(value.label)}
        onClose={function noRefCheck(){}}
        onOpen={function noRefCheck(){}}
    />
    </div>
    )
}

export default DropDownTeam;

