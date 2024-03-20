import React from "react";
import "./dropdown.css";
import dropdownOptions from "./dropdownOptions"; // Ensure this import matches the export

function Dropdownmenu({ closeMenu, pId, selectedId = 2 }) {
  const renderDropdownItems = () => {
    // Find the object with the matching parentId
    const parentObject = dropdownOptions.find(option => option.parentId === pId);
    console.log(parentObject)
    console.log(selectedId)
    
    // Map over the choices array of the found object
    return parentObject && parentObject.choices.map(option => (
      <button
        key={option.dropId}
        role="menuitem"
        classNameName="_10K5i7NW6qcm-UoCtpB3aK _3LwUIE7yX7CZQKmD2L87vf _1oYEKCssGFjqxQ9jJMNj5G"
        onClick={closeMenu}
      >
        
        <span classNameName="pthKOcceozMuXLYrLlbL1">{option.icon}</span>
        <span classNameName={`${option.dropId === selectedId ? "blue" : "_2-cXnP74241WI7fpcpfPmg"}`}>{option.desc}</span>
      </button>
    ));
  };

  return (
    <div classNameName="_1VhYfuKTAdUU_3j4cMjkr5" onClick={closeMenu}>
      <div classNameName="menuFormat">
        {renderDropdownItems()}
      </div>
    </div>
  );
}

export default Dropdownmenu;