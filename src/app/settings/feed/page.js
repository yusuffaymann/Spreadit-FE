"use client";
import React, { useState, useEffect } from "react";
import SettingItem from "../../components/UI/SettingItem.jsx";
import optionData from "../options.js";
import SettingsLayout from "../SettingsLayout";

function Feed() {
  const [option1Toggled, setOption1Toggled] = useState(false); // Placeholder value for option 1 toggle state
  useEffect(() => {
    // Placeholder value for option 1 toggle state (always false for now)
    setOption1Toggled(false);

    // Lock option 2 if option 1 is toggled off
    if (!option1Toggled) {
      handleLockComponent(2, true);
    }
  }, []);

  // State to track locked components
  const [lockedComponents, setLockedComponents] = useState({});

  // Callback function to lock/unlock component
  const handleLockComponent = (id, isLocked) => {
    // Update locked components state based on ID and lock status
    setLockedComponents((prevLockedComponents) => ({
      ...prevLockedComponents,
      [id]: isLocked,
    }));
  };

  const handleItemClick = (id, status) => {
    console.log(`SettingItem with ID ${id} clicked. ${status}`);
    if (id === 1 && status === false) {
      handleLockComponent(2, true);
      console.log("locked");
    } else if (id === 1 && status === true) {
      handleLockComponent(2, false);
      console.log("unlocked");
    }
  };

  return (
    <>
      <SettingsLayout />
      <div className="settings--container">
        <div className="settings--content">
          <h2 className="settings--h2">Feed settings</h2>
          <h3 className="uppercase-h3-description">Content Preferences</h3>

          {optionData.map(
            (option) =>
              option.id < 12 && (
                <SettingItem
                  key={option.id}
                  option={option}
                  onItemClick={handleItemClick}
                  isToggled={false}
                  isLocked={lockedComponents[option.id]}
                />
              )
          )}
          <h3 className="uppercase-h3-description">Post Preferences</h3>
          {optionData.map(
            (option) =>
              option.id === 12 && (
                <SettingItem
                  key={option.id}
                  option={option}
                  onItemClick={handleItemClick}
                />
              )
          )}
        </div>
      </div>
    </>
  );
}

export default Feed;
