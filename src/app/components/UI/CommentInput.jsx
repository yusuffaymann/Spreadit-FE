import React from "react";
import { useState,useEffect } from 'react';
import styles from "./CommentInput.module.css"

const CommentInput=({onComment})=>{
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
                <button className={styles.addButton} onClick={handleCommentSubmit}>Comment</button>
                <button className={styles.embeddedButton}>Button 1</button>
                <button className={styles.embeddedButton}>Button 2</button>
                <button className={styles.embeddedButton}>Button 3</button>
            </div>
        </div>
    );
}

export default CommentInput;

/*<input value={commentBody} className={styles.commentinput} placeholder="write your comment here" onChange={handlecommentchange} />
            <button className={styles.addcommentbutton} onClick={handleclick}>comment</button>*/