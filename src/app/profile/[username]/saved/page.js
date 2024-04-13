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
  const [selected, setSelected] = React.useState(3);
  const [token, setToken] = React.useState(null);

  const [avatar, setAvatar] = React.useState(profilepicture);
  const [isMe, setIsMe] = React.useState(false);
  const [subscribedArray, setSubscribedArray] = useState([])
  const [postArray,setPostArray] = useState([]);
  const [subArray,setSubArray] = useState([]);
  const [loading,setLoading] = useState(true);

  

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if(cookies !== null && cookies.access_token && cookies.username){
        setToken(cookies.access_token);
        console.log("Yummy Token " + cookies.access_token);
        setAvatar(cookies.avatar)
      }

      if(cookies.username === username){
        setIsMe(true);
      }

    }
    fetchData();
  }, []);



  



  let video1 = "https://www.youtube.com/watch?v=Sklc_fQBmcs";
  let subRedditRules=["rule 1","read rule 1 again",]
  video1 = convertToEmbedLink(video1);
  const pollOptions = [{votes:5 , option:"Option A"},{votes:5 , option:"Option B"}]

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

useEffect(() => {
  async function getPost() {
    try {
      console.log("da5alt agib el posts")
      const posts = await apiHandler(`/posts/save`, "GET", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk");//todo change api endpoint according to sortBy state
      console.log(posts)
      

      //todo call to subReddit endpoint using the subReddit name in postObject.community to get info about the subReddit of the post then add it to the subArray to be used in populating post component
      const subs = await Promise.all(posts.map(async (postObj) => {
        const data = await apiHandler(`/community/get-info?communityName=${postObj.community}`, "GET", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
        const returnedData = {description: data.description, rules: data.rules, image: "https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd",
        communityBanner: "https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_rympiqekcqbc1.png",
      }
      console.log(returnedData)
        return returnedData
      }))
      

      const getSubscribed = await Promise.all(posts.map(async (postObj) => {
        const data = await apiHandler(`/community/is-subscribed?communityName=${postObj.community}`, "GET", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
      console.log(data)
        return data
      }))
      setPostArray(posts);
      setSubArray(subs)
      setSubscribedArray(getSubscribed)

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }
  getPost();
}, []);



  return (!loading &&
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

            {!loading && postArray.map((postObject, index) => (
                <div className={styles.post} key={index}>
                  <Post postId={postObject._id} subRedditName={postObject.community} subRedditPicture={subArray[index].image} subRedditDescription={subArray[index].description} banner={subArray[index].communityBanner} subRedditRules={subArray[index].rules} time={parseTime(postObject.date)} title={postObject.title} description={postObject.content[0]} images={[]} video={[]} upVotes={postObject.votesUpCount - postObject.votesDownCount} comments={postObject.commentsCount} userName={postObject.username} isSpoiler={postObject.isSpoiler} isNSFW={postObject.isNsfw} pollOptions={postObject.pollOptions} pollIsOpen={postObject.isPollEnabled} pollExpiration={postObject.pollExpiration} sendReplyNotifications={postObject.sendPostReplyNotification} isMember={subscribedArray[index].isSubscribed} />
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
