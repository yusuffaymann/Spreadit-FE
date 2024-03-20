import React, { useState, useEffect, useRef } from "react";
import "./dropdown.css";
import Dropdownmenu from "./dropdownmenu";
import DropdownItem from "./DropdownItem";

function Dropdown({pId}) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown container

  const toggleMenuVisibility = () => {
    setIsMenuVisible(prevIsMenuVisible => !prevIsMenuVisible);
  };

  const closeMenu = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuVisible(false);
    }
  };

  // Add event listener when the component mounts
  useEffect(() => {
    document.addEventListener('mousedown', closeMenu);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <DropdownItem toggleMenu={toggleMenuVisibility} pId = {pId}/>
      {isMenuVisible && <Dropdownmenu pId = {pId} selectedId = {2}/>}
    </div>
  );
}

export default Dropdown;
