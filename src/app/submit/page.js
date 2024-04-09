'use client'
import SettingItem from "../components/UI/SettingItem.jsx"
import CreateLeftHeader from "./CreateLeftHeader.jsx";
import CreateLeftDropdown from "./CreateLeftDropdown.jsx";
import CreateRightRules from "./CreateRightRules.jsx";
import CreateLeftBox from "./CreateLeftBox.jsx";
import React, {useState, useEffect} from "react"
import Bar from "../components/UI/Bar.jsx";
import handler from "@/app/utils/apiHandler.js";
import CommunityInfoBox from "./CommunityInfoBox.jsx";
import CommunityRulesBox from "./CommunityRulesBox.jsx";

function Submit({currentCommunity = ""}) {
  const [community,setCommunity] = useState(currentCommunity);
  const [title,setTitle] = useState('');
  const [url,setUrl] = useState('');
  const [spoiler, setSpoiler] = useState(false);
  const [nsfw, setNsfw] = useState(false);
  const [notify, setNotify] = useState(true);
  const [voteOptions, setVoteOptions] = useState([
    { option: '', votes: 0 },
    { option: '', votes: 0 }
  ]);
  const [voteLength, setVoteLength] = useState(1);
  const [mediaArray, setMediaArray] = useState([]);
  const [postMediaArray, setPostMediaArray] = useState([]);
  const [realVoteOptions, setRealVoteOptions] = useState([]);
  const [isPollEnabled, setIsPollEnabled] = useState(false);
  const [isCommunityFound, setIsCommunityFound] = useState(false);
  const [ready, setReady] = useState(false);
  const [selectedOption, setSelectedOption] = useState("post");
  
  const [content, setContent] = useState("");


  const [loading, setLoading] = useState(true);
  
const DEBOUNCE_DELAY = 1500;

  useEffect(() => {
    async function fetchData() {
        try { 
          setLoading(true);
          // Fetch user preferences
          const prefsData = await handler(`/community/get-info?communityName=${community}`, "GET")
          setIsCommunityFound(true);

        } catch (error) {
          console.error('Error fetching data:', error);
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
          const prefsData = await handler(`/community/get-info?communityName=${community}`, "GET")
          setIsCommunityFound(true);

        } catch (error) {
          console.error('Error fetching data:', error);
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
    if (community !== "" && title !== "")
    setReady(true);
    else setReady(false);
  }, [community, title]);

  useEffect(() => {
    setIsPollEnabled( selectedOption === "poll" );
  }, [selectedOption]);


  useEffect(() => {
    // Filter out empty placeholder options
    const filteredOptions = voteOptions.filter(item => item.option.trim() !== "");
    setRealVoteOptions(filteredOptions);
  }, [voteOptions]);

  useEffect(() => {
    console.log(realVoteOptions);
    console.log(voteOptions);
  }, [realVoteOptions]);

  useEffect(() => {
    setIsPollEnabled(realVoteOptions.length > 0);
  }, [realVoteOptions]);


  useEffect(() => {
      console.log({notify});
  }, [notify]);

  useEffect(() => {
    console.log({mediaArray});
}, [mediaArray]);

if (loading) {
  return (
    <div className="window">
      <div className="setting--page">
        <div>Loading...</div>
      </div>
    </div>
  );
}

    return (
      <div>
        <Bar/>
      <main className="create">
      <div className="createMainFlex">
        <div className="createLeftFlex">
            <CreateLeftHeader />
            {isCommunityFound && <h1>7asal</h1>}
            <CreateLeftDropdown setter={setCommunity} current={community}/>
          <CreateLeftBox setTitle={setTitle} title={title} url={url} setUrl={setUrl} setNsfw={setNsfw}
          nsfw={nsfw} spoiler={spoiler} setSpoiler={setSpoiler} notify={notify} setNotify={setNotify}
          length={voteLength} setLength={setVoteLength} options={voteOptions} setOptions={setVoteOptions}
          mediaArray={mediaArray} setMediaArray={setMediaArray} postMediaArray={postMediaArray}
          setPostMediaArray={setPostMediaArray} selectedOption={selectedOption} setSelectedOption={setSelectedOption}
          ready={ready} content={content} setContent={setContent}/>
          
        </div>
        <div className="createRightFlex">
        <div className="createRightFlexPadding">
          <CommunityInfoBox/>
          <CommunityRulesBox/>
          <CreateRightRules />
          </div>  
        </div>
      </div>
    </main>
    </div>
    )
};

export default Submit