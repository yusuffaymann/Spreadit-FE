"use client";
import React, { useState, useEffect } from "react";
import SettingItem from "../../components/UI/SettingItem.jsx";
import optionData from "../options.js";
import handler from "../../utils/apiHandler"
import SettingsLayout from "../SettingsLayout";

function Feed() {

  const [nsfw, setNsfw] = useState(false); // Assuming default value is false
  const [blurNsfw, setBlurNsfw] = useState(false); // Assuming default value is false
  const [homeRecommend, setHomeRecommend] = useState(false); // Assuming default value is false
  const [autoplay, setAutoplay] = useState(false); // Assuming default value is false
  const [reduceAnim, setReduceAnim] = useState(false); // Assuming default value is false
  const [communityThemes, setCommunityThemes] = useState(false); // Assuming default value is false
  const [contentSort, setContentSort] = useState(1); // Assuming default value is 1
  const [csRemember, setCSRemember] = useState(false); // Assuming default value is false
  const [globalView, setGlobalView] = useState(1); // Assuming default value is 1
  const [gvRemember, setGVRemember] = useState(false); // Assuming default value is false
  const [newTab, setNewTab] = useState(false); // Assuming default value is false
  const [defMarkdown, setDefMarkdown] = useState(false); // Assuming default value is false
  const [loading, setLoading] = useState(true); // Loading indicator
  


  useEffect(() => {
      async function fetchData() {
          setLoading(true);
        try {
          // Fetch user preferences
          const prefsData = await handler("/api/v1/me/prefs", "GET")
          setNsfw(prefsData.nsfw);
          setBlurNsfw(prefsData.blurnsfw);
          setHomeRecommend(prefsData.homerecommend);
          setAutoplay(prefsData.autoplay);
          setReduceAnim(prefsData.reduceanim);
          setCommunityThemes(prefsData.communitythemes);
          setContentSort(prefsData.contentsort);
          setCSRemember(prefsData.csremember);
          setGlobalView(prefsData.globalview);
          setGVRemember(prefsData.gvremember);
          setNewTab(prefsData.newtab);
          setDefMarkdown(prefsData.defmarkdown);
  
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
        nsfw: nsfw,
        blurnsfw: blurNsfw,
        homerecommend: homeRecommend,
        autoplay: autoplay,
        reduceanim: reduceAnim,
        communitythemes: communityThemes,
        contentsort: contentSort,
        csremember: csRemember,
        globalview: globalView,
        gvremember: gvRemember,
        newtab: newTab,
        defmarkdown: defMarkdown,
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
    }, [nsfw, blurNsfw, homeRecommend, autoplay, reduceAnim, communityThemes,
       contentSort, csRemember, globalView, gvRemember, newTab, defMarkdown]);




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
    handleAPIput(id,status)
    if (id === 1 && status === false) {
      handleLockComponent(2, true);
      console.log("locked");
    } else if (id === 1 && status === true) {
      handleLockComponent(2, false);
      console.log("unlocked");
    }
  };

  const handleDropdownClick = (id, selectedId) => {
    console.log(`page.js: SettingItem with ID ${id} clicked. ${selectedId}`);
    handleAPIput(id,selectedId)
  };
  

  const handleAPIput = (id, status) => {
    if (id === 1)
    setNsfw(status);
    else if (id === 2)
    setBlurNsfw(status);
    else if (id === 3)
    setHomeRecommend(status);
    else if (id === 4)
    setAutoplay(status);
    else if (id === 5)
    setReduceAnim(status);
    else if (id === 6)
    setCommunityThemes(status);
    else if (id === 7)
    setContentSort(status);
    else if (id === 8)
    setCSRemember(status);
    else if (id === 9)
    setGlobalView(status);
    else if (id === 10)
    setGVRemember(status);
    else if (id === 11)
    setNewTab(status);
    else if (id === 12)
    setDefMarkdown(status);
  }

  return (
    <div className = "window">
      <div className="settings--page">
      <SettingsLayout index={3}/>
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
                  dropDownClick={handleDropdownClick}
                  isToggled={false}
                  isLocked={lockedComponents[option.id]}
                  defaultDropdown={contentSort}
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
    </div>
    </div>
  );
}

export default Feed;

/*


*/