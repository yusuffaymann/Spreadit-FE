import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./SettingItem.module.css";
import Switch from "./Switch";
import Dropdown from "./Dropdown";
import OutlineButton from "./OutlineButton";

export default function SettingItem(props) {
  const [isSwitchToggled, setIsSwitchToggled] = useState(false);
  const [previousSwitchState, setPreviousSwitchState] = useState(false);

  const handleClick = () => {
    // Call the callback function provided by the parent
    if (props.onItemClick) {
      props.onItemClick(props.option.id);
    }
  };

  const handleSwitchToggle = () => {
    setIsSwitchToggled((prevState) => !prevState);
    console.log(`Switch toggled. New state: ${!isSwitchToggled}`);
    props.onItemClick(props.option.id, !isSwitchToggled);
  };

  const handleDrop = (id,selectedId) => {
    console.log(`handleDrop: ${id} ${selectedId}`)
    props.dropDownClick(id, selectedId);
  };

  useEffect(() => {
    if (props.isLocked) {
      // If the component is being locked, store the current state of the switch toggle
      setPreviousSwitchState(isSwitchToggled);
      setIsSwitchToggled(false); // Set the switch toggle off when component is locked
    } else if (!props.isLocked && previousSwitchState !== undefined) {
      // If the component is being unlocked and there's a previous state recorded,
      // restore the switch toggle to its previous state
      setIsSwitchToggled(previousSwitchState);
    }
  }, [props.isLocked]); // Trigger effect when props.isLocked changes

  useEffect(() => {
    setIsSwitchToggled(props.isToggled)
  },[]);


  return (
    <div>
      <div className={styles.settingOption}>
        <div className={styles.settingOptionLeft}>
          <h3 className={`settings--h3 ${props.isLocked ? styles.grayedOut : ""}`}>{props.option.title}</h3>
          <p className={`settings--p ${props.isLocked ? styles.grayedOut : ""}`}>{props.option.description}</p>
        </div>
        <div className={styles.settingOptionRight}>
          <div className={styles.settingOptionRightButtonFloat}>
            {props.option.type === "switch" && (
              <Switch
                isToggled={isSwitchToggled}
                onToggle={handleSwitchToggle}
                disabled={props.isLocked}
              />
            )}
            {props.option.type === "dropdown" && (
              <Dropdown pId={props.option.id} defId={props.defaultDropdown} selectedDropItem={handleDrop}/>
            )}
            {props.option.type === "button" && (
              <OutlineButton btnClick={handleClick}>
                {" "}
                {props.option.buttontext}{" "}
              </OutlineButton>
            )}
          </div>
        </div>
      </div>
      
      {props.option.subOptions &&
        props.option.subOptions.map((subOption) => (
          <div className={styles.settingSuboption}>
            <SettingItem key={subOption.id} option={subOption} onItemClick={props.onItemClick} dropDownClick={props.dropDownClick}/>
          </div>
        ))}
    </div>
  );
}
