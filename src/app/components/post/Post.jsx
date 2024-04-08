import React, { use } from "react";
import styles from "./Post.module.css";
import Image from 'next/image'
import { useState, useEffect } from "react";
import Header from "./PostHeader";
import Button from "./Button";
import Poll from "./Poll";
import nextImage from "../../assets/right-chevron-svgrepo-com.svg"
import previousImage from "../../assets/left-chevron-svgrepo-com.svg"
import PostFooter from "./PostFooter";
import HiddenPost from "./HiddenPost";
import close from "../../assets/close.svg";

/**
 * Component for displaying the post.
 * @component
 */

function Post({ title, description, userName, subRedditName, subRedditPicture, video, images, upVotes, comments, time, banner, subRedditDescription, isProfile, cakeDate, isFollowed, onFollow, isMember, isSpoiler, isNSFW, pollIsOpen, pollOptions }) {

    const displayDescription = (video===undefined && images===undefined) ? true : false;
    const [imageIndex, setImageIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [joined,setJoined] = useState(false);
    const [hidden,setHidden] = useState(false);
    const [view, setView] = useState(false);
    const [deleted,setDeleted] = useState(false);
    const [NSFW,setNSFW] = useState(isNSFW);
    const[spoiler,setSpoiler] = useState(isSpoiler);
    const [saved,setSaved] = useState(false);
    const [followed,setFollowed]=useState(isFollowed);

    useEffect(() => {
        setNSFW(isNSFW);
    }, [isNSFW]);

    useEffect(() => {
        setSpoiler(isSpoiler);
    }, [isSpoiler]);

    function handleJoin() {
        setJoined(!joined);
        //api call to join subreddit
    }

    function handleHide() {
        setHidden(!hidden);
        //api call to hide a post
    }

    function handleDelete () {
        setDeleted(true);
        //api call to delete a post
    }

    function handleUpVote(vote) {
        //api call to upvote or down vote
    }

    function handlePollVote(choice) {
        console.log(choice);
        //api call to vote 
    }

    function handleNSFW() {
        //api call to invert NSFW
    }

    function handleSpoiler() {
        //api call to invert Spoiler
    }

    function handleFollow() {
        setFollowed(!followed);
        onFollow();
        //api call to follow or unfollow a user
    }

    function handleReport(mainReason,subReason) {
        console.log(subReason);
        //api call to report a post
    }

    function handleBlock() {
        console.log("block");
        //api call to block a user
    }

    function handleNSFW () {
        setNSFW(!NSFW);
        //api call to set one of your posts as nsfw
    }

    function handleSpoiler () {
        setSpoiler(!spoiler);
        //api call to set one of your posts as spoiler
    }

    function handleSaved () {
        setSaved(!saved);
        //api call to save a post

    }

    return (
        <div className={styles.post}>
            {isFullScreen && 
                    <div className={styles.fullImage}  >
                        <button type="button" className={`${styles.changeImage} ${styles.exitFullScreen}`} onClick={() => setIsFullScreen(false)}>
                            <Image style={{  filter: "brightness(100%) saturate(0%) invert(100%)"}}
                            src={close}
                            width={24}
                            height={24} 
                            viewBox="0 0 20 20"
                            alt="exit full screen" />
                        </button>
                        <div className={styles.blurBackground}></div>
                        <div className={styles.backgroundImage} style={{backgroundImage: `url(${images[imageIndex]})`}}>
                        </div>
                        <Image src={images[imageIndex]} alt="posted image " fill style={{objectFit: "contain", maxWidth: "100%"}}  />
                        {(images.length > imageIndex+1) &&
                            <button type="button" className={`${styles.changeImage} ${styles.nextImage}`} onClick={() => setImageIndex(imageIndex+1)}>
                            <Image 
                            src={nextImage}
                            width={16}
                            height={16} 
                            viewBox="0 0 20 20"
                            alt="next image" />
                        </button>}
                        {(imageIndex !== 0) &&                        
                            <button type="button" className={`${styles.changeImage} ${styles.previousImage}`} onClick={() => setImageIndex(imageIndex-1)}>
                            <Image 
                            src={previousImage}
                            width={16}
                            height={16} 
                            viewBox="0 0 20 20"
                            alt="previous image" />
                        </button>}
            </div>}
            <div className={styles.body}>
                {deleted === true && 
                <div className={styles.deleted}>
                    <div className={styles.deletedText}>Post deleted</div>
                </div>}
                {hidden === true && <HiddenPost unHide={handleHide} />}
                {(hidden === false && deleted === false) && <div>
                    <Header subRedditName={subRedditName} userName={userName} subRedditPicture={subRedditPicture} time={time} banner={banner} subRedditDescription={subRedditDescription} isProfile={isProfile} cakeDate={cakeDate} isFollowed={isFollowed} onFollow={handleFollow} isMember={isMember} joined={joined} onJoin={handleJoin} myPost={true} isNSFW={NSFW} onNSFW={handleNSFW} isSpoiler={spoiler} onSpoiler={handleSpoiler} isSaved={saved} onSave={handleSaved} onReport={handleReport} onBlock={handleBlock} onHide={handleHide} onDelete={handleDelete} />
                    <div className={styles.title}>{title}</div>
                    <div className={styles.content} >
                        {!view && <div className={styles.overlay}></div>}
                        {!view && <div className={styles.viewButton} >
                            {(isNSFW && !isSpoiler ) && <Button className={styles.viewButton} name={"View NSFW content"} onClick={() => setView(true)} active={true} />}
                            {(isSpoiler && !isNSFW) && <Button className={styles.viewButton} name={"View spoiler"} onClick={() => setView(true)} active={true} />}
                            {(isSpoiler && isNSFW)  && <Button className={styles.viewButton} name={"View NSFW content & spoilers"} onClick={() => setView(true)} active={true} />}
                        </div>}
                        {displayDescription && <div className={`${styles.description} ${!view ? styles.view : ""}`}>{description}</div>}
                        <div className={styles.media}>
                            {video !== undefined &&
                                <iframe className={styles.video} title="Posted video"
                                allowFullScreen
                                src={video}
                            />}
                            {(video === undefined && images !==undefined) &&       
                                <div className={styles.image} onClick={() => setIsFullScreen(true)}  >
                                    <div className={styles.blurBackground}></div>
                                    <div className={styles.backgroundImage} style={{backgroundImage: `url(${images[imageIndex]})`}}></div>
                                    <Image src={images[imageIndex]} alt="posted image " fill style={{objectFit: "contain", maxWidth: "100%"}}  />
                                    {(images.length > imageIndex+1) &&
                                        <button type="button" className={`${styles.changeImage} ${styles.nextImage}`}         
                                            onClick={(e) => {
                                            e.stopPropagation();
                                            setImageIndex(imageIndex+1)}}
                                        >
                                        <Image 
                                        src={nextImage}
                                        width={16}
                                        height={16} 
                                        viewBox="0 0 20 20"
                                        alt="next image" />
                                    </button>}
                                    {(imageIndex !== 0) &&                        
                                        <button type="button" className={`${styles.changeImage} ${styles.previousImage}`}                                         
                                            onClick={(e) => {
                                            e.stopPropagation();
                                            setImageIndex(imageIndex-1)}}
                                        >
                                        <Image 
                                        src={previousImage}
                                        width={16}
                                        height={16} 
                                        viewBox="0 0 20 20"
                                        alt="previous image" />
                                    </button>}
                                </div>
                            }
                        </div>
                    </div>
                    {pollOptions.length !== 0 && <Poll isOpen={pollIsOpen} options={pollOptions} onVote={handlePollVote} />}
                    <PostFooter upvote={() => handleUpVote(1)} downvote={() => handleUpVote(-1)} voteCount={upVotes} commentCount={comments} isMod={true} />
                </div>}
            </div>
        </div>
    );
};

export default Post;
