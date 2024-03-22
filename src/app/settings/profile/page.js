"use client";
import React, { useState, useEffect } from "react";
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
  const [nsfwProfile, setNsfwProfile] = useState(false); // Assuming default value is false
  const [allowFollow, setAllowFollow] = useState(false); // Assuming default value is false
  const [contentVisibility, setContentVisibility] = useState(false); // Assuming default value is false
  const [displayName, setDisplayName] = useState(''); // Assuming default value is false
  const [about, setAbout] = useState(''); // Assuming default value is false
  const [loading, setLoading] = useState(true); // Loading indicator
  


  useEffect(() => {
      async function fetchData() {
          setLoading(true);
        try {
          // Fetch user preferences
          const prefsData = await handler("/api/v1/me/prefs", "GET")
          setNsfwProfile(prefsData.nsfwprofile);
          setAllowFollow(prefsData.allowfollow);
          setContentVisibility(prefsData.contentvisibility);
          setDisplayName(prefsData.displayname);
          setAbout(prefsData.about);
  
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error (e.g., show error message, retry mechanism)
        } finally {
          setLoading(false); // Set loading state to false regardless of success or error
        }
      }
      fetchData();
    }, []);


  async function patchData() {

      let newPrefsData = {
        nsfwprofile: nsfwProfile,
        allowfollow: allowFollow,
        contentvisibility: contentVisibility,
        displayname: displayName,
        about: about,
      };
      
      try {
        // Fetch user preferences
        const prefsData = await handler("/api/v1/me/prefs", "PATCH", newPrefsData);
        console.log(prefsData);
  
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., show error message, retry mechanism)
      }
    }
  
    useEffect(() => {
      if(!loading)
        patchData();
    }, [nsfwProfile, allowFollow, contentVisibility, displayName, about]);


  // State to track if gray overlay is on
  const [isOpen, setIsOpen] = useState(false);

  const handleOverlay = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
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
