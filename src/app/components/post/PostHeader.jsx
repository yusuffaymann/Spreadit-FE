import React, {useState} from "react"
import styles from "./PostHeader.module.css"
import Image from 'next/image'
import SubRedditInfoModal from "./SubRedditInfoModal"
import ProfileInfoModal from "./ProfileInfoModal"
import ReportModal from "../UI/ReportModal"
import PostOptionsImage from "../../assets/three-dots-menu.svg"
import PostDropDownMenu from "./PostDropDownMenu"
import PostDropDownItem from "./PostDropDownItem"
import save from "../../assets/post-images/save.svg"
import unsave from "../../assets/post-images/unsave.svg"
import report from "../../assets/post-images/report.svg"
import hide from "../../assets/post-images/hide.svg"
import edit from "../../assets/post-images/edit.svg"
import remove from "../../assets/post-images/delete.svg"
import spoiler from "../../assets/post-images/mod-icons/spoiler.svg"
import removeSpoiler from "../../assets/post-images/mod-icons/spoiler-filled.svg"
import NSFW from "../../assets/post-images/mod-icons/nsfw.svg"
import removeNSFW from "../../assets/post-images/mod-icons/nsfw-filled.svg"
import bell from "../../assets/post-images/bell.svg"
import removeBell from "../../assets/post-images/bell-filled.svg"

import Button from "./Button";

function PostHeader ({subRedditName, subRedditPicture, time, banner, subRedditDescription, isProfile, cakeDate, isFollowed, onFollow, isMember, joined, handleJoin, onDelete, myPost}) {


    const [showDropdown, setShowDropdown] = useState(false);
    const [showSubRedditInfo,setShowSubRedditInfo] = useState(false);
    const [showReportModal,setShowReportModal] = useState(false);
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
        {showReportModal && <ReportModal subRedditPicture={subRedditPicture} subRedditName={subRedditName} closeModal={() => setShowReportModal(false)} />}
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
                {myPost === false &&
                <PostDropDownMenu showDropdown={showDropdown} setShowDropDown={setShowDropdown} > 
                    <PostDropDownItem icon={save} iconAlt="Save Icon" description="Save" /> 
                    <PostDropDownItem icon={hide} iconAlt="Hide Icon" description="Hide" />
                    <PostDropDownItem icon={report} iconAlt="Report Icon" description="Report" onClick={() => setShowReportModal(true)} />
                </PostDropDownMenu>}
                {myPost === true &&
                <PostDropDownMenu showDropdown={showDropdown} setShowDropDown={setShowDropdown} > 
                    <PostDropDownItem icon={edit} iconAlt="Edit Icon" description="Edit" /> 
                    <PostDropDownItem icon={save} iconAlt="Save Icon" description="Save" /> 
                    <PostDropDownItem icon={hide} iconAlt="Hide Icon" description="Hide" />
                    <PostDropDownItem icon={remove} iconAlt="Delete Icon" description="Delete" />
                    <PostDropDownItem icon={spoiler} iconAlt="Turn on Spoilers Icon" description="Spoilers" />
                    <PostDropDownItem icon={NSFW} iconAlt="Turn on NSFW Icon" description="NSFW" />
                    <PostDropDownItem icon={bell} iconAlt="Turn on Bell Icon" description="Notifications" />
                </PostDropDownMenu>}
            </button>
        </div>}    
    </div>
    );
}


export default PostHeader;