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

const Comment=({comment})=>{
    const [isReplying,setIsReplying]=useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [showReply,setShowReply]=useState(true);
    const [replies,setReplies]=useState(comment.replies);
    const [hidden,setHidden]=useState(comment.hidden);
    const [saved,setSaved]=useState(comment.saved);
    const followed=comment.userObject.followed;
    
    const onDelete=async()=>{
        try {
            const response = await apiHandler(`/post/comment/${comment.id}`, "DELETE");

            console.log(response);
          } catch (error) {
            console.error('Error deleteing comment :', error);
          }
    }
    
    const onComment= async (newReply)=>{
        try {
            const response = await apiHandler(`/comment/${comment.id}/reply`, "POST",newReply);
            console.log('New reply added:', response);
            setReplies((prev)=>[...prev,newReply])
            setIsReplying(false);

    } catch (error) {
        console.error('Error adding reply:', error.message);
    }
}

    const onEdit= async (newComment)=>{
        try {
            const response = await apiHandler(`/comments/${comment.id}/edit`, "POST",newComment);
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
            const response = await apiHandler(`/comments/${comment.id}/hide`, "POST");
            console.log('Hide toggled:', response);
            setHidden(!hidden);

    } catch (error) {
        console.error('Error hiding or unhiding', error.message);
    }
    };

    const onUpVote= async ()=>{
        try {
            const response = await apiHandler(`/comments/${comment.id}/upvote`, "POST");
            console.log('upvoted:', response);

    } catch (error) {
        console.error('Error upvoting', error.message);
    }
    };

    const onDownVote= async ()=>{
        try {
            const response = await apiHandler(`/comments/${comment.id}/downvote`, "POST");
            console.log('downvoted:', response);

    } catch (error) {
        console.error('Error downvoting', error.message);
    }
    };

    const onSave= async ()=>{
        try {
            const response = await apiHandler(`/comments/${comment.id}/save`, "POST");
            console.log('save toggled:', response);
            setSaved(!saved);

    } catch (error) {
        console.error('Error saving or unsaving', error.message);
    }
    };

    const onReport =()=>{

    };

    return( 
       <div className={styles.commentcontainer}>
       
            {!hidden&&(
                    <div className={styles.commentbody}>
                       <PostHeader isProfile={true} subRedditName={comment.userObject.userName} subRedditPicture={comment.userObject.profilePicture} time={"1 mon"} banner={""} subRedditDescription={""} cakeDate={"1/1/2012"} isFollowed={followed} onFollow={()=>{console.log("api function")}}/>
                       {isEditing&&(<CommentInput onComment={onEdit} close={()=>setIsEditing(false)} commentBody={comment.body} commentImage={comment.media} buttonDisplay={"Save edits"}/>)}
                        {!isEditing&&(
                        <div className={styles.commentcontent}>
                            {comment.media!==""&&(<img src={comment.media} className={styles.commentimage} />)}
                            <span>{comment.body}</span>
                        </div>
                        )}
                        {!isEditing&&(<CommentFooter upvote={onUpVote} downvote={onDownVote} voteCount={comment.noofvotes} isSaved={saved} onSave={onSave} onHide={onHide} isUser={false} onEdit={()=>setIsEditing(true)} onReply={()=>setIsReplying(true)}  onDelete={onDelete} onReport={onReport} subRedditName={comment.userObject.userName} subRedditPicture={comment.userObject.profilePicture}/>)}
                        {isReplying&&(<CommentInput onComment={onComment} close={()=>setIsReplying(false)} buttonDisplay={"comment"}/>)}  
                        {replies.length !== 0 &&(
                            <div>
                                {showReply&&(
                                    <div>
                                        <Image src={dashicon} alt="dash icon" className={styles.icons} onClick={() => setShowReply(false)} />
                                        {replies.map((comment)=>(
                                            <Comment comment={comment} />
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

/*import React, { useState } from "react";
import Image from "next/image";
import CommentInput from "./CommentInput";
import plusicon from "../../assets/plus-circle.svg";
import dashicon from "../../assets/dash-circle.svg";
import styles from "./Comment.module.css";

const Comment = ({ comment }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showReply, setShowReply] = useState(true);
    const [replies, setReplies] = useState(comment.replies);
    const [hidden, setHidden] = useState(comment.hidden);

    const onComment = (newReply) => {
        setReplies((prev) => [...prev, newReply]);
        setIsReplying(false);
    };

    return (
        <div className={styles.commentcontainer}>
            {!hidden && (
                <div className={styles.commentbody}>
                    <div>
                        <img
                            className={styles.profilePicture}
                            alt="Profile Picture"
                            src={comment.userObject.profilePicture}
                        />
                        <span>{comment.userObject.userName}</span>
                    </div>
                    <div className={styles.commentcontent}>
                        {comment.media !== "" && (
                            <img src={comment.media} className={styles.commentimage} />
                        )}
                        <span>{comment.body}</span>
                    </div>
                    {isReplying && (
                        <CommentInput
                            onComment={onComment}
                            close={() => setIsReplying(false)}
                        />
                    )}
                    {!isReplying && (
                        <button
                            className={styles.replybutton}
                            onClick={() => setIsReplying(true)}
                        >
                            Reply
                        </button>
                    )}
                    {!isEditing && (
                        <button
                            className={styles.replybutton}
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                    )}
                    {isEditing && (
                        <CommentInput
                            onComment={onComment}
                            close={() => setIsEditing(false)}
                            commentBody={comment.body}
                            commentImage={comment.media}
                        />
                    )}
                    {replies.length !== 0 && (
                        <div>
                            {showReply && (
                                <div>
                                    <Image
                                        src={dashicon}
                                        alt="dash icon"
                                        className={styles.icons}
                                        onClick={() => setShowReply(false)}
                                    />
                                    {replies.map((comment) => (
                                        <Comment comment={comment} />
                                    ))}
                                </div>
                            )}
                            {!showReply && (
                                <Image
                                    src={plusicon}
                                    alt="plus icon"
                                    className={styles.icons}
                                    onClick={() => setShowReply(true)}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
            {hidden && (
                <div className={styles.hiddencomment}>
                    <p>This comment is hidden</p>
                    <button
                        className={styles.undobutton}
                        onClick={() => {
                            setHidden(false);
                        }}
                    >
                        undo
                    </button>
                </div>
            )}
        </div>
    );
};

export default Comment;
 */