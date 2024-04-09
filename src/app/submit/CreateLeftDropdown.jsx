import Image from "next/image";
import React from "react";
import logo from "../assets/logoSpreadIt.svg"
import "./Create.css";

export default function CreateLeftDropdown({current,setter}) {
  function handleInputChange(event) {
    const { value } = event.target;
      setter(value);
  }


  return (
    <div className="createLeftFlexDropdownFlexContainer createLeftFlexGroupedOptions">
      <div className="create--DropdownArea">
        <div className="create--DropdownFlex">
          <span className="create--CommunityIcon create--DropdownOptionIcon"></span>
          <div className="create--DropdownOptionFlex">
            <input
              className="create--DropdownOptionText"
              placeholder="Choose a community"
              type="text"
              spellcheck="false"
              onChange={handleInputChange}
              value={current} 
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}