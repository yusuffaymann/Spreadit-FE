import React from "react";
import styles from "./PostHeader.module.css";
import Image from 'next/image'
import PostOptionsImage from "../../assets/three-dots-menu.svg"

function PostHeader ({subRedditName, subRedditPicture, time}) {


    return(
        <div className={styles.header}>
        <div className={styles.postHeaderInfo}>
            <div className={styles.subRedditNameAndPicture}>
                <Image className={styles.subRedditPicture}
                    src={subRedditPicture}
                    width={24}
                    height={24}
                    alt="The subReddit picture "
                />
                <div className={styles.subRedditName}>{subRedditName}</div>
            </div>
            <div>•</div>
            <div className={styles.time}>{time}</div>
        </div>
        <button type="button" className={styles.options}>
            <Image 
            src={PostOptionsImage}
            width={16}
            height={16} 
            viewBox="0 0 20 20"
            alt="options" />
        </button>
    </div>
    );
}


export default PostHeader;