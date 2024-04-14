import React, { useState, useRef, useEffect } from "react";
import CreateDropdownMenu from "./CreateDropdownMenu";
import styles from "./CreateLeftDropdown.module.css";
import "./Create.css";

export default function CreateLeftDropdown({ current, setter }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  function handleInputChange(event) {
    const { value } = event.target;
    setter(value);
  }

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  return (
    <div
      className={`${styles.createLeftFlexDropdownFlexContainer} ${styles.createLeftFlexGroupedOptions}`}
    >
      <div
        className={`${styles.createDropdownArea} ${menuVisible ? styles.boxShadow : ""}`}
        ref={dropdownRef}
      >
        <div className={styles.createDropdownFlex}>
          <span
            className={`${!menuVisible ? styles.createCommunityIcon : ""} ${styles.createDropdownOptionIcon}`}
          >{menuVisible &&  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{fill: "#878a8c", width: "20px",height: "20px"}}>
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>}</span>
          <div className={styles.createDropdownOptionFlex}>
            <input
              className={styles.createDropdownOptionText}
              placeholder={menuVisible ? "Search communities" : "Choose a community"}
              type="text"
              spellCheck="false"
              onChange={handleInputChange}
              value={current}
              onClick={toggleMenu} // Toggle menu on input click
            />
          </div>
          <span className={`${styles.icon}`} onClick={toggleMenu}>
            <svg
              className={`${styles.dropdownArrowColor}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path>
            </svg>
          </span>
        </div>
        {menuVisible && <CreateDropdownMenu />}
      </div>
    </div>
  );
}
