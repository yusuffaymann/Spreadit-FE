import React, { useState } from "react";
import Image from "next/image";
import styles from "./CommentFooter.module.css"

import PostOptionsImage from "@/app/assets/three-dots-menu.svg"
import upvoteIcon from "@/app/assets/post-images/upvote-arrow.svg";
import downvoteIcon from "@/app/assets/post-images/downvote-arrow.svg";
import upvoteFilled from "@/app/assets/post-images/upvote-filled.svg";
import downvoteFilled from "@/app/assets/post-images/downvote-filled.svg";
import upvoteOutlined from "@/app/assets/post-images/upvote-outline.svg";
import save from "../../assets/post-images/save.svg"
import remove from "../../assets/post-images/delete.svg"
import unsave from "../../assets/post-images/unsave.svg"
import report from "../../assets/post-images/report.svg"
import hide from "../../assets/post-images/hide.svg"
import edit from "../../assets/post-images/edit.svg"
import ReportModal from "../UI/ReportModal"
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

import PostDropDownItem from "../post/PostDropDownItem";
import PostDropDownMenu from "../post/PostDropDownMenu";




function commentFooter({upvote, downvote, voteCount, voteStatus, isSaved, onSave, isUser, onEdit, onReply, onHide, onDelete,userName, subRedditPicture, subRedditName, subRedditRules, onBlock,onReport}) {
    const [buttonState, setButtonState] = React.useState({type: "neutral", upvoteIcon: upvoteIcon, downvoteIcon: downvoteIcon, upHover: "", downHover: ""}); // state of "neutral" for neutral, upvoted for upvote, downvoted for downvote
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [showReportModal,setShowReportModal] = useState(false);

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

    const handleSave =()=>{
        onSave();
    }

    function toggleDropdown() {
        setShowDropdown(prevShowDropdown => !prevShowDropdown);
    }

    return (
        <div className={styles.post_footer}>
                    {showReportModal && <ReportModal userName={userName} subRedditPicture={subRedditPicture} subRedditName={subRedditName} onReport={onReport} onBlock={onBlock} closeModal={() => setShowReportModal(false)} subRedditRules={subRedditRules} />}

            <div className={styles.post_interactions}>
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
           

                <button className={styles.btn} onClick={onReply}>
                        <Image width={16} height={16} src={commentIcon} alt="Comments Icon"/>
                        <span>Reply</span>
                </button>

                <button className={styles.btn}>
                        <Image width={16} height={16} src={shareIcon} alt="Comments Icon"/>
                        <span>Share</span>
                </button>
           </div>
           <button className={styles.toggleDropdown} onClick={toggleDropdown}>
            <Image width={16} height={16} src={PostOptionsImage} alt="options Icon"/>
           </button>
           <div className={styles.dropdowncontainer}>
           <PostDropDownMenu showDropdown={showDropdown} setShowDropDown={setShowDropdown} > 
               {!isSaved&&(<PostDropDownItem icon={save} iconAlt="Save Icon" description="Save" onClick={handleSave} />)}  
               {isSaved&&(<PostDropDownItem icon={unsave} iconAlt="unsave Icon" description="Remove from saved" onClick={handleSave}  />)}
               {!isUser&&(<PostDropDownItem icon={report} iconAlt="Report Icon" description="Report" onClick={()=>{setShowReportModal(true)}}/>)}
                <PostDropDownItem icon={hide} iconAlt="Hide Icon" description="Hide" onClick={onHide}/>
                {isUser&&(<PostDropDownItem icon={edit} iconAlt="Edit Icon" description="Edit" onClick={onEdit} />)}
                {isUser&&(<PostDropDownItem icon={remove} iconAlt="Delete Icon" description="Delete" onClick={onDelete} />)}
                
            </PostDropDownMenu> 
           </div>
                      
           
        </div>
    );
}

export default commentFooter;