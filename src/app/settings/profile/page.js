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

const API_URL = "/settings/profile/";
const DEBOUNCE_DELAY = 1500;
const MAX_SOCIAL_LINKS = 5;

/**
 * Component rendering the profile settings page.
 * @component
 * @returns {JSX.Element} The rendered Profile component.
 *
 * @example
 * <Profile />
 */

function Profile() {
  const [nsfwProfile, setNsfwProfile] = useState(false); // Assuming default value is false
  const [allowFollow, setAllowFollow] = useState(false); // Assuming default value is false
  const [contentVisibility, setContentVisibility] = useState(false); // Assuming default value is false
  const [activeVisibility, setActiveVisibility] = useState(false); // Assuming default value is false
  const [displayName, setDisplayName] = useState(""); // Assuming default value is false
  const [about, setAbout] = useState(""); // Assuming default value is false
  const [socialLinks, setSocialLinks] = useState([]);
  const [counter, setCounter] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [clearHistory, setClearHistory] = useState(false);
  const [loading, setLoading] = useState(true); // Loading indicator

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch user preferences
        const prefsData = await handler(API_URL, "GET");
        setNsfwProfile(prefsData.nsfw);
        setAllowFollow(prefsData.allowFollow);
        setContentVisibility(prefsData.contentVisibility);
        setActiveVisibility(prefsData.activeInCommunityVisibility);
        setDisplayName(prefsData.displayName);
        setAbout(prefsData.about);
        setAvatarUrl(prefsData.profilePicture);
        setBannerUrl(prefsData.banner);
        setSocialLinks(prefsData.socialLinks); // Assuming sociallinks is the array containing social links
        setClearHistory(prefsData.clearHistory);
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
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message, retry mechanism)
      } finally {
        setLoading(false); // Set loading state to false regardless of success or error
      }
    }
    fetchData();
  }, []);

  /**
   * Function to update user preferences via API call
   */
  async function patchData() {
    let newPrefsData = {
      nsfw: nsfwProfile,
      allowFollow: allowFollow,
      contentVisibility: contentVisibility,
      activeInCommunityVisibility: activeVisibility,
      displayName: displayName,
      about: about,
      profilePicture: avatarUrl,
      banner: bannerUrl,
      socialLinks: socialLinks,
      clearHistory: clearHistory,
    };

    try {
      // Fetch user preferences
      const prefsData = await handler(API_URL, "PATCH", newPrefsData);
      console.log(prefsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., show error message, retry mechanism)
    }
  }

  useEffect(() => {
    if (!loading) patchData();
  }, [
    nsfwProfile,
    allowFollow,
    contentVisibility,
    activeVisibility,
    avatarUrl,
    bannerUrl,
    socialLinks,
    clearHistory,
  ]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!loading) patchData();
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(delay);
  }, [about, displayName]); // Only trigger when about or displayName changes

  // State to track if gray overlay is on
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Function to Toggle the isOpen state for the modal menu
   */
  const handleOverlay = () => {
    setIsOpen(!isOpen);
  };


  /**
   * General click handler for switch toggles
   * @param {number} id      The ID of the option
   * @param {boolean} status   The toggle status
   */
  const handleItemClick = (id, status) => {
    console.log(`SettingItem with ID ${id} clicked. ${status}`);
    handleAPIput(id, status);
    if (id === 1 && status === false) {
      handleLockComponent(2, true);
      console.log("locked");
    } else if (id === 1 && status === true) {
      handleLockComponent(2, false);
      console.log("unlocked");
    }
  };

  useEffect(() => {
    if (clearHistory) {
      console.log("History cleared");
      setClearHistory(false);
    }
  }, [clearHistory]);

  /**
   * General handler for API PUT request for updating preferences (can be all types of input)
   * @param {number} id      Option ID
   * @param {boolean} status   Toggle status
   * @param {number} status   Selected option under a dropdown
   */
  const handleAPIput = (id, status) => {
    if (id === 13) setNsfwProfile(status);
    else if (id === 14) setAllowFollow(status);
    else if (id === 15) setContentVisibility(status);
    else if (id === 16) setActiveVisibility(status);
    else if (id === 17) setClearHistory(true);  //Note: this one is reset to false immediately afterwards by a useEffect
  };

  /**
   * unnecessary debug function that checks what type of `SocialLink` bubble was clicked
   * @param {number} id      SocialLink ID
   */
  const handleLinkSelection = (id) => {
    console.log(`Link with ID ${id} clicked.`);
  };

  /**
   * Function that adds a social link object to the `socialLinks` array with given `id`, `name`, `url`, and `logo`
   * Then increments the `counter`
   * 
   * NOTE: Several bugs were detected. Due to another bug in the `deleteSocialLink` (where it deletes links of the same type due to not using unique link IDs)
   * 
   * Thus, it decrements the `counter` by 1 even though it also removed other elements.
   * 
   * For example, if you had 5 links of the same type (same `id`), then deleted one of them, they will all get deleted, but the `counter` will
   * only decrement from 5 to 4, thus if you add another link, you will find the "add link" button disabled due to the `counter` actually being set to 5
   * 
   * NOTE: Another bug was detected. The `counter` is always set by default to zero when the page is loaded
   * However, when `socialLinks` are loaded from the API, they werent accounted for, so if for example you had previously saved 5 links then reloaded
   * , you will find yourself able to add up to 10 links in the page
   * 
   * @param {number} id      `socialLink` ID
   * @param {string} name      `socialLink` display name
   * @param {string} url      `socialLink` url
   * @param {string} logo      `socialLink` logo hyperlink
   */
  const addSocialLink = (id, name, url, logo) => {
    if (counter < MAX_SOCIAL_LINKS) {
      // Spread the existing socialLinks array and add the new object to it
      setSocialLinks([...socialLinks, { id, name, url, logo }]);
      setCounter(counter + 1);
    }
  };


  /**
   * Function that deletes a social link object from the `socialLinks` array with given `id`
   * Then decrements the `counter`
   * 
   * NOTE: A serious bug was detected. Due to unique `id`s not being used, this means for example, the YouTube links will all have the same `id`
   * 
   * This means the function will delete all of them, but decrement the `counter` by only 1 even though it intended to remove just one link
   * 
   * This means for example, if you had 5 links of the same type (same `id`), then deleted one of them, they will all get deleted, but the `counter` will
   * only decrement from 5 to 4, thus if you add another link, you will find the "add link" button disabled due to the `counter` actually being set to 5
   * 
   * @param {number} id      `socialLink` ID to be deleted
   */
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
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  const initialStateArray = {
    13: nsfwProfile,
    14: allowFollow,
    15: contentVisibility,
    16: activeVisibility,
  };

  return (
    <>
      <div className="settings--page">
        <SettingsLayout index={1}/>
        <div className="settings--container">
          <div className="settings--content">
            <h2 className="settings--h2">Customize profile</h2>
            <h3 className="uppercase-h3-description">Profile Information</h3>
            <ProfileName
              displayName={displayName}
              setDisplayName={setDisplayName}
              handleSubmit={patchData}
            />
            <ProfileAbout
              about={about}
              setAbout={setAbout}
              handleSubmit={patchData}
            />
            <ProfileSocial
              isOpen={isOpen}
              onClose={handleOverlay}
              onSelectSocial={handleLinkSelection}
              addSocialLink={addSocialLink}
              deleteSocialLink={deleteSocialLink}
              socialLinks={socialLinks}
              counter={counter}
            />
            <h3 className="uppercase-h3-description">Images</h3>
            <ProfileImages
              setAvatarUrl={setAvatarUrl}
              setBannerUrl={setBannerUrl}
            />
            <h3 className="uppercase-h3-description">Profile Category</h3>
            {optionData.map(
              (option) =>
                option.id === 13 && (
                  <SettingItem
                    key={option.id}
                    option={option}
                    isToggled={nsfwProfile}
                    onItemClick={handleItemClick}
                  />
                )
            )}
            <h3 className="uppercase-h3-description">Advanced</h3>

            <ProfileAdvanced
              clickEvent={handleItemClick}
              array={initialStateArray}
            />
            <h3 className="uppercase-h3-description">Profile Moderation</h3>
            <div />
            <div>
              For moderation tools please visit our{" "}
              <a href="/moderation">Profile Moderation page</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
