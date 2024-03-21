import React, { useState, useEffect, useRef } from "react";
import "./dropdown.css";
import Dropdownmenu from "./dropdownmenu";
import DropdownItem from "./DropdownItem";

function Dropdown(props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const [selectedId, setSelectedId] = useState(props.defId); // Initial selectedId state

  const toggleMenuVisibility = () => {
    setIsMenuVisible((prevIsMenuVisible) => !prevIsMenuVisible);
  };

  const closeMenu = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuVisible(false);
    }
  };

  // Add event listener when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  const handleSelectedIdChange = (newSelectedId) => {
    // Update the selectedId state with the new value
    setSelectedId(newSelectedId);
    console.log(`dropdown: ${newSelectedId}`);
    setIsMenuVisible(false);
  };

  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        <DropdownItem
          toggleMenu={toggleMenuVisibility}
          pId={props.pId}
          selectedId={selectedId}
          onSelect={handleSelectedIdChange}
        />
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: "100%",
            marginLeft: "20px",
            //right: "80px", // Align the menu to the right
            display: isMenuVisible ? "block" : "none",
          }}
        >
          <Dropdownmenu
            pId={props.pId}
            selectedId={selectedId}
            onSelect={handleSelectedIdChange}
          />
        </div>
      </div>
    </>
  );
}

export default Dropdown;
