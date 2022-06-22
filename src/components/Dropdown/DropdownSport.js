import { getValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import './Dropdown.css';

/**
 * DropdownSport - Provides a Dropdown selection of sports.
 * @returns {string} value - The selected value from the Dropdown.
 */
function DropdownTeam (props) {
    var sportList = ["NFL", "NCAAF"]
    return (
    <div className="Dropdown">
        <Dropdown
        baseClassName="rdn"
        arrowClosed={<span className="arrow-closed">-</span>}
        arrowOpen={<span className="arrow-opened">🠋</span>}
        matcher={function noRefCheck(){}}
        placeholder="NFL"
        options={sportList}
        menu="div"
        value={props.changeValue}
        onChange={(value, value2) => (props.changeValue(value.label.split(' ')[0], "Team Selection"))}
        onClose={function noRefCheck(){}}
        onOpen={function noRefCheck(){}}
    />
    </div>
    )
}

export default DropdownTeam;

