'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState,useEffect } from 'react';
import ToolBar from "../components/UI/Toolbar";
import Sidebar from "../components/UI/Sidebar";
import Comment from "../components/UI/Comment";
import apiHandler from "../utils/apiHandler";
import PostHeader from "../components/post/PostHeader";
import CommentInput from "../components/UI/CommentInput";
import RightCommentsSidebar from "../components/UI/RightCommentsSidebar";

const Home=()=> {
  const UserName="Teachers";
  const [userData, setUserData] = useState(null);
  const [addingComment,setAddingComment]=useState(false);
  const [comments,setComments]=useState(null);
  const [isEditing,setIsEditing]=useState(true);
  const postId="12b5";

  const onComment = async (newComment) => {
    try {
          const response = await apiHandler(`/post/comment/${postId}`, "POST",newComment);
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
        const response = await fetch(`http://localhost:3002/posts/comment/${postId}`);
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
          {isEditing&&(
            <div className={styles.editingarea}>
              <PostHeader subRedditName={subRedditName} subRedditPicture={subRedditPicture} time={"1month"} banner={banner} subRedditDescription={subRedditDescription} isProfile={false}  myPost={true} />
              <CommentInput onComment={onEdit} close={()=>setIsEditing(false)} commentBody={comment.body} commentImage={comment.media} buttonDisplay={"Save edits"}/>
            </div>
          )}
          <div className={styles.inputarea}>
            {addingComment&&(<CommentInput onComment={onComment} close={()=>{setAddingComment(false)}} buttonDisplay={"comment"}/>)}
            {!addingComment&&(<button className={styles.addcommentbutton} onClick={()=>{setAddingComment(true)}}>Add Comment</button>)}
          </div>
          
          {comments.length!==0&&(
            <div>
              {comments.map((comment)=>(
              <div>
                <Comment comment={comment} />
              </div>
              ))}
            </div>
          )}
          {comments.length===0&&(<p>Be the first to add a comment</p>)}
        </div>
        <div className={styles.rightbar}>
          <RightCommentsSidebar name={communityName} description={communityDescription} rules={communityRules} members={numberofmembers} isJoined={isJoined} moderators={moderators} />
        </div>
      </div>
    </div>
  );
}

export default Home;
