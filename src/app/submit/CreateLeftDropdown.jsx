import Image from "next/image";
import React from "react";
import logo from "../assets/logoSpreadIt.svg"
import "./Create.css";

export default function CreateLeftDropdown() {
  return (
    <div className="createLeftFlexDropdownFlexContainer createLeftFlexGroupedOptions">
      <div className="create--DropdownArea">
        <div className="create--DropdownFlex">
          <span className="create--CommunityIcon create--DropdownOptionIcon"></span>
          <div className="create--DropdownOptionFlex">
            <input
              class="create--DropdownOptionText"
              placeholder="Choose a community"
              spellcheck="false"
              value=""
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}