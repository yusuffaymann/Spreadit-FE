import React, {useState} from "react";
import styles from "./PostHeader.module.css";
import Image from 'next/image'
import SubRedditInfoModal from "./SubRedditInfoModal"
import ProfileInfoModal from "./ProfileInfoModal";
import ReportModal from "../UI/ReportModal";
import PostOptionsImage from "../../assets/three-dots-menu.svg"
import PostDropDownMenu from "./PostDropDownMenu"
import PostDropDownItem from "./PostDropDownItem"
import save from "../../assets/post-images/save.svg"
import unsave from "../../assets/post-images/unsave.svg"
import report from "../../assets/post-images/report.svg"
import hide from "../../assets/post-images/hide.svg"
import Button from "./Button";

function PostHeader ({subRedditName, subRedditPicture, time, banner, subRedditDescription, isProfile, cakeDate, isFollowed, onFollow, isMember, joined, handleJoin}) {


    const [showDropdown, setShowDropdown] = useState(false);
    const [showSubRedditInfo,setShowSubRedditInfo] = useState(false);
    let timeOut;


    function toggleDropdown() {
        setShowDropdown(prevShowDropdown => !prevShowDropdown);
    }

    async function handleMouseLeave() {
        timeOut = setTimeout(() => {
            setShowSubRedditInfo(false);     
        }, 200);
    }

    return(
        <div className={styles.header}>
        <div className={styles.postHeaderInfo}>
            <div className={styles.subRedditNameAndPicture} onMouseEnter={() => setShowSubRedditInfo(true)} onMouseLeave={() => handleMouseLeave()}>
                {showSubRedditInfo &&
                <div onMouseEnter={() => clearTimeout(timeOut)} onMouseLeave={() => setShowSubRedditInfo(false)} >
                    {isProfile && <ProfileInfoModal userName={subRedditName} profilePicture={subRedditPicture} cakeDate={cakeDate} isfollowed={isFollowed} onFollow={onFollow} />}
                    {!isProfile && <SubRedditInfoModal subRedditName={subRedditName} subRedditPicture={subRedditPicture} subRedditBanner={banner} subRedditDescription={subRedditDescription} isMember={isMember} joined={joined} handleJoin={handleJoin} /> }
                </div>}
                <img className={styles.subRedditPicture}
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
        {!isProfile && 
        <div className={styles.joinAndOptions} >
            {!isMember &&
            <div className={styles.joinButton}>
                {!joined && <Button className={styles.joinButton} name={"Join"} onClick={() => handleJoin()} active={true} />}
                {joined && <Button className={styles.joinButton} name={"Leave"} onClick={() => handleJoin()} active={true} />}
            </div>}
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
        </div>}    
    </div>
    );
}


export default PostHeader;