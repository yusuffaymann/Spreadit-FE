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
import styles from "./Comment.module.css"

const Comment=({comment,subRedditName,subRedditPicture,subRedditRules})=>{
    const [isReplying,setIsReplying]=useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [showReply,setShowReply]=useState(true);
    const [replies,setReplies]=useState(comment.replies);
    const [hidden,setHidden]=useState(comment.is_hidden);
    const [saved,setSaved]=useState(comment.is_saved);
    const [isFollowed,setIsFollowed]=useState(comment.user.followed);

    let isUser=false;
    useEffect(() => {
        async function fetchData() {
          const cookie = await getCookies();
    
          if(cookie.username === comment.user.username){
            isUser=true;
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
            const response = await apiHandler(`/post/comment/${comment._id}`, "DELETE");

            console.log(response);
          } catch (error) {
            console.error('Error deleteing comment :', error);
          }
    }
    
    const onComment= async (newReply)=>{
        try {
            const response = await apiHandler(`/comment/${comment._id}/reply`, "POST",newReply);
            console.log('New reply added:', response);
            setReplies((prev)=>[...prev,newReply])
            setIsReplying(false);

    } catch (error) {
        console.error('Error adding reply:', error.message);
    }
}

    const onEdit= async (newComment)=>{
        try {
            const response = await apiHandler(`/comments/${comment._id}/edit`, "POST",newComment);
            console.log('edit done:', response);
            console.log(newComment);
            comment.body=newComment.body;
            comment.media=newComment.media;
            setIsEditing(false);

    } catch (error) {
        console.error('Error editing', error.message);
    }
    };

    const onHide= async ()=>{
        try {
            const response = await apiHandler(`/comments/${comment._id}/hide`, "POST");
            console.log('Hide toggled:', response);
            setHidden(!hidden);

    } catch (error) {
        console.error('Error hiding or unhiding', error.message);
    }
    };

    const onUpVote= async ()=>{
        try {
            const response = await apiHandler(`/comments/${comment._id}/upvote`, "POST");
            console.log('upvoted:', response);

    } catch (error) {
        console.error('Error upvoting', error.message);
    }
    };

    const onDownVote= async ()=>{
        try {
            const response = await apiHandler(`/comments/${comment._id}/downvote`, "POST");
            console.log('downvoted:', response);

    } catch (error) {
        console.error('Error downvoting', error.message);
    }
    };

    const onSave= async ()=>{
        try {
            const response = await apiHandler(`/comments/${comment._id}/save`, "POST");
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
       
            {!hidden&&(
                    <div className={styles.commentbody}>
                       <PostHeader isProfile={true} isInComment={false} userName={comment.user.username} profilePicture={comment.user.avatar_url} time={comment.created_at} cakeDate={comment.user.cakeDay} isFollowed={isFollowed} onFollow={handleFollow}/>
                       {isEditing&&(<CommentInput onComment={onEdit} close={()=>setIsEditing(false)} commentBody={comment.content} commentImage={comment.media} buttonDisplay={"Save edits"} isPost={false}/>)}
                        {!isEditing&&(
                        <div className={styles.commentcontent}>
                            {comment.media!==""&&(<img src={comment.media} className={styles.commentimage} />)}
                            <span className={styles.commenttext} dangerouslySetInnerHTML={{ __html: formattedDescription }}></span>
                        </div>
                        )}
                        {!isEditing&&(<CommentFooter upvote={onUpVote} downvote={onDownVote} voteCount={comment.likes_count} isSaved={saved} onSave={onSave} onHide={onHide} isUser={isUser} onEdit={()=>setIsEditing(true)} onReply={()=>setIsReplying(true)}  onDelete={onDelete} userName={comment.user.username} subRedditName={subRedditName} subRedditPicture={subRedditPicture} subRedditRules={subRedditRules} onReport={handleReport} onBlock={handleBlock}/>)}
                        {isReplying&&(<CommentInput onComment={onComment} close={()=>setIsReplying(false)} buttonDisplay={"comment"} isPost={false}/>)}  
                        {replies.length !== 0 &&(
                            <div>
                                {showReply&&(
                                    <div>
                                        <Image src={dashicon} alt="dash icon" className={styles.icons} onClick={() => setShowReply(false)} />
                                        {replies.map((comment)=>(
                                            <Comment comment={comment} subRedditName={subRedditName} subRedditPicture={subRedditPicture} subRedditRules={subRedditRules} />
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
        </div>
    );    
}

export default Comment;