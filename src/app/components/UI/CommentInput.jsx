import React, { useState,useEffect, useRef } from "react";
import styles from "./CommentInput.module.css";
import Image from "next/image";
import fontsicon from "../../assets/fonts.svg";
import imageicon from "../../assets/image.svg";

const CommentInput = ({ onComment, close, commentBody,commentImage,buttonDisplay}) => {
    const [commentBodyState, setCommentBody] = useState(commentBody || '');
    const [image, setImage] = useState(commentImage || null);
    const contentEditableRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (contentEditableRef.current) {
            contentEditableRef.current.innerHTML = commentBodyState;
        }
    }, []);

    const handleCommentSubmit = () => {
        const newComment = {
            body: contentEditableRef.current.innerHTML,
            replies: [],
            image: image ? image : null
        }
        console.log(newComment);
        setCommentBody('');
        setImage(null);
        onComment(newComment);
    }

    const handleImageClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file));
    }

    const handleCommentChange=(event)=>{
        setCommentBody(event.target.value);
        if (contentEditableRef.current) {
            contentEditableRef.current.style.height = "auto";
          
          // Adjust the height to add 40px before reaching the end
          contentEditableRef.current.style.height = `${contentEditableRef.current.scrollHeight + 40}px`;
      }
    }


    return (
        <div className={styles.inputcontainer}>
            <div className={styles.commentContent}>
                {image && <img src={image} alt="Uploaded" className={styles.uploadedImage} />}
                <div
                    ref={contentEditableRef}
                    className={styles.commenttextarea}
                    contentEditable="true"
                    placeholder="write your comment here"
                    onKeyDown={handleCommentChange}
                >
                </div>
                
            </div>
            <div className={styles.buttonGroup}>
                <div className={styles.leftbuttons}>
                    <input type="file" ref={inputRef} onChange={handleImageChange} className={styles.uploadbutton} disabled={image !== null} />
                    <Image src={imageicon} alt="image icon" className={`${styles.icons} ${image !== null ? styles.disabled : ''}`} onClick={handleImageClick} />
                    <Image src={fontsicon} alt="fonts icon" className={styles.icons} />
                </div>
                <div className={styles.rightbuttons}>
                    <button className={styles.cancelButton} onClick={close}>Cancel</button>
                    <button className={buttonDisplay === "comment" ? styles.addButton : styles.editButton} onClick={handleCommentSubmit}>
                        {buttonDisplay}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommentInput;
 /*

 import React from "react";

import { useState,useEffect ,useRef } from 'react';
import styles from "./CommentInput.module.css"
import Image from "next/image";
import fontsicon from "../../assets/fonts.svg"
import imageicon from "../../assets/image.svg"

const CommentInput=({onComment,close})=>{
    const [commentBody,setCommentBody]=useState('');
    const textareaRef = useRef(null);
    const inputRef = useRef(null);
    const [image,setImage]=useState("");

    const handleCommentSubmit=()=>{
        const newComment = {
            body: commentBody,
            replies: [],
            media: image ? URL.createObjectURL(image) : null
        }
        setCommentBody('');
        setImage(null);
        onComment(newComment);
    }

    const handleimageclick=()=>{
        inputRef.current.click();
    }

    const handleimagechange=(event)=>{
        const file=event.target.files[0];
        setImage(file);
    }

    const handleCommentChange=(event)=>{
      setCommentBody(event.target.value);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        
        // Adjust the height to add 40px before reaching the end
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 25}px`;
    }
    }
    return(
        <div className={styles.inputcontainer}>
             <div className={styles.commentContent}>
                <textarea
                    ref={textareaRef}
                    value={commentBody}
                    className={styles.commenttextarea}
                    placeholder="write your comment here"
                    onChange={handleCommentChange}
                />
                {image && <img src={URL.createObjectURL(image)} alt="Uploaded" className={styles.uploadedImage} />}
              </div>  
            <div className={styles.buttonGroup}>
                <div className={styles.leftbuttons}>
                    <input type="file" ref={inputRef} onChange={handleimagechange} className={styles.uploadbutton} />
                    <Image src={imageicon} alt="image icon" className={styles.icons} onClick={handleimageclick} />
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

export default CommentInput; */