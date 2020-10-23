import React from "react";
import "./Dropdown.scss";

import Dropdown from "react-bootstrap/Dropdown";

const DropdownBtn = props => {
  return (
    <Dropdown className="Dropdown">
      <Dropdown.Toggle variant="danger" id="dropdown-basic">
        {props.defaultValue}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {props.dropChilds.map((child, i) => {
          return (
            <Dropdown.Item
              key={i}
              onClick={(e) => props.onClick(e)}
            >
              {child}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownBtn;
