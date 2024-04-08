import React, {useEffect, useState} from "react"
import Image from 'next/image'
import styles from "./PostHeader.module.css"
import SubRedditInfoModal from "./SubRedditInfoModal"
import ProfileInfoModal from "./ProfileInfoModal"
import ReportModal from "../UI/ReportModal"
import DeletePost from "./DeletePostModal"
import PostOptionsImage from "../../assets/three-dots-menu.svg"
import PostDropDownMenu from "./PostDropDownMenu"
import PostDropDownItem from "./PostDropDownItem"
import save from "../../assets/post-images/save.svg"
import unsave from "../../assets/post-images/unsave.svg"
import report from "../../assets/post-images/report.svg"
import hide from "../../assets/post-images/hide.svg"
import edit from "../../assets/post-images/edit.svg"
import remove from "../../assets/post-images/delete.svg"
import spoilerIcon from "../../assets/post-images/mod-icons/spoiler.svg"
import removeSpoiler from "../../assets/post-images/mod-icons/spoiler-filled.svg"
import nsfwIcon from "../../assets/post-images/mod-icons/nsfw.svg"
import removeNSFW from "../../assets/post-images/mod-icons/nsfw-filled.svg"
import bell from "../../assets/post-images/bell.svg"
import removeBell from "../../assets/post-images/bell-filled.svg"

import Button from "./Button";

function PostHeader ({userName, subRedditName, subRedditPicture, time, banner, subRedditDescription, isProfile, cakeDate, isFollowed, onFollow, isMember, joined, onJoin, isSaved, onSave, onDelete, myPost, onHide, onReport, onBlock, isSpoiler, onSpoiler, isNSFW, onNSFW}) {


    const [showDropdown, setShowDropdown] = useState(false);
    const [showSubRedditInfo,setShowSubRedditInfo] = useState(false);
    const [showReportModal,setShowReportModal] = useState(false);
    const [showDeleteModal,setShowDeleteModal] = useState(false);
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
        {showReportModal && <ReportModal userName={userName} subRedditPicture={subRedditPicture} subRedditName={subRedditName} onReport={onReport} onBlock={onBlock} closeModal={() => setShowReportModal(false)} />}
        {showDeleteModal && <DeletePost onDelete={onDelete} closeModal={() => setShowDeleteModal(false)} />}
        <div className={styles.postHeaderInfo}>
            <div className={styles.subRedditNameAndPicture} onMouseEnter={() => setShowSubRedditInfo(true)} onMouseLeave={() => handleMouseLeave()}>
                {showSubRedditInfo &&
                <div onMouseEnter={() => clearTimeout(timeOut)} onMouseLeave={() => setShowSubRedditInfo(false)} >
                    {isProfile && <ProfileInfoModal userName={subRedditName} profilePicture={subRedditPicture} cakeDate={cakeDate} isFollowed={isFollowed} onFollow={onFollow} />}
                    {!isProfile && <SubRedditInfoModal subRedditName={subRedditName} subRedditPicture={subRedditPicture} subRedditBanner={banner} subRedditDescription={subRedditDescription} isMember={isMember} joined={joined} onJoin={onJoin}/> }
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
                {!joined && <Button className={styles.joinButton} name={"Join"} onClick={() => onJoin()} active={true} />}
                {joined && <Button className={styles.joinButton} name={"Leave"} onClick={() => onJoin()} active={true} />}
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
                    {!isSaved && <PostDropDownItem icon={save} iconAlt="Save Icon" description="Save" onClick={() => onSave()} />}
                    {isSaved && <PostDropDownItem icon={unsave} iconAlt="Unsave Icon" description="Remove from saved" onClick={() => onSave()} />}
                    <PostDropDownItem icon={hide} iconAlt="Hide Icon" description="Hide" onClick={() => onHide()} />
                    <PostDropDownItem icon={report} iconAlt="Report Icon" description="Report" onClick={() => setShowReportModal(true)} />
                </PostDropDownMenu>}
                {myPost === true &&
                <PostDropDownMenu showDropdown={showDropdown} setShowDropDown={setShowDropdown} > 
                    <PostDropDownItem icon={edit} iconAlt="Edit Icon" description="Edit post" /> 
                    {!isSaved && <PostDropDownItem icon={save} iconAlt="Save Icon" description="Save" onClick={() => onSave()} />}
                    {isSaved && <PostDropDownItem icon={unsave} iconAlt="Unsave Icon" description="Remove from saved" onClick={() => onSave()} />}
                    <PostDropDownItem icon={hide} iconAlt="Hide Icon" description="Hide" onClick={() => onHide()} />
                    <PostDropDownItem icon={remove} iconAlt="Delete Icon" description="Delete" onClick={() => setShowDeleteModal(true)} />
                    {!isSpoiler && <PostDropDownItem icon={spoilerIcon} iconAlt="Turn on Spoilers Icon" description="Add spoiler tag" onClick={() => onSpoiler()} />}
                    {isSpoiler && <PostDropDownItem icon={removeSpoiler} iconAlt="Turn off Spoilers Icon" description="Remove spoiler tag" onClick={() => onSpoiler()} />}
                    {!isNSFW && <PostDropDownItem icon={nsfwIcon} iconAlt="Turn on NSFW Icon" description="Add NSFW tag" onClick={() => onNSFW()} />}
                    {isNSFW && <PostDropDownItem icon={removeNSFW} iconAlt="Turn off NSFW Icon" description="Remove NSFW tag" onClick={() => onNSFW()} />}
                    <PostDropDownItem icon={bell} iconAlt="Turn on Bell Icon" description="Notifications" />
                </PostDropDownMenu>}
            </button>
        </div>}    
    </div>
    );
}


export default PostHeader;
