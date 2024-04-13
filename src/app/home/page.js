'use client'
import { useState, useEffect } from "react";
import Image from 'next/image';
import styles from "./page.module.css"
import Sidebar from "../components/UI/Sidebar";
import ToolBar from "../components/UI/Toolbar";
import RecentPosts from "./RecentPosts";
import Post from "../components/post/Post"
import PostDropDownMenu from "../components/post/PostDropDownMenu";
import PostDropDownItem from "../components/post/PostDropDownItem";
import handler from "../utils/apiHandler";
import up from "../assets/up-arrow.svg";
import parseTime from "../utils/timeDifference"

function homepage() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading,setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [postArray,setPostArray] = useState([]);
  const [subArray,setSubArray] = useState([]);
  const [sortBy,setSortBy] = useState("best");
  const [subscribedArray, setSubscribedArray] = useState([])

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
    const scrollY = window.scrollY // Get scroll position
    setShowButton(scrollY > 200);
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomOfPage = (scrollTop + clientHeight + 200 >= scrollHeight);

    setReachedEnd(bottomOfPage);
  };

  const pollOptions = [{votes:5 , option:"Option A"},{votes:5 , option:"Option B"}]

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Subscribe to window resize event
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    async function getPost() {
        setLoading(true);
      try {

        if(reachedEnd || postArray.length === 0) {
        const posts = await handler(`/home/${sortBy}`, "GET", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk");//todo change api endpoint according to sortBy state
        setPostArray(posts);

        //todo call to subReddit endpoint using the subReddit name in postObject.community to get info about the subReddit of the post then add it to the subArray to be used in populating post component
        const subs = await Promise.all(posts.map(async (postObj) => {
          const data = await handler(`/community/get-info?communityName=${postObj.community}`, "GET", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
          const returnedData = {description: data.description, rules: data.rules, image: "https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd",
          communityBanner: "https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_rympiqekcqbc1.png",
        }
          return returnedData
        }))
        setSubArray(subs)

        const getSubscribed = await Promise.all(posts.map(async (postObj) => {
          const data = await handler(`/community/is-subscribed?communityName=${postObj.community}`, "GET", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
          return data
        }))
        setSubscribedArray(getSubscribed)

        
      }
      
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    getPost();
  }, [reachedEnd,sortBy]);


    return (!loading &&
        <div className={styles.page}>
        <ToolBar loggedin={true} page={"Spreadit"} />
        {showButton === true && 
        <button type="button" className={styles.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Image 
          src={up}
          width={24}
          height={24} 
          viewBox="0 0 20 20"
          alt="return to top" />
        </button>}
        {windowWidth > 1400 &&<div className={styles.sideBar}> <Sidebar /></div>}
        <div className={styles.feed}>
          <div className={styles.feedHeader}>
            <button type="button" className={styles.sortButton} onClick={toggleDropdown}>
              <div style={{color: "rgb(87, 111, 118)"}}>{`${sortBy}`}</div>
              <Image className={styles.sortArrow}
                src={up}
                width={12}
                height={12} 
                viewBox="0 0 20 20"
                alt="return to top" />
                <PostDropDownMenu showDropdown={showDropdown} setShowDropDown={setShowDropdown} > 
                    <PostDropDownItem description="Best" onClick={() => changeSort("Best")} />
                    <PostDropDownItem description="Hot" onClick={() => changeSort("Hot")} />
                    <PostDropDownItem description="New" onClick={() => changeSort("New")} />
                    <PostDropDownItem description="Top" onClick={() => changeSort("Top")} />
                </PostDropDownMenu>
            </button>
          </div>
          {!loading && <div className={styles.feedContent}>
              {postArray.map((postObject, index) => (
                <div className={styles.post} key={index}>
                  <Post postId={postObject._id} subRedditName={postObject.community} subRedditPicture={subArray[index].image} subRedditDescription={subArray[index].description} banner={subArray[index].communityBanner} subRedditRules={subArray[index].rules} time={parseTime(postObject.date)} title={postObject.title} description={postObject.content[0]} images={[]} video={[]} upVotes={postObject.votesUpCount - postObject.votesDownCount} comments={postObject.commentsCount} userName={postObject.username} isSpoiler={postObject.isSpoiler} isNSFW={postObject.isNsfw} pollOptions={postObject.pollOptions} pollIsOpen={postObject.isPollEnabled} pollExpiration={postObject.pollExpiration} sendReplyNotifications={postObject.sendPostReplyNotification} isMember={subscribedArray[index].isSubscribed} />
                </div>))}
          </div>}
        </div>
        {windowWidth > 1150 && <div className={styles.recentPostsGridColumn}> <div className={styles.recentPostsContainer}>
          <RecentPosts />
        </div>
        </div>}
      </div>
      );
  }

  export default homepage;