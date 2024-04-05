import React from "react";
import styles from "./Post.module.css";
import Image from 'next/image'
import { useState } from "react";
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

function Post({ title, description, subRedditName, subRedditPicture, video, images, upVotes, comments, time, banner, subRedditDescription, isProfile, cakeDate, isFollowed, onFollow, isMember, isSpoiler, isNSFW, pollIsOpen, pollOptions }) {

    const displayDescription = (video===undefined && images===undefined) ? true : false;
    const [imageIndex, setImageIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [joined,setJoined] = useState(false);
    const hidden = false; //temporary until hidden functionality is implemented 
    const [view, setView] = useState(false);

    function handleJoin() {
        setJoined(!joined);
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
                {hidden===true && <HiddenPost />}
                {hidden ===false && <div>
                    <Header subRedditName={subRedditName} subRedditPicture={subRedditPicture} time={time} banner={banner} subRedditDescription={subRedditDescription} isProfile={isProfile} cakeDate={cakeDate} isFollowed={isFollowed} onFollow={onFollow} isMember={isMember} joined={joined} handleJoin={handleJoin} />
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
                    {pollIsOpen !== undefined && <Poll isOpen={pollIsOpen} options={pollOptions} />}
                    <PostFooter upvote={() => {console.log("upvote")}} downvote={() => {console.log("downvote")}} voteCount={upVotes} commentCount={comments} isMod={true} />
                </div>}
            </div>
        </div>
    );
};

export default Post;
