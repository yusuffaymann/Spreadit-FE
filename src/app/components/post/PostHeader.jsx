import React from "react";
import styles from "./PostHeader.module.css";
import Image from 'next/image'
import PostOptionsImage from "../../assets/three-dots-menu.svg"
import PostDropDownMenu from "./PostDropDownMenu"
import PostDropDownItem from "./PostDropDownItem"
import save from "../../assets/post-images/save.svg"
import unsave from "../../assets/post-images/unsave.svg"
import report from "../../assets/post-images/report.svg"
import hide from "../../assets/post-images/hide.svg"

function PostHeader ({subRedditName, subRedditPicture, time}) {


    const [showDropdown, setShowDropdown] = React.useState(false);

    function toggleDropdown() {
        setShowDropdown(prevShowDropdown => !prevShowDropdown);
    }

    return(
        <div className={styles.header}>
        <div className={styles.postHeaderInfo}>
            <div className={styles.subRedditNameAndPicture}>
                <Image className={styles.subRedditPicture}
                    src={subRedditPicture}
                    width={256}
                    height={256}
                    alt="The subReddit picture "
                    quality={100}
                />
                <div className={styles.subRedditName}>{subRedditName}</div>
            </div>
            <div>•</div>
            <div className={styles.time}>{time}</div>
        </div>
        <button type="button" className={styles.options} onClick={toggleDropdown}>
            <Image 
            src={PostOptionsImage}
            width={16}
            height={16} 
            viewBox="0 0 20 20"
            alt="options" />
            <PostDropDownMenu showDropdown={showDropdown} setShowDropDown={setShowDropdown} > 
                <PostDropDownItem icon={save} iconAlt="Save Icon" description="Save" /> 
                <PostDropDownItem icon={hide} iconAlt="Hide Icon" description="Hide" />
                <PostDropDownItem icon={report} iconAlt="Report Icon" description="Report" />
            </PostDropDownMenu>  
        </button>      
    </div>
    );
}


export default PostHeader;