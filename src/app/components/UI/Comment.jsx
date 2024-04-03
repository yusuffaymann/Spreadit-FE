import React from "react";
import { useState,useEffect } from 'react';
import Image from "next/image";
import CommentInput from "./CommentInput";
import plusicon from "../../assets/plus-circle.svg";
import dashicon from "../../assets/dash-circle.svg";
import styles from "./Comment.module.css"

const Comment=({comment})=>{
    const [isReplying,setIsReplying]=useState(false);
    const [showReply,setShowReply]=useState(true);
    const [replies,setReplies]=useState(comment.replies);
    const onComment=(newReply)=>{
        setReplies((prev)=>[...prev,newReply])
        setIsReplying(false);
    };
    return( 
       <div className={styles.commentbody}>
                <div>
                    <img className={styles.profilePicture} 
                        alt="Profile Picture"
                        src={comment.profilePicture} 
                    />
                    <span>{comment.userName}</span>
                </div>
                <span>{comment.body}</span>
                {isReplying&&(<CommentInput onComment={onComment}/>)}
                {isReplying ?(<button className={styles.replybutton} onClick={()=>setIsReplying(!isReplying)}>Cancel</button>):(<button className={styles.replybutton} onClick={()=>setIsReplying(!isReplying)}>Reply</button>)}
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
                        {!showReply&&(
                            <Image src={plusicon} alt="plus icon" className={styles.icons} onClick={() => setShowReply(true)} />
                        )
                        }
                    </div>
                )}
                
        </div>
        );    
}

export default Comment;