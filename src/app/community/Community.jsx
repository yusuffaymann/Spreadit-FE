import React, { useEffect, useState } from "react";
import Sidebar from "../components/UI/Sidebar";
import CommunityRightSidebar from "../components/UI/CommunityRightSidebar";
import ModCommunityRightSidebar from "../components/UI/ModCommunityRightSidebar";
import ToolBar from "../components/UI/Toolbar";
import Post from "../components/post/Post";
import "./Community.css";
import awwpfp from "@/app/assets/awwpfp.jpg";
import awwbanner from "@/app/assets/awwbanner.jpeg";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PopupMessage from "./PopupMessage";
import DropDownItem from "../components/UI/DropDownItem";

function Community({ communityName }) {
  //const [communityName, setCommunityName] = useState("aww");

  const images = [
    "https://media.gettyimages.com/id/1132402360/photo/cat-sleeping-on-her-back.jpg?s=612x612&w=gi&k=20&c=EgyglqP76bDYcs_QAHQ-4ZLI0_Bldwtajfnw7UpE89M=",
    "https://media.istockphoto.com/id/94056427/photo/adorable-silver-tabby-kitten-sleeping-stretched-out.jpg?s=1024x1024&w=is&k=20&c=E_AZrLVF6sT8sEN43vs-lE5xuAJabayHTQ8O2RH9VTs=",
    "https://media1.popsugar-assets.com/files/thumbor/fKpl-doFLDJWfxYCz5X1mAr5jRI=/0x0:2003x2003/2011x2011/filters:format_auto():quality(85):extract_cover()/2019/09/23/864/n/1922243/74b4f2275d89208a0f2ad4.00493766_.jpg",
  ];
  function convertToEmbedLink(videoLink) {
    // Regular expression to check if the link is a YouTube link
    const youtubeRegex =
      /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

    if (youtubeRegex.test(videoLink)) {
      // If it's a YouTube link, replace "watch" with "embed"
      return videoLink.replace("/watch?v=", "/embed/");
    } else {
      // If it's not a YouTube link, return the original link
      return videoLink;
    }
  }

  let video = "https://www.youtube.com/watch?v=Sklc_fQBmcs";
  let subRedditRules = ["rule 1", "read rule 1 again"];

  const [isMod, setIsMod] = useState(false);

  video = convertToEmbedLink(video);

  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const AddToFavorite = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      setPopupMessage(`Removed r/${communityName} from favorites`);
    } else {
      setPopupMessage(`Added r/${communityName} to favorites`);
    }
    setShowPopup(true);
    setIsOpen(false);
  };

  const Muted = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setPopupMessage(`Muted r/${communityName}`);
    } else {
      setPopupMessage(`UnMuted r/${communityName}`);
    }
    setShowPopup(true);
    setIsOpen(false);
  };

  const Joined = () => {
    setIsJoined(!isJoined);
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

  return (
    <div className="community">
      <ToolBar page={communityName} loggedin={true} />

      <div className="main-container">
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="community-container">
          <div className="community-profile">
            <Image className="banner" src={awwpfp} alt="Community Banner" />
            <Image
              className="profile-picture"
              src={awwpfp}
              alt="Community Profile"
            />

            <div className="profile-box">
              <p className="community-name">r/{communityName}</p>
              <button className="create-post-button">
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
                {/*       <ReportModal subRedditName={"r/aww"} subRedditPicture={"https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd"} subRedditRules={subRedditRules} /> */}
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
                    <CommunityRightSidebar />{" "}
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
