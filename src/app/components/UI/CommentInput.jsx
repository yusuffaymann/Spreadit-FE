import React, { useState,useEffect, useRef } from "react";
import styles from "./CommentInput.module.css";
import Image from "next/image";
import fontsicon from "../../assets/fonts.svg";
import imageicon from "../../assets/image.svg";

const CommentInput = ({ onComment, close, commentBody,commentImage,buttonDisplay,isPost}) => {
    const [showModal, setShowModal] = useState(false);
    const [commentBodyState, setCommentBody] = useState(commentBody || '');
    const [imageURL,setImageURL]=useState(commentImage || null)
    const [image, setImage] = useState(null);
    const contentEditableRef = useRef(null);
    const inputRef = useRef(null);

    /* useEffect(() => {
        if (contentEditableRef.current) {
            contentEditableRef.current.innerHTML = commentBodyState;
        }
    }, []); */

    const resizeContentEditable = (element) => {
        element.style.height = "auto";
        element.style.height = `${element.scrollHeight + 40}px`;
    }

    const parseAndStyleLinks = (text) => {
        // Regular expression to find URLs in text
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        
        // Replace URLs with anchor tags
        const formattedText = text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
        
        return formattedText;
    }

    useEffect(() => {
        // Resize the contentEditable div when the component mounts
        if (contentEditableRef.current) {
            resizeContentEditable(contentEditableRef.current);
            const formattedBody = parseAndStyleLinks(commentBodyState);
            contentEditableRef.current.innerHTML = formattedBody;
            attachClickEventToLinks(contentEditableRef.current);
        }
    }, []);

    const handleCancel=()=>{
        if(contentEditableRef.current.innerHTML==""&&imageURL==null){
            close();
        }
        else{
            setShowModal(true);
        } 
    }

    const handleCancel2=()=>{
        setShowModal(false);
    }

    const handleDiscard=()=>{
        close();
    }

    const handleCommentSubmit = () => {
        if(contentEditableRef.current.innerHTML || imageURL){
            const newComment = {
                body: contentEditableRef.current.innerHTML,
                replies: [],
                media: image ? image : null
            }
            setCommentBody('');
            setImage(null);
            setImageURL(null);
            onComment(newComment);
        }
        
    }

    const handleImageClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setImageURL(URL.createObjectURL(file));
    }

    const handleCommentChange=(event)=>{
        /* // Parse and style links within the contentEditable div
    const formattedText = parseAndStyleLinks(contentEditableRef.current.innerHTML);
    
    // Update the state with the formatted text
    setCommentBody(formattedText);

    // Resize the contentEditable div
    resizeContentEditable(contentEditableRef.current);

    // Attach click event to links
    attachClickEventToLinks(contentEditableRef.current); */
        /* const newText = event.target.value;
        const styledText = parseAndStyleLinks(newText);
        setCommentBody(styledText);

        if (contentEditableRef.current) {
            contentEditableRef.current.innerHTML = styledText;
            resizeContentEditable(contentEditableRef.current);
            attachClickEventToLinks(contentEditableRef.current);
        } */
        setCommentBody(event.target.value);
        if (contentEditableRef.current) {
            resizeContentEditable(contentEditableRef.current);
            const formattedBody = parseAndStyleLinks(event.target.value);
            contentEditableRef.current.innerHTML = formattedBody;
            attachClickEventToLinks(contentEditableRef.current);
      } 
    }

    const attachClickEventToLinks = (element) => {
        const links = element.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", handleLinkClick);
        });
    }

    const handleLinkClick = (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        const url = event.target.getAttribute("href");
        window.open(url, "_blank"); // Open link in a new tab
    }


    return (
        <div>
        <div className={styles.inputcontainer}>
            <div className={styles.commentContent}>
                {imageURL && <img src={imageURL} alt="Uploaded" className={styles.uploadedImage} />}
                <div
                    ref={contentEditableRef}
                    className={styles.commenttextarea}
                    contentEditable="true"
                    placeholder="write your comment here"
                    onKeyDown={handleCommentChange}
                    /* dangerouslySetInnerHTML={{ __html: commentBodyState }} */
                >
                </div>
                
            </div>
            <div className={styles.buttonGroup}>
                <div className={styles.leftbuttons}>
                    {!isPost&&(<div>
                    <input type="file" ref={inputRef} onChange={handleImageChange} className={styles.uploadbutton} disabled={imageURL !== null} />
                    <Image src={imageicon} alt="image icon" className={`${styles.icons} ${imageURL !== null ? styles.disabled : ''}`} onClick={handleImageClick} />
                    </div>)}
                    <Image src={fontsicon} alt="fonts icon" className={styles.icons} />
                </div>
                <div className={styles.rightbuttons}>
                    <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
                    <button className={buttonDisplay === "comment" ? styles.addButton : styles.editButton} onClick={handleCommentSubmit}>
                        {buttonDisplay}
                    </button>
                </div>
            </div>
        </div>
        {showModal&&(
            <div className={styles.modaloverlay}>
                <div className={styles.modal}>
                    <button className={styles.Xbutton} onClick={handleCancel2}>X</button>
                    <h2>Discard comment?</h2>
                    <p>You have a comment in progress, are you sure you want to discard it?</p>
                    <div className={styles.modalbuttons}>
                        <button className={styles.cancelButton2} onClick={handleCancel2}>Cancel</button>
                        <button className={styles.discardButton} onClick={handleDiscard}>Discard</button>
                    </div>
                </div>
            </div>
        )}
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