import React from "react";
import { useState,useEffect } from 'react';
import Image from "next/image";
import CommentInput from "./CommentInput";
import plusicon from "../../assets/plus-circle.svg";
import dashicon from "../../assets/dash-circle.svg";
import PP1 from "../../assets/PP1.png"
import CommentFooter from "./CommentFooter";
import PostHeader from "../post/PostHeader";
import apiHandler from "../../utils/apiHandler"
import styles from "./Comment.module.css";
import getCookies from "../../utils/getCookies";
import { redirect } from 'next/navigation';

const Comment=({postId, comment,subRedditName,subRedditPicture,subRedditRules,showProfilePicture})=>{
    const temporaryToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEzMDI5MjM1fQ.ih5SD2C1dSo96CRDbUGX3E5z9mGvCh37zAGh53Y8z-M";
    const [isReplying,setIsReplying]=useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [showReply,setShowReply]=useState(true);
    const [replies,setReplies]=useState(comment.replies);
    const [hidden,setHidden]=useState(comment.is_hidden);
    const [saved,setSaved]=useState(comment.is_saved);
    const [isFollowed,setIsFollowed]=useState(false);
    const [isUser,setIsUser]=useState(false);
    const [isDeleted,setIsDeleted]=useState(false);

    useEffect(() => {
        async function fetchData() {
          const cookie = await getCookies();
          if(cookie&&cookie.username){
            if(cookie.username === comment.user.username){
                setIsUser(true);
            }
          }
            
        }
        fetchData();
      }, []);

    
    const handleFollow=async()=> {
        setIsFollowed(!isFollowed);
        try {
            const response = await apiHandler(`/users/follow`, "POST",comment.user.username);
            console.log(response);
          } catch (error) {
            console.error('Error toggling follow :', error);
          }
    }
    
    const onDelete=async()=>{
        try {
            const response = await apiHandler(`/posts/comment/delete/${comment.id}`, "DELETE", "", temporaryToken);
            console.log(response);
            setIsDeleted(true);
          } catch (error) {
            console.error('Error deleteing comment :', error);
          }
    }
    
  /*   const onComment= async (newReply)=>{
        try {
            const response = await apiHandler(`/comment/${comment.id}/reply`, "POST",newReply,temporaryToken);
            console.log('New reply added:', response);
            setIsReplying(false);
            setReplies((prev)=>[...prev,response.reply]);

    } catch (error) {
        console.error('Error adding reply:', error.message);
    }
} */

const onComment = async (newReply) => {
    try {
        const formData = new FormData();
  
        formData.append('content', newReply.content);
  
        if (newReply.attachments) {
          formData.append('attachments', newReply.attachments);
      }
  
        const response = await fetch(`http://localhost:2000/comment/${comment.id}/reply`, {
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
        console.log('New reply added:', responseData);
        setIsReplying(false);
        setReplies((prev)=>[...prev,responseData.reply]);
    } catch (error) {
        console.error('Error adding reply:', error.message);
    }
  }
    const onEdit= async (newComment)=>{
        try {
            const response = await apiHandler(`/comments/${comment.id}/edit`, "POST",newComment, temporaryToken);
            console.log('edit done:', response);
            comment.content=newComment.content;
            const newcommentmedia={
                link:newComment.attachments
            }
            /* console.log()
            comment.media=[newcommentmedia];
            console.log(comment.media); */
            setIsEditing(false);

    } catch (error) {
        console.error('Error editing', error.message);
    }
    /* try {
        const formData = new FormData();
  
        formData.append('content', newComment.content);
  
        if (newComment.attachments) {
          formData.append('attachments', newComment.attachments);
      }
  
        const response = await fetch(`http://localhost:2000/comments/${comment.id}/edit`, {
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
        console.log('edit done:', response);
        comment.content=newComment.content;
        comment.media=newComment.attachments;
        setIsEditing(false);
        setReplies((prev)=>[...prev,responseData.reply]);
    } catch (error) {
        console.error('Error adding reply:', error.message);
    } */
    };

    const onHide= async ()=>{
        try {
            const response = await apiHandler(`/comments/${comment.id}/hide`, "POST", "",temporaryToken);
            console.log('Hide toggled:', response);
            setHidden(!hidden);

    } catch (error) {
        console.error('Error hiding or unhiding', error.message);
    }
    };

    const onUpVote= async ()=>{
        try {
            const response = await apiHandler(`/comments/${comment.id}/upvote`, "POST", "", temporaryToken);
            console.log('upvoted:', response);

    } catch (error) {
        console.error('Error upvoting', error.message);
    }
    };

    const onDownVote= async ()=>{
        try {
            const response = await apiHandler(`/comments/${comment.id}/downvote`, "POST", "", temporaryToken);
            console.log('downvoted:', response);

    } catch (error) {
        console.error('Error downvoting', error.message);
    }
    };

    const onSave= async ()=>{
        try {
            const response = await apiHandler(`/comments/${comment.id}/save`, "POST", "", temporaryToken);
            console.log('save toggled:', response);
            setSaved(!saved);

    } catch (error) {
        console.error('Error saving or unsaving', error.message);
    }
    };

    const parseAndStyleLinks = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const formattedText = text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
        
        return formattedText;
    }

    const onClickEdit=()=>{
        if(showProfilePicture){
            setIsEditing(true);
        } else{
            redirect(`/comments/${postId}`);
        }
        
    }

    function handleReport(mainReason,subReason) {
        console.log(mainReason);
        console.log(subReason);
        //api call to report a post
    }

    function handleBlock() {
        console.log("block");
        //api call to block a user
    }

    const formattedDescription = parseAndStyleLinks(comment.content);

    return( 
       <div className={styles.commentcontainer}>
       
            {!hidden&&!isDeleted&&(
                    <div className={styles.commentbody}>
                       <PostHeader isUser={isUser} isProfile={true} isInComment={false} showProfilePicture={showProfilePicture} userName={comment.user.username} profilePicture={comment.user.avatar_url} time={comment.created_at} cakeDate={comment.user.cakeDay} isFollowed={isFollowed} onFollow={handleFollow}/>
                       {isEditing&&(<CommentInput onComment={onEdit} close={()=>setIsEditing(false)} commentBody={comment.content} commentImage={comment.media[0].link} buttonDisplay={"Save edits"} isPost={false}/>)}
                        {!isEditing&&(
                        <div className={styles.commentcontent}>
                            {comment.media.length!==0&&(<img src={comment.media[0].link} className={styles.commentimage} />)}
                            <span className={styles.commenttext} dangerouslySetInnerHTML={{ __html: formattedDescription }}></span>
                        </div>
                        )}
                        {!isEditing&&(<CommentFooter upvote={onUpVote} downvote={onDownVote} voteCount={comment.likes_count} isSaved={saved} onSave={onSave} onHide={onHide} isUser={isUser} onEdit={onClickEdit} onReply={()=>setIsReplying(true)}  onDelete={onDelete} userName={comment.user.username} subRedditName={subRedditName} subRedditPicture={subRedditPicture} subRedditRules={subRedditRules} onReport={handleReport} onBlock={handleBlock}/>)}
                        {isReplying&&(<CommentInput onComment={onComment} close={()=>setIsReplying(false)} buttonDisplay={"comment"} isPost={false}/>)}  
                        {showProfilePicture&&replies.length !== 0 &&(
                            <div>
                                {showReply&&(
                                    <div>
                                        <Image src={dashicon} alt="dash icon" className={styles.icons} onClick={() => setShowReply(false)} />
                                        {replies.map((comment)=>(
                                            <Comment comment={comment} subRedditName={subRedditName} showProfilePicture={showProfilePicture} subRedditPicture={subRedditPicture} subRedditRules={subRedditRules} />
                                        ))}
                                    </div>
                                )
                                }
                                {!showReply&&(<Image src={plusicon} alt="plus icon" className={styles.icons} onClick={() => setShowReply(true)} />)}
                    </div>
                        )}
            </div>
        )}
        {hidden&&(
            <div className={styles.hiddencomment}>
                <p>This comment is hidden</p>
                <button className={styles.undobutton} onClick={onHide}>undo</button>
            </div>
        )} 
        {isDeleted&&(
            <div className={styles.hiddencomment}>
                <p>This comment is deleted</p>
            </div>
        )}        
        </div>
    );    
}

export default Comment;