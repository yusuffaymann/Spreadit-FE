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
import Button from "../components/post/Button";

function homepage() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showDropdown, setShowDropdown] = useState(false);
/*   const [postId, setPostId] = useState(0);
  const [posterUserName,setPosterUserName] = useState("")
  const [upVotes,setUpVotes] = useState(0);
  const [downVotes,setDownVotes] = useState(0);
  const [commentsCount,setCommentsCount] = useState(0);
  const [title,setTitle] = useState("");
  const [description,setdescription] = useState("");
  const [images,setImages] = useState([]);
  const [video,setVideo] = useState("");
  const [isSpoiler,setisSpoiler] = useState(false);
  const [isNSFW,setIsNSFW] = useState(false);
  const [subName,setSubName] = useState("");
  const [subDescription,setSubDescription] = useState("");
  const [subImage,setSubImage] = useState("");
  const [subBanner,setSubBanner] = useState("");
  const [members,setMembers] = useState([]);
  const [isMember,setIsMember] = useState(false); */
  const [myUserName,setMyUserName] = useState("u/Common-Summer-7186");
  const [loading,setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
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
    const scrollY = window.scrollY // Get scroll position
    setShowButton(scrollY > 200);
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomOfPage = (scrollTop + clientHeight + 200 >= scrollHeight);

    setReachedEnd(bottomOfPage);
  };

  let video1 = "https://www.youtube.com/watch?v=Sklc_fQBmcs";
  let subRedditRules=["rule 1","read rule 1 again",]
  video1 = convertToEmbedLink(video1);
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
    async function getSub() {
        setLoading(true);
      try {
        const subs = await handler("/community/get-info", "GET");
        setSubArray(prevSubArray => [...prevSubArray, subs.sub1, subs.sub2, subs.sub3]);//subs.sub1 etc will be changed in integration when we get an actual array from backend same for posts.post1 in getPost
      
  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    getSub();
  }, []);


  useEffect(() => {
    async function getPost() {
        setLoading(true);
      try {

        if(reachedEnd || postArray.length === 0) {
        const posts = await handler("/posts", "GET");//todo change api endpoint according to sortBy state
        setPostArray(prevPostArray => [...prevPostArray, posts.post1, posts.post2, posts.post3]);
        //todo call to subReddit endpoint using the subReddit name in postObject.community to get info about the subReddit of the post then add it to the subArray to be used in populating post component
      }
      
/*         setPostId(post0.postId);
        setUpVotes(post0.votesUpCount);
        setDownVotes(post0.votesDownCount);
        setCommentsCount(post0.commentsCount);
        setTitle(post0.title);
        setdescription(post0.content[0]);
        setSubName(post0.community);
        setImages(post0.images);
        setisSpoiler(post0.isSpoiler);
        setIsNSFW(post0.isNsfw);
        setPosterUserName(post0.username); */
  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
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
          <div className={styles.feedContent}>
              {postArray.map((postObject, index) => (
                <div className={styles.post} key={index}>
                  <Post subRedditName={postObject.community} subRedditPicture={postObject.images[0]} subRedditDescription={"asdasda"} banner={postObject.images[2]} subRedditRules={subRedditRules} postTitle={postObject.title} description={"https://www.reddit.com/ bshvjdshcvhdsb https://www.reddit.com/"} images={postObject.images} video={[]} upVotes={postObject.votesUpCount - postObject.votesDownCount} comments={postObject.commentsCount} userName={postObject.username} isSpoiler={postObject.isSpoiler} isNSFW={postObject.isNsfw} pollOptions={postObject.pollOptions} pollIsOpen={postObject.isPollEnabled} isMember={false} />
                </div>))}
          </div>
        </div>
        {windowWidth > 1150 && <div className={styles.recentPostsGridColumn}> <div className={styles.recentPostsContainer}>
          <RecentPosts />
        </div>
        </div>}
      </div>
    );
  }

  export default homepage;