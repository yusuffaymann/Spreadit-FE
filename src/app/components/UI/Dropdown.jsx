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
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <DropdownItem
        toggleMenu={toggleMenuVisibility}
        pId={props.pId}
        selectedId={selectedId}
        onSelect={handleSelectedIdChange}
      />
      {isMenuVisible && (
        <Dropdownmenu
          pId={props.pId}
          selectedId={selectedId}
          onSelect={handleSelectedIdChange}
        />
      )}
    </div>
  );
}

export default Dropdown;
