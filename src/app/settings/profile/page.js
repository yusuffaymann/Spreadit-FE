"use client";
import React, { useState, useEffect } from "react";
import handler from "@/app/utils/apiHandler.js";
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

const API_URL = "/api/v1/me/prefs";
const DEBOUNCE_DELAY = 1500;
const MAX_SOCIAL_LINKS = 5;

function Profile() {
  const [nsfwProfile, setNsfwProfile] = useState(false); // Assuming default value is false
  const [allowFollow, setAllowFollow] = useState(false); // Assuming default value is false
  const [contentVisibility, setContentVisibility] = useState(false); // Assuming default value is false
  const [activeVisibility, setActiveVisibility] = useState(false); // Assuming default value is false
  const [displayName, setDisplayName] = useState(''); // Assuming default value is false
  const [about, setAbout] = useState(''); // Assuming default value is false
  const [socialLinks, setSocialLinks] = useState([]);
  const [counter, setCounter] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [clearHistory, setClearHistory] = useState(false);
  const [loading, setLoading] = useState(true); // Loading indicator
  


  useEffect(() => {
      async function fetchData() {
          setLoading(true);
        try {
          // Fetch user preferences
          const prefsData = await handler(API_URL, "GET")
          setNsfwProfile(prefsData.nsfwprofile);
          setAllowFollow(prefsData.allowfollow);
          setContentVisibility(prefsData.contentvisibility);
          setActiveVisibility(prefsData.activevisibility);
          setDisplayName(prefsData.displayname);
          setAbout(prefsData.about);
          setAvatarUrl(prefsData.avatarurl)
          setBannerUrl(prefsData.bannerurl)
          setSocialLinks(prefsData.sociallinks); // Assuming sociallinks is the array containing social links
          /*
            assuming sociallinks structure is like this
            "sociallinks": [
                {
                  "id": 1,
                  "name": "Facebook",
                  "url": "https://www.facebook.com",
                  "logo": "https://example.com/facebook_logo.png"
                },
          */

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
        activevisibility: activeVisibility,
        displayname: displayName,
        about: about,
        avatarurl: avatarUrl,
        bannerurl: bannerUrl,
        sociallinks: socialLinks,
      };
      
      try {
        // Fetch user preferences
        const prefsData = await handler(API_URL, "PATCH", newPrefsData);
        console.log(prefsData);
  
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., show error message, retry mechanism)
      }
    }
  
    useEffect(() => {
      if(!loading)
        patchData();
    }, [nsfwProfile, allowFollow, contentVisibility, activeVisibility, avatarUrl, bannerUrl, socialLinks]);

    useEffect(() => {
      const delay = setTimeout(() => {
        if(!loading)
        patchData();
      }, DEBOUNCE_DELAY);

      return () => clearTimeout(delay);
    }, [about, displayName]); // Only trigger when about or displayName changes
  


  // State to track if gray overlay is on
  const [isOpen, setIsOpen] = useState(false);

  const handleOverlay = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
  };

  const handleItemClick = (id, status) => {
    console.log(`SettingItem with ID ${id} clicked. ${status}`);
    handleAPIput(id,status)
    if (id === 1 && status === false) {
      handleLockComponent(2, true);
      console.log("locked");
    } else if (id === 1 && status === true) {
      handleLockComponent(2, false);
      console.log("unlocked");
    }
  };

  useEffect(() => {
    if (clearHistory)
    {
      console.log('History cleared')
      setClearHistory(false)
    }
  }, [clearHistory]);

  const handleAPIput = (id, status) => {
    if (id === 13)
    setNsfwProfile(status);
    else if (id === 14)
    setAllowFollow(status);
    else if (id === 15)
    setContentVisibility(status);
    else if (id === 16)
    setActiveVisibility(status);
    else if (id === 17)
    setClearHistory(true);
  }

  const handleLinkSelection = (id) => {
    console.log(`Link with ID ${id} clicked.`);
  };

  

  const addSocialLink = (id, name, url, logo) => {
    if (counter < MAX_SOCIAL_LINKS) {
      // Spread the existing socialLinks array and add the new object to it
      setSocialLinks([...socialLinks, { id, name, url, logo }]);
      setCounter(counter + 1);
    }
  };

  const deleteSocialLink = (id) => {
    // Filter out the social link with the given id
    const updatedSocialLinks = socialLinks.filter((link) => link.id !== id);
    // Update the state with the new array
    setSocialLinks(updatedSocialLinks);
    setCounter(counter - 1);
  };

  if (loading) {
    return (
      <div className="window">
        <div className="setting--page">
            <SettingsLayout index={1} />
            <div>Loading...</div>
          </div>
        </div>
    ); ;
  }

  return (
    <>
      <SettingsLayout />
      <div className="settings--container">
        <div className="settings--content">
          <h2 className="settings--h2">Customize profile</h2>
          <h3 className="uppercase-h3-description">Profile Information</h3>
          <ProfileName displayName={displayName} setDisplayName={setDisplayName} handleSubmit={patchData}/>
          <ProfileAbout about={about} setAbout={setAbout} handleSubmit={patchData}/>
          <ProfileSocial
            isOpen={isOpen} onClose={handleOverlay} onSelectSocial={handleLinkSelection} addSocialLink={addSocialLink}
            deleteSocialLink={deleteSocialLink} socialLinks={socialLinks} counter={counter}
          />
          <h3 className="uppercase-h3-description">Images</h3>
          <ProfileImages setAvatarUrl={setAvatarUrl} setBannerUrl={setBannerUrl} />
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
