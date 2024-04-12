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

    const resizeContentEditable = (element) => {
        element.style.height = "auto";
        element.style.height = `${element.scrollHeight + 40}px`;
    }

    const parseAndStyleLinks = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
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
        event.preventDefault(); 
        const url = event.target.getAttribute("href");
        window.open(url, "_blank"); 
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
                    onInput={handleCommentChange}
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