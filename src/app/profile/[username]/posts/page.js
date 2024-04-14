"use client";
import React from "react";
import { useState } from "react";
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
  const [postArray,setPostArray] = useState([]);
  const [subArray,setSubArray] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);

  

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if(cookies !== null && cookies.access_token && cookies.username){
        setToken(cookies.access_token);

        if(cookies.username === username){
          setIsMe(true);
          setAvatar(cookies.avatar)
        } else{
          //check if the user exists or not
          try{
            console.log("bagib posts 7ad tany")
            const userInfo = await apiHandler(`/user/profile-info/${username}`, "GET", "", cookies.access_token)
            setAvatar(userInfo.avatar)
            setIsMe(false);
          }
          catch(err){ 
            router.push("/404")
          }
        }
      } else {
        router.push("/login")
      }

    }
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomOfPage = (scrollTop + clientHeight + 200 >= scrollHeight);

    setReachedEnd(bottomOfPage);
  };


  useEffect(() => {

    async function getPosts() {
      if(token === null) return;
      try {
        if(reachedEnd || postArray.length === 0) {
          const posts = await apiHandler(`/posts/username/${username}`, "GET", "", token);//todo change api endpoint according to sortBy state
          console.log(posts);
          setPostArray([...postArray, ...posts]);
        }


      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    }
    getPosts();
  },[reachedEnd, token]);

  useEffect(() => {
    async function getRemainingData() {
      if(token === null) return;
      try {
      const subsPromises = postArray.map(async (postObj) => {
        const subData = await apiHandler(`/community/get-info?communityName=${postObj.community}`, "GET", "", token);
        const subscribed = await apiHandler(`/community/is-subscribed?communityName=${postObj.community}`, "GET", "", token);
        return { ...subData, ...subscribed};
        /* return { description: subData.description, rules: subData.rules, image: "https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd", communityBanner: "https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_rympiqekcqbc1.png", ...subscribed}; */
    });
      const subs = await Promise.all(subsPromises);
      setSubArray([...subArray, ...subs]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  getRemainingData();
  },[postArray, token]);

  
  return (
    <div className={styles.profile_container}>
      <ToolBar page={`u/${username}`} loggedin={true} />

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
                  {/* {console.log(postArray)} */}
                  <Post postId={postObject._id} subRedditName={postObject.community} subRedditPicture={subArray[index] ? subArray[index].image : ""} subRedditDescription={subArray[index] ? subArray[index].description : ""} banner={subArray[index] ? subArray[index].communityBanner : ""} subRedditRules={subArray[index] ? subArray[index].rules : ""} time={parseTime(postObject.date)} title={postObject.title} description={postObject.content[postObject.content.length-1]?postObject.content[postObject.content.length-1]:""} attachments={postObject.attachments} upVotes={postObject.votesUpCount - postObject.votesDownCount} comments={postObject.commentsCount} userName={postObject.username} isSpoiler={postObject.isSpoiler} isNSFW={postObject.isNsfw} isSaved={postObject.isSaved} pollOptions={postObject.pollOptions} pollIsOpen={postObject.isPollEnabled} pollExpiration={postObject.pollExpiration} sendReplyNotifications={postObject.sendPostReplyNotification} isMember={subArray[index] ? subArray[index].isSubscribed : true} />
                </div>))}

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
