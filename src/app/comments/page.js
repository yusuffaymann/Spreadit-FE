'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState,useEffect } from 'react';
import ToolBar from "../components/UI/Toolbar"
import Comment from "../components/UI/Comment";
import CommentInput from "../components/UI/CommentInput";
import RightCommentsSidebar from "../components/UI/RightCommentsSidebar";

const Home=()=> {
  const UserName="Teachers";
  const [userData, setUserData] = useState(null);
  const [addingComment,setAddingComment]=useState(false);
  const [comments,setComments]=useState(null);

  const onComment=(newComment)=>{
    setComments((prev)=>[...prev,newComment]);
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
        const response = await fetch(`http://localhost:3002/comments`);
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
  return (
    <div>
      <ToolBar page="spreadit"  loggedin={true} />
      <div className={styles.page}>
        <div className={styles.leftbar}>

        </div>
        <div className={styles.mainbar}>
          {addingComment&&(<CommentInput onComment={onComment}/>)}
          {!addingComment&&(<button className={styles.addcommentbutton} onClick={()=>{setAddingComment(true)}}>Add Comment</button>)}
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
