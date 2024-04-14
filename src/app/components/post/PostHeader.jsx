import React, {useEffect, useState} from "react"
import { useRouter } from "next/navigation";
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


function PostHeader ({postId, isUser, userName,showProfilePicture, profilePicture, subRedditName, subRedditPicture, subRedditRules, time, banner, subRedditDescription, isProfile, isInComment, cakeDate, isFollowed, onFollow, isMember, joined, onJoin, isSaved, onSave, onDelete, myPost, onHide, onReport, onBlock, isSpoiler, onSpoiler, isNSFW, onNSFW, replyNotifications, onReplyNotifications}) {

    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSubRedditInfo,setShowSubRedditInfo] = useState(false);
    const [showProfileInfo,setShowProfileInfo] = useState(false);
    const [showReportModal,setShowReportModal] = useState(false);
    
    const [showDeleteModal,setShowDeleteModal] = useState(false);

    let timeOut;

    function toggleDropdown() {
        setShowDropdown(prevShowDropdown => !prevShowDropdown);
    }

    const handleFollow=()=>{
        setFollowed(!followed);
        onFollow();
    }

    async function handleMouseLeaveSubreddit() {
        timeOut = setTimeout(() => {
            setShowSubRedditInfo(false);    
        }, 200);
    }

    async function handleMouseLeaveProfile() {
        timeOut = setTimeout(() => { 
            setShowProfileInfo(false);    
        }, 200);
    }
    return(
        
        <div className={styles.header}>
        {showReportModal && <ReportModal userName={userName} subRedditPicture={subRedditPicture} subRedditName={subRedditName} subRedditRules={subRedditRules} onReport={onReport} onBlock={onBlock} closeModal={() => setShowReportModal(false)} />}
        {showDeleteModal && <DeletePost onDelete={onDelete} closeModal={() => setShowDeleteModal(false)} />}

        <div className={styles.postHeaderInfo} onClick={(e) => {e.stopPropagation();}}>
            {!isInComment&&(<div className={styles.subRedditNameAndPicture} onMouseEnter={() => setShowSubRedditInfo(true)} onMouseLeave={() => handleMouseLeaveSubreddit()}  onClick={() => {router.push(`/community/${subRedditName}`)}}>
                {showSubRedditInfo &&
                <div onMouseEnter={() => clearTimeout(timeOut)} onMouseLeave={() => setShowSubRedditInfo(false)} onClick={(e) => {e.stopPropagation();}}>

                    {isProfile && <ProfileInfoModal isUser={isUser} userName={userName} profilePicture={profilePicture} cakeDate={cakeDate} isFollowed={isFollowed} onFollow={onFollow} />}
                    {!isProfile && <SubRedditInfoModal subRedditName={subRedditName} subRedditPicture={subRedditPicture} subRedditBanner={banner} subRedditDescription={subRedditDescription} isMember={isMember} joined={joined} onJoin={onJoin}/> }
                </div>}
                {showProfilePicture&&<img className={styles.subRedditPicture}
                    src={subRedditPicture || profilePicture}
                    width={256}
                    height={256}
                    alt="The subReddit picture "
                    quality={100}
                />}
                
                <div className={styles.subredditandusername}>
                    <div className={styles.postInfo}>
                    <div className={styles.subRedditName}>{`r/${subRedditName || userName}`}</div>
                    <div>•</div>
                    </div>
                </div>
                
            </div>)}
            {isInComment&&
            (<div className={styles.subRedditNameAndPicture}>
                {showSubRedditInfo &&
                <div className={styles.showmodalarea} onMouseEnter={() => clearTimeout(timeOut)} onMouseLeave={() => setShowSubRedditInfo(false)} onClick={() => {router.push(`/community/${subRedditName}`)}} >
                    <SubRedditInfoModal subRedditName={subRedditName} subRedditPicture={subRedditPicture} subRedditBanner={banner} subRedditDescription={subRedditDescription} isMember={isMember} joined={joined} onJoin={onJoin}/>
                </div>}
                {showProfileInfo &&
                <div onMouseEnter={() => clearTimeout(timeOut)} onMouseLeave={() => setShowProfileInfo(false)} >
                    <ProfileInfoModal isUser={isUser} userName={userName} profilePicture={profilePicture} cakeDate={cakeDate} isFollowed={isFollowed} onFollow={onFollow} />
                </div>}
                <img className={styles.subRedditPicture}
                    src={subRedditPicture}
                    width={256}
                    height={256}
                    alt="The subReddit picture "
                    quality={100}
                />
                <div className={styles.subredditandusername}>
                    <div className={styles.postInfo}>
                        <div className={styles.subRedditName} onMouseEnter={() => setShowSubRedditInfo(true)} onMouseLeave={() => handleMouseLeaveSubreddit()}>{subRedditName}</div>
                        <div>•</div>
                        <div className={styles.time}>{time}</div>
                    </div>
                    <div className={styles.userName} onMouseEnter={() => setShowProfileInfo(true)} onMouseLeave={() => handleMouseLeaveProfile()} >{userName}</div>
                </div>
            </div>)}
            {!isInComment&&<div className={styles.time}>{time}</div>}
        </div>
        {!isProfile && 

        <div className={styles.joinAndOptions} onClick={(e) => {e.stopPropagation();}}>
            {!isMember && !isInComment&&
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
                    <PostDropDownItem icon={edit} iconAlt="Edit Icon" description="Edit post" onClick={() => router.push(`/comments/${postId}?isEditing`)} /> 
                    {!isSaved && <PostDropDownItem icon={save} iconAlt="Save Icon" description="Save" onClick={() => onSave()} />}
                    {isSaved && <PostDropDownItem icon={unsave} iconAlt="Unsave Icon" description="Remove from saved" onClick={() => onSave()} />}
                    <PostDropDownItem icon={hide} iconAlt="Hide Icon" description="Hide" onClick={() => onHide()} />
                    <PostDropDownItem icon={remove} iconAlt="Delete Icon" description="Delete" onClick={() => setShowDeleteModal(true)} />
                    {!isSpoiler && <PostDropDownItem icon={spoilerIcon} iconAlt="Turn on Spoilers Icon" description="Add spoiler tag" onClick={() => onSpoiler()} />}
                    {isSpoiler && <PostDropDownItem icon={removeSpoiler} iconAlt="Turn off Spoilers Icon" description="Remove spoiler tag" onClick={() => onSpoiler()} />}
                    {!isNSFW && <PostDropDownItem icon={nsfwIcon} iconAlt="Turn on NSFW Icon" description="Add NSFW tag" onClick={() => onNSFW()} />}
                    {isNSFW && <PostDropDownItem icon={removeNSFW} iconAlt="Turn off NSFW Icon" description="Remove NSFW tag" onClick={() => onNSFW()} />}
                    {!replyNotifications && <PostDropDownItem icon={bell} iconAlt="Turn on reply notifications Icon" description="Turn on reply notification" onClick={() => onReplyNotifications()} />}                       
                    {replyNotifications && <PostDropDownItem icon={removeBell} iconAlt="Turn off reply notifications Icon" description="Turn off reply notification" onClick={() => onReplyNotifications()} />}                 
                </PostDropDownMenu>}
            </button>
        </div>}    
    </div>
    );
}


export default PostHeader;
