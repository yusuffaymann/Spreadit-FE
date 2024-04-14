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
import parseTime from "@/app/utils/timeDifference"

const Home=({params : {postId}})=> {

  const temporaryToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEzMDI5MjM1fQ.ih5SD2C1dSo96CRDbUGX3E5z9mGvCh37zAGh53Y8z-M";
  const searchParams=useSearchParams();
  const isedit=searchParams.has("isEditing");
  const [addingComment,setAddingComment]=useState(false);
  const [comments,setComments]=useState([]);
  const [isEditing,setIsEditing]=useState(true);
  const [loading,setLoading] = useState(true);
  const [thePost,setThePost]=useState(null);
  const [theSub,setTheSub]=useState(null);
  const [joined,setJoined] = useState(false);
  const [subscribe,setSubscribe]=useState(null);
  /* const [addedcomment,setAddedComment]=useState(false); */

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
      const post = await apiHandler(`/posts/${postId}/one`, "GET", "",temporaryToken );//todo change api endpoint according to sortBy state
      console.log(post);
      setThePost(post);

      //todo call to subReddit endpoint using the subReddit name in postObject.community to get info about the subReddit of the post then add it to the subArray to be used in populating post component
        const data = await apiHandler(`/community/get-info?communityName=${post.community}`, "GET", "", temporaryToken);
        const returnedData = {description: data.description, rules: data.rules, image: "https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_x9kigzi7dqbc1.jpg?format=pjpg&s=9e3981ea1791e9674e00988bd61b78e8524f60cd",
        communityBanner: "https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_rympiqekcqbc1.png"};
        setTheSub(returnedData);

        const subscribeData = await apiHandler(`/community/is-subscribed?communityName=${post.community}`, "GET", "", temporaryToken);
        setSubscribe(subscribeData);
        setJoined(subscribeData.isSubscribed);

        const commentsData = await apiHandler(`/posts/comment/${post._id}?include_replies=true`, "GET", "", temporaryToken)
        console.log(commentsData)
        setComments(commentsData.comments)
    
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }
  getPost();
},[]);

/* useEffect(()=>{
  async function getcomments(){
    try {
        const commentsData = await apiHandler(`/posts/comment/${thePost._id}?include_replies=true`, "GET", "", temporaryToken)
        console.log(commentsData);
        setComments(commentsData.comments);
    } catch(error){
      console.error('Error fetching data:', error);
    }
  }
  getcomments();
},[addedcomment]) */


  /* async function handler(url, method, body, token="") {
    try {
      const base_url = 'http://localhost:2000';
      const headers = token !== "" ? {"Content-Type": "application/json","Authorization": `Bearer ${token}`} : {"Content-Type": "application/json"}

  
      // Conditionally include the body only when it's provided and the method is not 'GET'
      const requestOptions = {
        method: `${method}`,
        headers: headers,
        body: method !== ('GET' || 'DELETE') && body ? JSON.stringify(body) : undefined
      };
  
      const response = await fetch(`${base_url}${url}`, requestOptions);
  
      if (!response.ok) {
        throw new Error('API request failed');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw for further handling
    }
  };
  const onComment = async (newComment) => {
    try {
          const response = await apiHandler(`/post/comment/${thePost._id}`, "POST",newComment,temporaryToken);
          console.log('New comment added:', response);
          setAddingComment(false);
          setComments((prev) => [...prev, response.comment]);
    } catch (error) {
        console.error('Error adding comment:', error.message);
    }
} */

const onComment = async (newComment) => {
  try {
      const formData = new FormData();

      formData.append('content', newComment.content);

      if (newComment.attachments) {
        formData.append('attachments', newComment.attachments);
    }

      const response = await fetch(`http://localhost:2000/post/comment/${thePost._id}`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${temporaryToken}`
          },
          body: formData
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('New comment added:', responseData);
      setAddingComment(false);
      setComments((prev) => [...prev, responseData.comment]);
  } catch (error) {
      console.error('Error adding comment:', error.message);
  }
}

async function handleJoin() {
  let response;
  try{
      if(joined){
          response = await apiHandler("/community/unsubscribe", "POST", {communityName: thePost.community}, temporaryToken)
          setJoined(false);
      }else{
          response = await apiHandler("/community/subscribe", "POST", {communityName: thePost.community}, temporaryToken)
          setJoined(true);
      }
      console.log(response);
  } catch(e){
      console.error("Error fetching Data: " ,e)
  }
  //api call to join subreddit
}


  /* useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(http://localhost:3002/community/${UserName});
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
        const response = await fetch(http://localhost:3002/posts/comment/${postIdState});
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
  }, []); */
  if (loading) {
    return <div>Loading...</div>;
  }

  return (!loading &&
    <div>
      <ToolBar page="spreadit"  loggedin={true} />
      <div className={styles.page}>
        <div className={styles.leftbar}>
          <Sidebar />
        </div>
        <div className={styles.mainbar}>
            <div className={styles.postarea}>
            <CommentPost postId={thePost._id} profilePicture={thePost.userProfilePic} cakeDate={"1/1/2024"} subRedditName={thePost.community} subRedditPicture={theSub.image} subRedditDescription={theSub.description} banner={theSub.communityBanner} subRedditRules={theSub.rules} time={parseTime(thePost.date)} title={thePost.title} description={thePost.content[thePost.content.length-1]?thePost.content[thePost.content.length-1]:""} images={[]} video={[]} upVotes={thePost.votesUpCount - thePost.votesDownCount} comments={thePost.commentsCount} userName={thePost.username} isSpoiler={thePost.isSpoiler} isSaved={thePost.isSaved} isNSFW={thePost.isNsfw} pollOptions={thePost.pollOptions} pollIsOpen={thePost.isPollEnabled} pollExpiration={thePost.pollExpiration} sendReplyNotifications={thePost.sendPostReplyNotification} isJoined={joined} onJoin={handleJoin} isMember={subscribe.isSubscribed} Editing={isEditing} />
             {/* <CommentPost profilePicture={profilePicture} cakeDate={"1/1/2024"} /> */}
            </div>
          <div className={styles.inputarea}>
            {addingComment&&(<CommentInput onComment={onComment} close={()=>{setAddingComment(false)}} buttonDisplay={"comment"} isPost={false} /> )}
            {!addingComment&&(<button className={styles.addcommentbutton} onClick={()=>{setAddingComment(true)}}>Add Comment</button>)}
          </div>
          
          {comments.length!==0&&(
            <div>
              {comments.map((comment)=>(
              <div>
                <Comment comment={comment} subRedditName={thePost.community} subRedditPicture={theSub.image} subRedditRules={theSub.rules} showProfilePicture={true} />
              </div>
              ))}
            </div>
          )}
          {comments.length===0&&(<p>Be the first to add a comment</p>)}
        </div>
        <div className={styles.rightbar}>
          <RightCommentsSidebar name={thePost.community} description={theSub.description} rules={theSub.rules} members={"200K"} isJoined={joined}  onJoin={handleJoin} moderators={[]} />
        </div>
      </div>
    </div>
  );
}

export default Home;