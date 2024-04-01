import React from "react";
import Image from "next/image";
import styles from "./PostFooter.module.css"
import upvote from "@/app/assets/post-images/upvote-arrow.svg";
import downvote from "@/app/assets/post-images/downvote-arrow.svg";
import upvoteFilled from "@/app/assets/post-images/upvote-filled.svg";
import downvoteFilled from "@/app/assets/post-images/downvote-filled.svg";
import upvoteOutlined from "@/app/assets/post-images/upvote-outline.svg";
import downvoteOutlined from "@/app/assets/post-images/downvote-outline.svg";
import upvoteHover from "@/app/assets/post-images/upvote-hover.svg";
import downvoteHover from "@/app/assets/post-images/downvote-hover.svg";
import commentIcon from "@/app/assets/post-images/comments.svg";
import shareIcon from "@/app/assets/post-images/share.svg";
import shieldIcon from "@/app/assets/post-images/shield.svg";
import PostDropDownItem from "./PostDropDownItem";

function PostFooter() {
    const [buttonState, setButtonState] = React.useState({type: "neutral", upvoteIcon: upvote, downvoteIcon: downvote, upHover: "", downHover: ""}); // state of "neutral" for neutral, upvoted for upvote, downvoted for downvote
    const [showDropdown, setShowDropdown] = React.useState(false);

    function toggleDropdown() {
        setShowDropdown(prevShowDropdown => !prevShowDropdown);
    }

    return (
        <div className={styles.post_footer}>
            <div className={styles.post_interactions}>
                <div className={styles.upvotes_container}>
                    <button 
                    className={`${styles.circle} ${styles.upvotes_button} ${buttonState.type}${buttonState.upHover} }`} 
                    onClick={() => {
                        setButtonState(prevButtonState => {
                            if ( prevButtonState.type === "upvoted" ) {
                                return {...prevButtonState, type: "neutral", upvoteIcon: upvote, downvoteIcon: downvote};
                            } else{
                                return {...prevButtonState, type: "upvoted", upvoteIcon: upvoteFilled, downvoteIcon: downvoteOutlined};
                            }
                        });
                    }}
                    onMouseEnter={() => {
                        setButtonState(prevButtonState => {
                            return {...prevButtonState, upvoteIcon: (prevButtonState.type === "neutral" ? upvoteHover : (prevButtonState.type === "upvoted" ? upvoteFilled : upvoteOutlined)), upHover: "-hover", downHover: ""};
                        });
                    }}
                    onMouseLeave={() => {
                        setButtonState(prevButtonState => {
                            return {...prevButtonState, upvoteIcon: (prevButtonState.type === "neutral" ? upvote : (prevButtonState.type === "upvoted" ? upvoteFilled : upvoteOutlined)) ,upHover: "", downHover: ""};
                        })
                    }}>
                        <Image width={16} height={16} src={buttonState.upvoteIcon} alt="Upvote arrow" />
                    </button>
                    <span className={`${styles.count} ${buttonState.type}`}>1</span>
                    <button
                    className={`${styles.circle} ${styles.downvotes_button} ${buttonState.type}${buttonState.downHover}`}
                    onClick={() => {
                        setButtonState(prevButtonState => {
                            if ( prevButtonState.type === "downvoted" ) {
                                return {...prevButtonState, type: "neutral", upvoteIcon: upvote, downvoteIcon: downvote};
                            } else{
                                return {...prevButtonState, type: "downvoted", upvoteIcon: upvoteOutlined, downvoteIcon: downvoteFilled};
                            }
                        });
                    }}
                    onMouseEnter={() => {
                        setButtonState(prevButtonState => {
                            return {...prevButtonState, downvoteIcon: (prevButtonState.type === "neutral" ? downvoteHover : (prevButtonState.type === "downvoted" ? downvoteFilled : downvoteOutlined)), downHover: "-hover", upHover: ""};
                        });
                    }}
                    onMouseLeave={() => {
                        setButtonState(prevButtonState => {
                            return {...prevButtonState, downvoteIcon: (prevButtonState.type === "neutral" ? downvote : (prevButtonState.type === "downvoted" ? downvoteFilled : downvoteOutlined)) ,downHover: "", upHover: ""};
                        })
                    }}>
                        <Image width={16} height={16} src={buttonState.downvoteIcon} alt="Downvote arrow"/>
                    </button>
                </div>
           

                <button className={styles.btn}>
                        <Image width={16} height={16} src={commentIcon} alt="Comments Icon"/>
                        <span>{12}</span>
                </button>

                <button className={styles.btn}>
                        <Image width={16} height={16} src={shareIcon} alt="Comments Icon"/>
                        <span>Share</span>
                </button>
           </div>
           <button className={styles.mod_interactions} onClick={toggleDropdown}>
            <Image width={22} height={22} src={shieldIcon} alt="mod shield Icon"/>
           </button>

           <div className={`${styles.dropdown_menu} ${showDropdown ? styles.active : styles.inactive}`}>
                <ul className={styles.no_style}>
                    <PostDropDownItem icon={upvote} iconAlt="Upvote Icon" description="Upvote" />
                    <PostDropDownItem icon={downvote} iconAlt="Downvote Icon" description="Downvote" />
                    <PostDropDownItem icon={commentIcon} iconAlt="Comment Icon" description="Comment" />
                    <PostDropDownItem icon={shareIcon} iconAlt="Share Icon" description="Share" />
                </ul>
           </div>
        </div>
    );
}

export default PostFooter;