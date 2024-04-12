'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState,useEffect } from 'react';
import ToolBar from "../../components/UI/Toolbar";
import Sidebar from "../../components/UI/Sidebar";
import Comment from "../../components/UI/Comment";
import apiHandler from "../../utils/apiHandler";
import Post from "../../components/post/Post"
import CommentPost from "../../components/UI/CommentPost";
import CommentInput from "../../components/UI/CommentInput";
import RightCommentsSidebar from "../../components/UI/RightCommentsSidebar";
import { useSearchParams } from "next/navigation";

const Home=({params : {postId}})=> {
  const UserName="Teachers";
  const temporaryToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk";
  const searchParams=useSearchParams();
  const isedit=searchParams.has("isEditing");
  const [userData, setUserData] = useState(null);
  const [addingComment,setAddingComment]=useState(false);
  const [comments,setComments]=useState(null);
  const [isEditing,setIsEditing]=useState(true);
  const [postIdState, setPostIdState] = useState(postId);
  const [posterUserName,setPosterUserName] = useState("");
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
  const [subRules,setSubRules] = useState("");
  const [members,setMembers] = useState([]);
  const [isMember,setIsMember] = useState(false);
  const [myUserName,setMyUserName] = useState("u/Common-Summer-7186");
  const [profilePicture,setProfilePicture]=useState("https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg");
  const [loading,setLoading] = useState(true);
  const [thePost,setThePost]=useState(null);
  const [theSub,setTheSub]=useState(null);
  const [subscribe,setSubscribe]=useState(null);

useEffect(()=>{
  setIsEditing(isedit);
});
/* useEffect(() => {
  async function getSub() {
      setLoading(true);
    try {
      const subs = await apiHandler("/community/get-info", "GET","",temporaryToken);
      const sub0 = subs;
      console.log("hello");
      console.log(subs);
    
      setSubDescription(sub0.description);
      setSubImage(sub0.image);
      setSubBanner(sub0.communityBanner);
      setMembers(sub0.members);
      setSubRules(sub0.rules);
      setIsMember(sub0.members && sub0.members.includes(myUserName));
      setIsMember(sub0.members.includes(myUserName));

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }
  getSub();
}, []);


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

let video1 = "https://www.youtube.com/watch?v=Sklc_fQBmcs";
video1 = convertToEmbedLink(video1);
const pollOptions = [{votes:5 , option:"Option A"},{votes:5 , option:"Option B"}] */

useEffect(() => {
  async function getPost() {
      setLoading(true);
    try {
      const post = await apiHandler(`/posts/624a6962a85ed5a6d6ca9373`, "GET", "","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk" );//todo change api endpoint according to sortBy state
      console.log(post);
      setThePost(post);

      //todo call to subReddit endpoint using the subReddit name in postObject.community to get info about the subReddit of the post then add it to the subArray to be used in populating post component
        const data = await apiHandler(`/community/get-info?communityName=${post.community}`, "GET", "", temporaryToken);
        const returnedData = {description: data.description, rules: data.rules, image: "https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd",
        communityBanner: "https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_rympiqekcqbc1.png"};
        setTheSub(returnedData);

        const subscribeData = await apiHandler(`/community/is-subscribed?communityName=${post.community}`, "GET", "", temporaryToken)
        setSubscribe(subscribeData);
    
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }
  getPost();
},[]);


  const onComment = async (newComment) => {
    try {
          const response = await apiHandler(`/post/comment/${postIdState}`, "POST",newComment);
          console.log('New comment added:', response);
          setComments((prev) => [...prev, newComment]);

    } catch (error) {
        console.error('Error adding comment:', error.message);
    }
}

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3002/community/${UserName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data[UserName]);
        setUserData(data[UserName]);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }
    async function fetchData2() {
      try {
        const response = await fetch(`http://localhost:3002/posts/comment/${postIdState}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        setComments(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }
    fetchData();
    fetchData2();
  }, []);
  if (!userData||!comments) {
    return <div>Loading...</div>;
  }
  const {communityName, communityRules, communityDescription,numberofmembers,isJoined,moderators} = userData;
  const subRedditName="bb";
  const subRedditPicture="https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd";
  const banner="https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_rympiqekcqbc1.png";
  const subRedditDescription="Things that make you go AWW! -- like puppies, bunnies, babies, and so on... Feel free to post original pictures and videos of cute things.";

  return (
    <div>
      <ToolBar page="spreadit"  loggedin={true} />
      <div className={styles.page}>
        <div className={styles.leftbar}>
          <Sidebar />
        </div>
        <div className={styles.mainbar}>
            <div className={styles.postarea}>
            <CommentPost postId={thePost._id} subRedditName={thePost.community} subRedditPicture={theSub.image} subRedditDescription={theSub.description} banner={theSub.communityBanner} subRedditRules={theSub.rules} time={parseTime(thePost.date)} title={thePost.title} description={thePost.content[0]} images={[]} video={[]} upVotes={thePost.votesUpCount - thePost.votesDownCount} comments={thePost.commentsCount} userName={thePost.username} isSpoiler={thePost.isSpoiler} isNSFW={thePost.isNsfw} pollOptions={thePost.pollOptions} pollIsOpen={thePost.isPollEnabled} pollExpiration={thePost.pollExpiration} sendReplyNotifications={thePost.sendPostReplyNotification} isMember={subscribe.isSubscribed} Editing={isEditing} />
             {/* <CommentPost postId={postIdState} description={"link1: https://search.yahoo.com/search?d=%7b%22dn%22%3a%22yk%22%2c%22subdn%22%3a%22software%22%2c%22ykid%22%3a%22236aff65-e6dc-456c-a1c5-cf15b5e12c43%22%7d&fr2=p%3ads%2cv%3aomn%2cm%3asa%2cbrws%3achrome%2cpos%3a2&fr=mcafee&type=E210US91105G0&p=Bootstrap jjjjj link2: https://docs.google.com/document/d/1NPsRCvTLL89FX1jr3JwNyadTWpVnsDFnWzvO_DHhfyg/edit"} userName={posterUserName} title={title} profilePicture={profilePicture} subRedditName={subName} subRedditDescription={subDescription} cakeDate={"1/1/2024"} subRedditPicture={subImage} banner={subBanner} upVotes={upVotes-downVotes} time={"2 mon"} comments={commentsCount} video={video1} isSpoiler={false} isNSFW={isNSFW} images={images} isMember={isMember} pollIsOpen={true} subRedditRules={subRules} pollOptions={pollOptions} Editing={isEditing}/> */}
            </div>
          <div className={styles.inputarea}>
            {addingComment&&(<CommentInput onComment={onComment} close={()=>{setAddingComment(false)}} buttonDisplay={"comment"} isPost={false} /> )}
            {!addingComment&&(<button className={styles.addcommentbutton} onClick={()=>{setAddingComment(true)}}>Add Comment</button>)}
          </div>
          
          {comments.length!==0&&(
            <div>
              {comments.map((comment)=>(
              <div>
                <Comment comment={comment} subRedditName={subName} subRedditPicture={subImage} subRedditRules={subRules}/>
              </div>
              ))}
            </div>
          )}
          {comments.length===0&&(<p>Be the first to add a comment</p>)}
        </div>
        <div className={styles.rightbar}>
          <RightCommentsSidebar name={subName} description={subDescription} rules={communityRules} members={numberofmembers} isJoined={isJoined} moderators={moderators} />
        </div>
      </div>
    </div>
  );
}

export default Home;