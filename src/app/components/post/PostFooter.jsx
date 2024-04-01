import React from "react";
import Image from "next/image";
import styles from "./PostFooter.module.css"
import upvote from "@/app/assets/upvote-arrow.svg";
import downvote from "@/app/assets/downvote-arrow.svg";
import upvoteFilled from "@/app/assets/upvote-filled.svg";
import downvoteFilled from "@/app/assets/downvote-filled.svg";
import upvoteOutlined from "@/app/assets/upvote-outline.svg";
import downvoteOutlined from "@/app/assets/downvote-outline.svg";
import upvoteHover from "@/app/assets/upvote-hover.svg";
import downvoteHover from "@/app/assets/downvote-hover.svg";

function PostFooter() {
    const [buttonState, setButtonState] = React.useState({type: "neutral", upvoteIcon: upvote, downvoteIcon: downvote, upHover: "", downHover: ""}); // state of "neutral" for neutral, upvoted for upvote, downvoted for downvote

    return (
        <div className={styles.post_footer}>

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
                        return {...prevButtonState, upvoteIcon: (prevButtonState.type === "neutral" ? upvoteHover : upvoteFilled), upHover: "-hover", downHover: ""};
                    });
                }}
                onMouseLeave={() => {
                    setButtonState(prevButtonState => {
                        return {...prevButtonState, upvoteIcon: (prevButtonState.type === "neutral" ? upvote : upvoteFilled) ,upHover: "", downHover: ""};
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
                        return {...prevButtonState, downvoteIcon: (prevButtonState.type === "neutral" ? downvoteHover : downvoteFilled), downHover: "-hover", upHover: ""};
                    });
                }}
                onMouseLeave={() => {
                    setButtonState(prevButtonState => {
                        return {...prevButtonState, downvoteIcon: (prevButtonState.type === "neutral" ? downvote : downvoteFilled) ,downHover: "", upHover: ""};
                    })
                }}>
                    <Image width={16} height={16} src={buttonState.downvoteIcon} alt="Downvote arrow"/>
                </button>
           </div>

           
        </div>
    );
}

export default PostFooter;