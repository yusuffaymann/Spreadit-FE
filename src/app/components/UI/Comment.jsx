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
import handler from "../../utils/apiHandler";

const Comment=({postId, comment,subRedditName,subRedditPicture,subRedditRules,showProfilePicture})=>{
    const [temporaryToken, setToken] = useState(null);
    const [isReplying,setIsReplying]=useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [showReply,setShowReply]=useState(true);
    const [replies,setReplies]=useState(comment.replies);
    const [hidden,setHidden]=useState(comment.is_hidden);
    const [saved,setSaved]=useState(comment.is_saved);
    const [upVoteStatus,setupVoteStatus]=useState("");
    
    const [isUser,setIsUser]=useState(false);
    const [isDeleted,setIsDeleted]=useState(false);

    useEffect(() => {
        async function cookiesfn() {
          const cookies = await getCookies();
          if(cookies&&cookies.username&&cookies.access_token){
                setToken(cookies.access_token);
                if(cookies.username === comment.user.username){
                    setIsUser(true);
                }
          }else{
            router.push("/login")
          }
          if(comment.is_upvoted){
            setupVoteStatus("upvoted")
          }else if(comment.is_downvoted){
            setupVoteStatus("downvoted");
          }else{
            setupVoteStatus("neutral");
          }
            
        }
        cookiesfn();
      }, []);

    
    const onDelete=async()=>{
        try {
            const response = await apiHandler(`/posts/comment/delete/${comment.id}`, "DELETE", "", temporaryToken);
            console.log(response);
            setIsDeleted(true);
          } catch (error) {
            console.error('Error deleteing comment :', error);
          }
    }

const onComment = async (newReply) => {
    try {
        const formData = new FormData();
  
        formData.append('content', newReply.content);
  
        if (newReply.attachments) {
          formData.append('attachments', newReply.attachments);
        }
        formData.append('fileType',"image");
        console.log(formData);
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
            setIsEditing(false);

    } catch (error) {
        console.error('Error editing', error.message);
    }
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

    async function handleReport(mainReason,subReason) {
        let response;
        try{
            response = await apiHandler(`/comments/${comment.id}/report`, "POST", {reason: mainReason, sureason: subReason}, temporaryToken);
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to report a post
    }

    async function handleBlock() {
        let response;
        try{
        response = await apiHandler(`/users/block`, "POST",{username:comment.user.username}, temporaryToken)
        console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to block a user
    }
    const formattedDescription = parseAndStyleLinks(comment.content);

    return( 
       <div className={styles.commentcontainer}>
       
            {!hidden&&!isDeleted&&(
                    <div className={styles.commentbody}>
                       <PostHeader isUser={isUser} isProfile={true} isInComment={false} showProfilePicture={showProfilePicture} userName={comment.user.username} profilePicture={comment.user.avatar_url} time={comment.created_at} cakeDate={comment.user.created_at}/>
                       {isEditing&&(<CommentInput onComment={onEdit} close={()=>setIsEditing(false)} commentBody={comment.content} commentImage={comment.media.length!==0?comment.media[0].link:[]} buttonDisplay={"Save edits"} isPost={false}/>)}
                        {!isEditing&&(
                        <div className={styles.commentcontent}>
                            {comment.media.length!==0&&(<img src={comment.media[0].link} className={styles.commentimage} />)}
                            <span className={styles.commenttext} dangerouslySetInnerHTML={{ __html: formattedDescription }}></span>
                        </div>
                        )}
                        {!isEditing&&(<CommentFooter upvote={onUpVote} downvote={onDownVote} voteCount={comment.likes_count} voteStatus={upVoteStatus} isSaved={saved} onSave={onSave} onHide={onHide} isUser={isUser} onEdit={onClickEdit} onReply={()=>setIsReplying(true)}  onDelete={onDelete} userName={comment.user.username} subRedditName={subRedditName} subRedditPicture={subRedditPicture} subRedditRules={subRedditRules} onReport={handleReport} onBlock={handleBlock}/>)}
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