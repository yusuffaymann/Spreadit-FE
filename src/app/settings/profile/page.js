"use client";
import React, { useState } from "react";
import ProfileName from "./Profile_name.jsx";
import ProfileAbout from "./Profile_about.jsx";
import ProfileSocial from "./Profile_social.jsx";
import ProfileAdvanced from "./Profile_advanced.jsx";
import ProfileImages from "./Profile_images.jsx";
import SettingItem from "../../components/UI/SettingItem.jsx";
import BlueButton from "../../components/UI/BlueButton.jsx";
import SettingsLayout from "../SettingsLayout.jsx";
import optionData from "../options.js";
import GrayOutMenuWrapper from "./components/GrayOutMenu.jsx"; // Import the wrapper component

function Profile() {
  // State to track locked components
  const [lockedComponents, setLockedComponents] = useState({});

  // State to track if gray overlay is on
  const [isOpen, setIsOpen] = useState(false);

  const handleOverlay = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
  };

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

  const handleLinkSelection = (id) => {
    console.log(`Link with ID ${id} clicked.`);
  };

  return (
    <>
      <SettingsLayout />
      <div className="settings--container">
        <div className="settings--content">
          <h2 className="settings--h2">Customize profile</h2>
          <h3 className="uppercase-h3-description">Profile Information</h3>
          <ProfileName />
          <ProfileAbout />
          <ProfileSocial
            isOpen={isOpen}
            onClose={handleOverlay}
            onSelectSocial={handleLinkSelection}
          />
          <h3 className="uppercase-h3-description">Images</h3>
          <ProfileImages />
          <h3 className="uppercase-h3-description">Profile Category</h3>
          {optionData.map(
            (option) =>
              option.id === 13 && (
                <SettingItem
                  key={option.id}
                  option={option}
                  onItemClick={handleItemClick}
                />
              )
          )}
          <h3 className="uppercase-h3-description">Advanced</h3>

          <ProfileAdvanced
            clickEvent={handleItemClick}
            lockedList={lockedComponents}
          />
          <h3 className="uppercase-h3-description">Profile Moderation</h3>
          <div />
          <div>
            For moderation tools please visit our{" "}
            <a href="/moderation">Profile Moderation page</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
