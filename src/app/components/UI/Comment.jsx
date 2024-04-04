import React from "react";
import { useState,useEffect } from 'react';
import Image from "next/image";
import CommentInput from "./CommentInput";
import plusicon from "../../assets/plus-circle.svg";
import dashicon from "../../assets/dash-circle.svg";
import PostHeader from "../post/PostHeader";
import styles from "./Comment.module.css"

const Comment=({comment})=>{
    const [isReplying,setIsReplying]=useState(false);
    const [showReply,setShowReply]=useState(true);
    const [replies,setReplies]=useState(comment.replies);
    const [hidden,setHidden]=useState(comment.hidden);
    const [followed,setFollowed]=useState(comment.userObject.followed);
    const onComment=(newReply)=>{
        setReplies((prev)=>[...prev,newReply])
        setIsReplying(false);
    };
    return( 
       <div className={styles.commentcontainer}>
            {!hidden&&(
                    <div className={styles.commentbody}>
                        <PostHeader isprofile={true} subRedditName={comment.userObject.userName} subRedditPicture={comment.userObject.profilePicture} time={"1 mon"} banner={""} subRedditDescription={""} cakeDate={"1/1/2012"} isfollowed={followed} onFollow={()=>{setFollowed(!followed)}}/>
                        {/* <div>
                            <img className={styles.profilePicture} 
                                alt="Profile Picture"
                                src={comment.userObject.profilePicture} 
                            />
                            <span>{comment.userObject.userName}</span>
                        </div> */}
                        <span>{comment.body}</span>
                        {isReplying&&(<CommentInput onComment={onComment} close={()=>setIsReplying(!isReplying)}/>)}
                        {!isReplying &&(<button className={styles.replybutton} onClick={()=>setIsReplying(!isReplying)}>Reply</button>)}  
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
                <button className={styles.undobutton} onClick={()=>{setHidden(false)}}>undo</button>
            </div>
        )}        
        </div>
    );    
}

export default Comment;