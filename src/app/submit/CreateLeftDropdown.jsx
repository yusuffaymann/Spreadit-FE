import Image from "next/image";
import React from "react";
import logo from "../assets/logoSpreadIt.svg"
import styles from "./CreateLeftDropdown.module.css"
import "./Create.css";

export default function CreateLeftDropdown({current,setter}) {
  function handleInputChange(event) {
    const { value } = event.target;
      setter(value);
  }


  return (
    <div className={`${styles.createLeftFlexDropdownFlexContainer} ${styles.createLeftFlexGroupedOptions}`}>
      <div className={styles.createDropdownArea}>
        <div className={styles.createDropdownFlex}>
          <span className={`${styles.createCommunityIcon} ${styles.createDropdownOptionIcon}`}></span>
          <div className={styles.createDropdownOptionFlex}>
            <input
              className={styles.createDropdownOptionText}
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