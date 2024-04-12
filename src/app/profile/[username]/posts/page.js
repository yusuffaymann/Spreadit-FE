"use client";

import React, { useState } from "react";
import Post from "../../../components/post/Post";
import Sidebar from "../../../components/UI/Sidebar";
import ToolBar from "../../../components/UI/Toolbar";
import MyProfileInfo from "../../MyProfileInfo";
import ProfileInfo from "../../ProfileInfo";
import ProfileBar from "../../ProfileBar";
import Image from "next/image";
import { useRouter } from "next/navigation";

import profilepicture from "@/app/assets/PP1.png";
import addPhotoIcon from "@/app/assets/add-photo.svg";
import styles from "../../Profile.module.css";
import getCookies from "../../../utils/getCookies";
import { useEffect } from "react";

import apiHandler from "../../../utils/apiHandler"
import parseTime from "../../../utils/timeDifference"

function Profile({params : {username}}) {
  const router = useRouter();
  const [selected, setSelected] = React.useState(1);
  const [token, setToken] = React.useState(null);

  const [avatar, setAvatar] = React.useState(profilepicture);
  const [isMe, setIsMe] = React.useState(false);

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if(cookies !== null){
        setToken(cookies.access_token);
        console.log("Yummy Token " + cookies.access_token);
      }

      const user_info = await apiHandler('/user-info', 'GET', "");
      if(user_info.username === username){
        setIsMe(true);
        setAvatar(user_info.avatar);
      }

    }
    fetchData();
  }, []);



  const [reachedEnd, setReachedEnd] = useState(false);
  const [postArray,setPostArray] = useState([]);
  const [subArray,setSubArray] = useState([]);
  const [sortBy,setSortBy] = useState("Best");

  function changeSort (newSort) {
    setSortBy(newSort);
    setPostArray([]);
  }

  function toggleDropdown() {
    setShowDropdown(prevShowDropdown => !prevShowDropdown);
}

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomOfPage = (scrollTop + clientHeight + 200 >= scrollHeight);

    setReachedEnd(bottomOfPage);
  };

  let video1 = "https://www.youtube.com/watch?v=Sklc_fQBmcs";
  let subRedditRules=["rule 1","read rule 1 again",]
  video1 = convertToEmbedLink(video1);
  const pollOptions = [{votes:5 , option:"Option A"},{votes:5 , option:"Option B"}]


  useEffect(() => {
    async function getSub() { //this use Effect will probably be moved to the useEffect right below it when we get the actual array from the backend
      try {
        if(reachedEnd || postArray.length === 0) {
        const subs = await apiHandler("/communities", "GET");
        setSubArray(prevSubArray => [...prevSubArray, subs.sub1, subs.sub2, subs.sub3]);//subs.sub1 etc will be changed in integration when we get an actual array from backend same for posts.post1 in getPost
        }
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getSub();
  }, [reachedEnd,sortBy]);


  useEffect(() => {
    async function getPost() {
      try {

        if(reachedEnd || postArray.length === 0) {
        const posts = await apiHandler("/posts", "GET");//todo change api endpoint according to sortBy state
        setPostArray(prevPostArray => [...prevPostArray, posts.post1, posts.post2, posts.post3]);
        //todo call to subReddit endpoint using the subReddit name in postObject.community to get info about the subReddit of the post then add it to the subArray to be used in populating post component
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    }
    getPost();
  }, [reachedEnd,sortBy]);

  function convertToEmbedLink(videoLink) {
    // Regular expression to check if the link is a YouTube link
    const youtubeRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

    if (youtubeRegex.test(videoLink)) {
        // If it's a YouTube link, replace "watch" with "embed"
        return videoLink.replace("/watch?v=", "/embed/");
    } else {
        // If it's not a YouTube link, return the original link
        return videoLink;
    }
}



  return (
    <div className={styles.profile_container}>
      <ToolBar page={"Profile"} loggedin={true} />

      <div className={styles.main_container}>

        <div className={styles.sidebar}>
          <Sidebar />
        </div>

        <div className={styles.profile}>
          <div className={styles.profile_header}>
            <div className={styles.profile_banner}>
              <div className={styles.profile_picture}>
                <Image
                  src={avatar}
                  width={64}
                  height={64}
                  style={{
                    overflow: "hidden",
                    borderRadius: "624.9375rem",
                    borderStyle: "solid",
                    borderColor: "#0000001a",
                  }}
                  alt="profile picture"
                />
                <div className={styles.circle} onClick={() => {router.push("/settings/profile")}}>
            <Image src={addPhotoIcon} width={16} height={16} alt="Post Options" />
          </div>
              </div>

              <div className={styles.profile_name}>
                <h1 className={styles.username_header}>{username}</h1>
                <p className={styles.username}>u/{username}</p>
              </div>
            </div>

            <ProfileBar selected={selected} setSelected={setSelected} isMe={isMe} username={username} />

            <div className={styles.posts}>

              {postArray.map((postObject, index) => (

                  <div className={styles.post} key={index}>
                    <Post subRedditName={postObject.community} subRedditPicture={subArray[index].image} subRedditDescription={subArray[index].description} banner={subArray[index].communityBanner} subRedditRules={subArray[index].rules} time={parseTime(postObject.date)} title={postObject.title} description={postObject.content[0]} images={postObject.images} video={postObject.videos} upVotes={postObject.votesUpCount - postObject.votesDownCount} comments={postObject.commentsCount} userName={postObject.username} isSpoiler={postObject.isSpoiler} isNSFW={postObject.isNsfw} pollOptions={postObject.pollOptions} pollIsOpen={postObject.isPollEnabled} sendReplyNotifications={postObject.sendPostReplyNotification} isMember={false} />
                  </div>
                  ))}

            </div>
          </div>

          <div className={styles.profile_info_container}>
            <div className={styles.profile_info}>
              {isMe ? <MyProfileInfo username={username} /> : <ProfileInfo username={username} />}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;