import React from "react";
import Image from "next/image";
import styles from "./PostFooter.module.css"

import upvoteIcon from "@/app/assets/post-images/upvote-arrow.svg";
import downvoteIcon from "@/app/assets/post-images/downvote-arrow.svg";
import upvoteFilled from "@/app/assets/post-images/upvote-filled.svg";
import downvoteFilled from "@/app/assets/post-images/downvote-filled.svg";
import upvoteOutlined from "@/app/assets/post-images/upvote-outline.svg";
import downvoteOutlined from "@/app/assets/post-images/downvote-outline.svg";
import upvoteHover from "@/app/assets/post-images/upvote-hover.svg";
import downvoteHover from "@/app/assets/post-images/downvote-hover.svg";
import commentIcon from "@/app/assets/post-images/comments.svg";
import shareIcon from "@/app/assets/post-images/share.svg";
import shieldIcon from "@/app/assets/post-images/shield.svg";

import cross from "@/app/assets/post-images/mod-icons/cross.svg";
import spam from "@/app/assets/post-images/mod-icons/spam.svg";
import star from "@/app/assets/post-images/mod-icons/star.svg";
import starFilled from "@/app/assets/post-images/mod-icons/star-filled.svg";
import pin from "@/app/assets/post-images/mod-icons/pin.svg";
import pinFilled from "@/app/assets/post-images/mod-icons/pin-filled.svg";
import lock from "@/app/assets/post-images/mod-icons/lock.svg";
import lockFilled from "@/app/assets/post-images/mod-icons/lock-filled.svg";
import flair from "@/app/assets/post-images/mod-icons/flair.svg";
import nsfw from "@/app/assets/post-images/mod-icons/nsfw.svg";
import nsfwFilled from "@/app/assets/post-images/mod-icons/nsfw-filled.svg";
import spoiler from "@/app/assets/post-images/mod-icons/spoiler.svg";
import spoilerFilled from "@/app/assets/post-images/mod-icons/spoiler-filled.svg";
import croudControl from "@/app/assets/post-images/mod-icons/croudcontrol.svg";

import PostDropDownItem from "./PostDropDownItem";
import PostDropDownMenu from "./PostDropDownMenu";



/**
 * Component for Displaying the footer of a post.
 * @component
 * @param   {function} upvote   The function to upvote the post [Required]
 * @param   {function} downvote   The function to downvote the post [Required]
 * @param   {number} voteCount   The number of votes the post has [Required]
 * @param   {number} commentCount   The number of comments the post has [Required]
 * @param   {boolean} isMod   If the user is a mod [Required]
 * @returns {JSX.Element} The component for the profile info.
 *
 * @example
 *
 * <PostFooter upvote={upvote} downvote={downvote} voteCount={voteCount} commentCount={commentCount} isMod={isMod}/>    
 * 
 */
function PostFooter({upvote, downvote, voteCount, commentCount, isMod, voteStatus}) {
    const [buttonState, setButtonState] = React.useState({type: "neutral", upvoteIcon: upvoteIcon, downvoteIcon: downvoteIcon, upHover: "", downHover: ""}); // state of "neutral" for neutral, upvoted for upvote, downvoted for downvote
    const [showDropdown, setShowDropdown] = React.useState(false);

    React.useEffect(() => {
        setButtonState(prevButtonState => {
            if (voteStatus === "upvoted") {
            return({...prevButtonState, type: "upvoted", upvoteIcon: upvoteFilled, downvoteIcon: downvoteOutlined});
          } else if (voteStatus === "downvoted") {
            return({...prevButtonState, type: "downvoted", upvoteIcon: upvoteOutlined, downvoteIcon: downvoteFilled});
          } else {
            return({...prevButtonState, type: "neutral", upvoteIcon: upvoteIcon, downvoteIcon: downvoteIcon});
          }}) 
      }, [voteStatus]);

    function toggleDropdown() {
        setShowDropdown(prevShowDropdown => !prevShowDropdown);
    }

    function sharePost(){
        navigator.clipboard.writeText("hello").then(() => {alert("Profile Link Copied!")}).catch(() => {alert("Failed to copy link")} );
    }

    //Todo? propably will make a function here for each mod action in the future

    return (
        <div className={styles.post_footer}>
            <div className={styles.post_interactions} onClick={(e) => {e.stopPropagation();}} >
                <div className={styles.upvotes_container}>
                    <button 
                    className={`${styles.circle} ${styles.upvotes_button} ${buttonState.type}${buttonState.upHover} }`} 
                    onClick={() => {
                        if (buttonState.type === "upvoted") { // if post is upvoted and user clicks upvote, we need to downvote once
                            downvote();
                        } else if(buttonState.type === "downvoted") { // if post is downvoted and user clicks upvote, we need to upvote twice
                            upvote();
                        } else {   // if post is neutral and user clicks upvote, we need to upvote once
                            upvote();
                        }

                        setButtonState(prevButtonState => {
                            if ( prevButtonState.type === "upvoted" ) {
                                return {...prevButtonState, type: "neutral", upvoteIcon: upvoteIcon, downvoteIcon: downvoteIcon};
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
                            return {...prevButtonState, upvoteIcon: (prevButtonState.type === "neutral" ? upvoteIcon : (prevButtonState.type === "upvoted" ? upvoteFilled : upvoteOutlined)) ,upHover: "", downHover: ""};
                        })
                    }}>
                        <Image width={16} height={16} src={buttonState.upvoteIcon} alt="Upvote arrow" />
                    </button>
                    <span className={`${styles.count} ${buttonState.type}`}>{voteCount}</span>
                    <button
                    className={`${styles.circle} ${styles.downvotes_button} ${buttonState.type}${buttonState.downHover}`}
                    onClick={() => {
                        if (buttonState.type === "downvoted") { // if post is downvoted and user clicks downvote, we need to upvote once
                            upvote();
                        } else if(buttonState.type === "upvoted") { // if post is upvoted and user clicks downvote, we need to downvote twice
                            downvote();
                        } else {   // if post is neutral and user clicks downvote, we need to downvote once
                            downvote();
                        }

                        setButtonState(prevButtonState => {
                            if ( prevButtonState.type === "downvoted" ) {
                                return {...prevButtonState, type: "neutral", upvoteIcon: upvoteIcon, downvoteIcon: downvoteIcon};
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
                            return {...prevButtonState, downvoteIcon: (prevButtonState.type === "neutral" ? downvoteIcon : (prevButtonState.type === "downvoted" ? downvoteFilled : downvoteOutlined)) ,downHover: "", upHover: ""};
                        })
                    }}>
                        <Image width={16} height={16} src={buttonState.downvoteIcon} alt="Downvote arrow"/>
                    </button>
                </div>
           

                <button className={styles.btn}>
                        <Image width={16} height={16} src={commentIcon} alt="Comments Icon"/>
                        <span>{commentCount}</span>
                </button>

                <button className={styles.btn} onClick={sharePost}>
                        <Image width={16} height={16} src={shareIcon} alt="Share Icon"/>
                        <span>Share</span>
                </button>
           </div>
           <button className={styles.mod_interactions} onClick={(e) => {e.stopPropagation(); toggleDropdown()}} >
            <Image width={22} height={22} src={shieldIcon} alt="mod shield Icon"/>
            <PostDropDownMenu showDropdown={showDropdown} setShowDropDown={setShowDropdown} > 
                <PostDropDownItem icon={cross} iconAlt="Cross Icon" description="Remove" onClick={() => {console.log("I Love you")}} /> 
                <PostDropDownItem icon={spam} iconAlt="Spam Icon" description="Mark as Spam" />
                <PostDropDownItem icon={star} iconAlt="Star Icon" description="Distinguish as Mod" />
                <PostDropDownItem icon={pin} iconAlt="Pin Icon" description="Sticky Post" />
                <PostDropDownItem icon={lock} iconAlt="Lock Icon" description="Lock Comments" />
                <PostDropDownItem icon={flair} iconAlt="Flair Icon" description="Add/Change post flair" />
                <PostDropDownItem icon={nsfw} iconAlt="NSFW Icon" description="Mark as NSFW" />
                <PostDropDownItem icon={spoiler} iconAlt="Spoiler Icon" description="Mark as Spoiler" />
                <PostDropDownItem icon={croudControl} iconAlt="Cone Icon" description="Adjust Croud Control" />
            </PostDropDownMenu>  
           </button>         
           
        </div>
    );
}

export default PostFooter;