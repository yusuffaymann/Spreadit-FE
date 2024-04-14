import React, { useEffect, useState } from "react";
import Sidebar from "../components/UI/Sidebar";
import CommunityRightSidebar from "../components/UI/CommunityRightSidebar";
import ModCommunityRightSidebar from "../components/UI/ModCommunityRightSidebar";
import ToolBar from "../components/UI/Toolbar";
import Post from "../components/post/Post";
import "./Community.css";
import awwpfp from "@/app/assets/blueProfile.jpeg";
import awwbanner from "@/app/assets/background.jpeg";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PopupMessage from "./PopupMessage";
import DropDownItem from "../components/UI/DropDownItem";
import PostDropDownItem from "../components/post/PostDropDownItem";
import PostDropDownMenu from "../components/post/PostDropDownMenu";
import up from "@/app/assets/up-arrow.svg";
import getCookies from "../utils/getCookies";
import handler from "../utils/apiHandler";
import { useRouter } from "next/navigation";
import { Category } from "@mui/icons-material";
import parseTime from "../utils/timeDifference"
import { set } from "date-fns";

function Community({ communityName }) {
  //const [communityName, setCommunityName] = useState("aww");
  const router = useRouter();
  
  const [isMod, setIsMod] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const [communityinfo, setCommunityInfo] = useState({
    id: "",
    name: "",
    category: "",
    rules: [],
    description: "",
    communityType: "",
    membersCount: 0,
    dateCreated: "",
    communityBanner: awwbanner,
    image: awwpfp,
  });

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token) {
        try{
          const response = await handler(`/community/get-info?communityName=${communityName}`, "GET", "", cookies.access_token);
          setCommunityInfo({id: response._id, name: response.name, category: response.category, rules: response.rules, description: response.description, communityType: response.communityType, membersCount: response.membersCount, dateCreated: response.dateCreated, communityBanner: response.communityBanner, image: response.image});
          
          const isJoinedData = await handler(`/community/is-subscribed?communityName=${communityName}`, "GET", "", cookies.access_token);
          setIsJoined(isJoinedData.isSubscribed);

          const isFavoriteData = await handler(`/community/is-favourite?communityName=${communityName}`, "GET", "", cookies.access_token);
          setIsFavorite(isFavoriteData.isFavourite);
        } catch (err) {
          console.log("community not found");
        }
      }
    }
    fetchData();
  }, []);

  console.log(communityinfo);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const AddToFavorite = async () => {

    try{
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token) {return}

      if (!isFavorite) {
        setPopupMessage(`Added r/${communityName} to favorites`);
        const response = await handler(`/community/add-to-favourites`, "POST", {communityName: communityName}, cookies.access_token);
        console.log(response);
        setIsFavorite(!isFavorite);
      } else {
        setPopupMessage(`Removed r/${communityName} from favorites`);
        const response = await handler(`/community/remove-favourite`, "POST", {communityName: communityName}, cookies.access_token);
        console.log(response);
        setIsFavorite(!isFavorite);
      }
      setShowPopup(true);
      setIsOpen(false);

      } catch (err) {
        console.log("error muting community");
      }
  };

  const Muted = async () => {
    try{
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token) {return}

      
      if (!isMuted) {
        setPopupMessage(`Muted r/${communityName}`);
        const response = await handler(`/community/mute`, "POST", {communityName: communityName}, cookies.access_token);
        console.log(response);
        setIsMuted(!isMuted);
      } else {
        setPopupMessage(`UnMuted r/${communityName}`);
        const response = await handler(`/community/unmute`, "POST", {communityName: communityName}, cookies.access_token);
        console.log(response);
        setIsMuted(!isMuted);
      }
      setShowPopup(true);
      setIsOpen(false);

      } catch (err) {
        console.log("error muting community");
      }
   
  };

  const Joined = async () => {
      try{
        const cookies = await getCookies();
        if (cookies === null || !cookies.access_token) {return}
        const response = isJoined 
        ? await handler(`/community/unsubscribe`, "POST", {communityName: communityName}, cookies.access_token)
        : await handler(`/community/subscribe`, "POST", {communityName: communityName}, cookies.access_token);
        console.log(response);
        setIsJoined(!isJoined);
      } catch (err) {
        console.log("error joining community");
      }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      // Cleanup function to clear the timer
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  /////////////////////////// Basma Stuff ///////////////////////////

  const [showSort, setShowSort] = useState(false);
  const [showTimeSort, setShowTimeSort] = useState(false);
  const [loading,setLoading] = useState(true);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [postArray,setPostArray] = useState([]);
  const [sortBy,setSortBy] = useState("hot");
  const [timeSort,setTimeSort] = useState("today");

  const sortTimes = {
    now: "Now", today: "Today", week: "This Week", month: "This Month", year: "This Year", alltime: "All Time"
  }


  function changeSort (newSort) {
    setSortBy(newSort);
    setPostArray([]);
  }

  function changeTimeSort (newSort) {
    setTimeSort(newSort);
    setPostArray([]);
  }

  function toggleSortDropDown() {
    setShowSort(prevShowSort => !prevShowSort);
  }

  function toggleTimeSortDropDown() {
    setShowTimeSort(prevShowTimeSort => !prevShowTimeSort);
    }

    useEffect(() => {

      async function getPosts() {
        const cookies = await getCookies();
        if(cookies === null || !cookies.access_token) {router.push("/login"); return};
        const token = cookies.access_token;
        setLoading(true);
        try {
          if(reachedEnd || postArray.length === 0) {
            const posts = await handler(`/subspreadit/${communityName}/${sortBy}${sortBy === "top" ? `/${timeSort}` : "" }`, "GET", "", token);//todo change api endpoint according to sortBy state
            console.log(posts);
            if(sortBy === "new")
              setPostArray([...postArray, ...posts.posts]);
            else
              setPostArray([...postArray, ...posts]);
          }
  
  
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
      getPosts();
    },[reachedEnd,sortBy,timeSort]);
  

  return (
    <div className="community">
      <ToolBar page={communityName} loggedin={true} />

      <div className="main-container">
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="community-container">
          <div className="community-profile">

            <Image className="banner" src={awwbanner} alt="Community Banner" />


              <Image
              className="profile-picture"
                src={awwpfp}
                alt="Community Profile"
              />


            <div className="profile-box">
              <p className="community-name">r/{communityName}</p>
              <button className="create-post-button" onClick={() => {router.push("/submit")}}>
                {<AddIcon />}Create a Post{" "}
              </button>
              {!isMod ? (
                isJoined ? (
                  <button className="bell-button">
                    {<NotificationsIcon />}
                  </button>
                ) : (
                  ""
                )
              ) : (
                <button className="bell-button">{<NotificationsIcon />}</button>
              )}
              {!isMod ? (
                !isJoined ? (
                  <button
                    className="joined-button"
                    onClick={Joined}
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Join
                  </button>
                ) : (
                  <button className="joined-button" onClick={Joined}>
                    Joined
                  </button>
                )
              ) : (
                <button
                  className="joined-button"
                  style={{
                    backgroundColor: "rgb(48, 52, 206)",
                    color: "white",
                  }}
                >
                  Mod Tools
                </button>
              )}
              <div className="dropdown">
                <button onClick={toggleDropdown} className="edit-button">
                  <MoreHorizIcon />
                </button>
                {isOpen && (
                  <div className="dropdown-content">
                    <button onClick={AddToFavorite} className="inline-button">
                      {!isFavorite
                        ? "Add to favorites"
                        : "Remove from favorites"}
                    </button>
                    <button onClick={Muted}>
                      {!isMuted
                        ? `Mute r/${communityName}`
                        : `Unmute r/${communityName}`}
                    </button>
                    {isMod ? <button>Leave</button> : ""}
                  </div>
                )}
              </div>
              {showPopup && <PopupMessage message={popupMessage} />}
            </div>
          </div>

          <div className="community-post-container">
            <div className="community-post">
              <div className="post">

              <div className="sort-options">
                <button type="button" className={"sortButton"} onClick={toggleSortDropDown}>
                  <div style={{color: "rgb(87, 111, 118)"}}>{`${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}`}</div>
                  <Image className={"sortArrow"}
                    src={up} 
                    width={12}
                    height={12} 
                    viewBox="0 0 20 20"
                    alt="return to top" />
                    <PostDropDownMenu showDropdown={showSort} setShowDropDown={setShowSort} > 
                        <PostDropDownItem description="Random" onClick={() => changeSort("random")} />
                        <PostDropDownItem description="Hot" onClick={() => changeSort("hot")} />
                        <PostDropDownItem description="New" onClick={() => changeSort("new")} />
                        <PostDropDownItem description="Top" onClick={() => changeSort("top")} />
                    </PostDropDownMenu>
              </button>
              {sortBy === "top" && <button type="button" className={"sortButton"} onClick={toggleTimeSortDropDown}>
                <div style={{color: "rgb(87, 111, 118)"}}>{`${sortTimes[timeSort]}`}</div>
                <Image className={"sortArrow"}
                  src={up}
                  width={12}
                  height={12} 
                  viewBox="0 0 20 20"
                  alt="return to top" />
                  <PostDropDownMenu showDropdown={showTimeSort} setShowDropDown={setShowTimeSort} > 
                      <PostDropDownItem description="Now" onClick={() => changeTimeSort("now")} />
                      <PostDropDownItem description="Today" onClick={() => changeTimeSort("today")} />
                      <PostDropDownItem description="This Week" onClick={() => changeTimeSort("week")} />
                      <PostDropDownItem description="This Month" onClick={() => changeTimeSort("month")} />
                      <PostDropDownItem description="This Year" onClick={() => changeTimeSort("year")} />
                      <PostDropDownItem description="All Time" onClick={() => changeTimeSort("alltime")} />
                  </PostDropDownMenu>
              </button> }
              </div>
              {postArray.map((postObject, index) => (
                <div className={""} key={index}>
                  {/* {console.log(postArray)} */}
                  <Post postId={postObject._id} subRedditName={postObject.community} subRedditPicture={communityinfo.image} subRedditDescription={communityinfo.description} banner={communityinfo.communityBanner} subRedditRules={communityinfo.rules} time={parseTime(postObject.date)} title={postObject.title} description={postObject.content[postObject.content.length-1]?postObject.content[postObject.content.length-1]:""} attachments={postObject.attachments} upVotes={postObject.votesUpCount - postObject.votesDownCount} comments={postObject.commentsCount} userName={postObject.username} isSpoiler={postObject.isSpoiler} isNSFW={postObject.isNsfw} isSaved={postObject.isSaved} pollOptions={postObject.pollOptions} pollIsOpen={postObject.isPollEnabled} pollExpiration={postObject.pollExpiration} sendReplyNotifications={postObject.sendPostReplyNotification} isMember={isJoined} />
                </div>))}
            
               
              </div>
            </div>
            <div className="right-sidebar-container">
              <div className="right-sidebar">
                {" "}
                {isMod ? (
                  <div>
                    {" "}
                    <ModCommunityRightSidebar
                      communityName={communityName}
                    />{" "}
                  </div>
                ) : (
                  <div>
                    {" "}
                    <CommunityRightSidebar communityData={communityinfo} />{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
