"use client";
import SettingItem from "../components/UI/SettingItem.jsx";
import CreateLeftHeader from "./CreateLeftHeader.jsx";
import CreateLeftDropdown from "./CreateLeftDropdown.jsx";
import CreateRightRules from "./CreateRightRules.jsx";
import CreateLeftBox from "./CreateLeftBox.jsx";
import React, { useState, useEffect } from "react";
import Toolbar from "../components/UI/Toolbar.jsx";
import handler from "@/app/utils/apiHandler.js";
import CommunityInfoBox from "./CommunityInfoBox.jsx";
import CommunityRulesBox from "./CommunityRulesBox.jsx";
import getCookies from "../utils/getCookies.js";
import { useRouter } from "next/navigation.js";

import awwpfp from "@/app/assets/awwpfp.jpg";
import awwbanner from "@/app/assets/awwbanner.jpeg";

function Submit({ currentCommunity = "" }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [community, setCommunity] = useState(currentCommunity);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [nsfw, setNsfw] = useState(false);
  const [notify, setNotify] = useState(true);
  const [voteOptions, setVoteOptions] = useState([
    { option: "", votes: 0 },
    { option: "", votes: 0 },
  ]);
  const [voteLength, setVoteLength] = useState(1);
  const [mediaArray, setMediaArray] = useState([]);
  const [postMediaArray, setPostMediaArray] = useState([]);
  const [realVoteOptions, setRealVoteOptions] = useState([]);
  const [isPollEnabled, setIsPollEnabled] = useState(false);
  const [isCommunityFound, setIsCommunityFound] = useState(false);
  const [ready, setReady] = useState(false);
  const [pollReady, setPollReady] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const [urlReady, setUrlReady] = useState(false);
  const [selectedOption, setSelectedOption] = useState("post");
  const [communityRules, setCommunityRules] = useState([]);
  const [communityMembers, setCommunityMembers] = useState(0);
  const [communityDescription, setCommunityDescription] =
    useState("Empty Description");
  const [communityDate, setCommunityDate] = useState("Empty Date");
  const [communityBanner, setCommunityBanner] = useState(
    awwbanner
  );
  const [communityIcon, setCommunityIcon] = useState(awwpfp);
  const [communityType, setCommunityType] = useState("Public");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);

  const DEBOUNCE_DELAY = 1500;


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const cookies = await getCookies();
        if (cookies !== null && cookies.access_token && cookies.username){
          setToken(cookies.access_token);
        }
        else {router.push("/login");}
        // Fetch user preferences
        if(currentCommunity !== ""){
        const prefsData = await handler(
          `/community/get-info?communityName=${community}`,
          "GET",
          "",
          cookies.access_token
        );
        setIsCommunityFound(true);
        setCommunityRules(prefsData.rules);
        setCommunityMembers(prefsData.membersCount);
        setCommunityDescription(prefsData.description);
        setCommunityDate(prefsData.dateCreated);
        setCommunityBanner(awwbanner);
        setCommunityIcon(awwpfp);
        setCommunityType(prefsData.communityType);
      }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsCommunityFound(false);
        // Handle error (e.g., show error message, retry mechanism)
      } finally {
        setLoading(false); // Set loading state to false regardless of success or error
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user preferences
        if(community !== ""){
        const prefsData = await handler(
          `/community/get-info?communityName=${community}`,
          "GET",
          "",
          token
        );
        setIsCommunityFound(true);
        setCommunityRules(prefsData.rules);
        setCommunityMembers(prefsData.membersCount);
        setCommunityDescription(prefsData.description);
        setCommunityDate(prefsData.dateCreated);
        setCommunityBanner(awwbanner);
        setCommunityIcon(awwpfp);
        setCommunityType(prefsData.communityType);
      }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsCommunityFound(false);
        // Handle error (e.g., show error message, retry mechanism)
      } finally {
      }
    }

    const delay = setTimeout(() => {
      fetchData();
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(delay);
  }, [community]);

  useEffect(() => {
    if (community !== "" && title !== "" && pollReady && mediaReady && urlReady) setReady(true);
    else setReady(false);
  }, [community, title, pollReady, mediaReady, urlReady]);

  useEffect(() => {
    if (selectedOption === "link" && url === "" ) setUrlReady(false);
    else setUrlReady(true);
  }, [selectedOption, url]);

  useEffect(() => {
    if (selectedOption === "image" && mediaArray.length === 0) setMediaReady(false);
    else setMediaReady(true);
  }, [selectedOption, mediaArray]);

  useEffect(() => {
    if (selectedOption === "poll" && !isPollEnabled) setPollReady(false);
    else setPollReady(true);
  }, [selectedOption, isPollEnabled]);

  useEffect(() => {
    setIsPollEnabled(realVoteOptions.length > 1 && selectedOption === "poll");
  }, [realVoteOptions, selectedOption]);

  useEffect(() => {
    // Filter out empty placeholder options
    const filteredOptions = voteOptions.filter(
      (item) => item.option.trim() !== ""
    );
    setRealVoteOptions(filteredOptions);
  }, [voteOptions]);


  if (loading) {
    return (
      <div className="window">
        <div className="setting--page">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  async function createPost(){
    try{
      const formData = new FormData();
      formData.append(`title`, title);
      formData.append(`community`, community);
      formData.append(`sendPostReplyNotification`, notify);
      formData.append(`isNsfw`, nsfw);
      formData.append(`isSpoiler`, spoiler);
      
      if(mediaArray.length > 0){
        mediaArray.forEach((file, index) => {
          formData.append(`files`, file);
          
        });
      }
      if(selectedOption === "post"){
        formData.append(`content`, content);
        formData.append(`type`, "Post");
      }
      else if(selectedOption === "image"){
        formData.append(`type`, "Images & Video");
        formData.append(`fileType`, `image`)
      }
      else if(selectedOption === "link"){
        formData.append(`type`, "Link");
        formData.append(`link`, url);
      } else if(selectedOption === "poll"){
        formData.append(`type`, "Poll");
        formData.append(`pollVotingLength`, `${voteLength} Days`);
        formData.append(`pollOptions`, JSON.stringify(realVoteOptions));
        formData.append(`content`, content);
      }

      const response = await fetch(`http://localhost:80/posts`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.error}`);
    }
    const responseData = await response.json();
    console.log('New Post added:', responseData);

    } catch (error) {
      console.error("Error creating post:", error);
    }

    
  }

  console.log(mediaArray)
  return (
    <div>
      <header>
      <Toolbar loggedin={true}/></header>
      <main className="create" style={{marginTop: "30px"}}>
        <div className="createMainFlex">
          <div className="createLeftFlex">
            <CreateLeftHeader />
            {isCommunityFound && <h1>7asal</h1>}
            <CreateLeftDropdown setter={setCommunity} current={community} />
            <CreateLeftBox
              setTitle={setTitle}
              title={title}
              url={url}
              setUrl={setUrl}
              setNsfw={setNsfw}
              nsfw={nsfw}
              spoiler={spoiler}
              setSpoiler={setSpoiler}
              notify={notify}
              setNotify={setNotify}
              length={voteLength}
              setLength={setVoteLength}
              options={voteOptions}
              setOptions={setVoteOptions}
              mediaArray={mediaArray}
              setMediaArray={setMediaArray}
              postMediaArray={postMediaArray}
              setPostMediaArray={setPostMediaArray}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              ready={ready}
              content={content}
              setContent={setContent}
              createPost={createPost}
            />
          </div>
          <div className="createRightFlex">
            <div className="createRightFlexPadding">
              <CommunityInfoBox title={community} description={communityDescription} iconurl={communityIcon}
              bannerurl={communityBanner} membercount={communityMembers} datecreated={communityDate}/>
              <CommunityRulesBox rules={communityRules} community={community}/>
              <CreateRightRules />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Submit;
