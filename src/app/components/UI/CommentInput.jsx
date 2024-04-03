import React from "react";
import { useState,useEffect } from 'react';
import styles from "./CommentInput.module.css"
import Image from "next/image";
import fontsicon from "../../assets/fonts.svg"
import imageicon from "../../assets/image.svg"

const CommentInput=({onComment,close})=>{
    const [commentBody,setCommentBody]=useState('');

    const handleCommentSubmit=()=>{
        const newComment={
            body:commentBody,
            replies:[],
        }
        setCommentBody('');
        onComment(newComment);
    }

    const handleCommentChange=(event)=>{
      setCommentBody(event.target.value);
    }
    return(
        <div className={styles.inputcontainer}>
            <textarea 
                value={commentBody} 
                className={styles.commenttextarea} 
                placeholder="write your comment here" 
                onChange={handleCommentChange} 
            />
            <div className={styles.buttonGroup}>
                <div className={styles.leftbuttons}>
                    <Image src={imageicon} alt="image icon" className={styles.icons} />
                    <Image src={fontsicon} alt="fonts icon" className={styles.icons} />
                </div>
                <div className={styles.rightbuttons}>
                    <button className={styles.cancelButton} onClick={close}>Cancel</button>
                    <button className={styles.addButton} onClick={handleCommentSubmit}>Comment</button>  
                </div> 
            </div>
        </div>
    );
}
export default CommentInput;

/*<input value={commentBody} className={styles.commentinput} placeholder="write your comment here" onChange={handlecommentchange} />
            <button className={styles.addcommentbutton} onClick={handleclick}>comment</button>*/