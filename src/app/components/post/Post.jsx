import React from "react";
import { useRouter } from "next/navigation";
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
import getCookies from "../../utils/getCookies";
import close from "../../assets/close.svg";
import handler from "@/app/utils/apiHandler";


//todo get my username from cookies and check if it is equal to the poster username to set mypost with true or false

/**
 * Component for displaying the post.
 * @component
 */

function Post({postId, title, description, userName, subRedditName, subRedditPicture, subRedditRules, video, images, upVotes, comments, time, banner, subRedditDescription, isProfile, cakeDate, isFollowed, isMember, isSpoiler, isNSFW, isSaved, sendReplyNotifications, pollIsOpen, pollOptions, pollExpiration }) {

    const router = useRouter();
    const displayDescription = (video.length === 0 && images.length === 0) ? true : false;
    const [imageIndex, setImageIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [joined,setJoined] = useState(false);
    const [hidden,setHidden] = useState(false);
    const [view, setView] = useState(false);
    const [deleted,setDeleted] = useState(false);
    const [myPost,setMyPost] = useState(false);
    const [NSFW,setNSFW] = useState(isNSFW);
    const[spoiler,setSpoiler] = useState(isSpoiler);
    const [saved,setSaved] = useState(isSaved);
    const [followed,setFollowed]=useState(isFollowed);
    const [replyNotifications,setReplyNotifications] = useState(sendReplyNotifications);

    useEffect(() => {
        async function fetchData() {
          const cookie = await getCookies();
    
          if(cookie.username === userName){
            setMyPost(true);
          }
        }
        fetchData();
      }, []);

    useEffect(() => {
        setNSFW(isNSFW);
    }, [isNSFW]);

    useEffect(() => {
        setSpoiler(isSpoiler);
    }, [isSpoiler]);

    useEffect(() => {
        setSaved(isSaved);
    }, [isSaved]);

    useEffect(() => {
        setReplyNotifications(sendReplyNotifications);
    }, [sendReplyNotifications]);

    const parseAndStyleLinks = (text) => {
        // Regular expression to find URLs in text
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        
        // Replace URLs with anchor tags
        const formattedText = text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: blue; pointer-events: none;">$1</a>');
        
        return formattedText;
    }

    function convertToEmbedLink(videoLink) {
        // Regular expression to check if the link is a YouTube link
        const youtubeRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    
        if (youtubeRegex.test(videoLink)) {
            // If it's a YouTube link, replace "watch" with "embed"
            return videoLink.replace("/watch?v=", "/embed/");
        } else {
            // If it's not a YouTube link, return the original link
            return videoLink;
        }
    }

    const formattedDescription = parseAndStyleLinks(description);

    async function handleJoin() {
        let response;
        try{
            if(joined){
                response = await handler("/community/unsubscribe", "POST", {communityName: subRedditName}, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
                setJoined(false);
            }else{
                response = await handler("/community/subscribe", "POST", {communityName: subRedditName}, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
                setJoined(true);
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to join subreddit
    }

    async function handleHide() {
        let response;
        try {
            if(hidden){
                response = await handler(`/posts/${postId}/unhide`, "POST", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
                setHidden(false);
            }else{
                response = await handler(`/posts/${postId}/hide`, "POST", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
                setHidden(true)
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to hide a post
    }

    async function handleDelete () {
        let response;
        try {
            response = await handler(`/posts/${postId}`, "DELETE", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
            setDeleted(true);
            console.log(response);
        }  catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to delete a post
    }

    async function handleUpVote(vote) {
        let response;
        try {
            if(vote === 1)
            {
                response = await handler(`/posts/${postId}/upvote`, "POST", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk");
            }
            else
            {
                response = await handler(`/posts/${postId}/downvote`, "POST", "", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk");
            }
            console.log(response);
        }  catch(e){
            console.error("Error fetching Data: " ,e)
        }

        //api call to upvote or down vote
    }

    async function handlePollVote(choice) {
        let response;
        try {
            response = await handler(`/posts/${postId}/poll/vote`, "POST", {selectedOptions: choice}, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk");
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to vote 
    }

    async function handleNSFW() {
        let response;
        console.log(`${postId}`)
        try{
            if(NSFW){
                response = await handler(`/posts/${postId}/unnsfw`, "POST","", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
                setNSFW(false);
            }else{
                response = await handler(`/posts/${postId}/nsfw`, "POST","", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
                setNSFW(true);
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to invert NSFW
    }

    async function handleSpoiler() {
        let response;
        try{
            if(spoiler){
                response = await handler(`/posts/${postId}/unspoiler`, "POST","", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
                setSpoiler(false);
            }else{
                response = await handler(`/posts/${postId}/spoiler`, "POST","", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
                setSpoiler(true);
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to invert Spoiler
    }

    async function handleFollow() {
        let response;
        try{
            if(followed){
                response = await handler(`/users/unfollow`, "POST",{username:userName}, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
                setFollowed(false);
            }else{
                response = await handler(`/users/follow`, "POST",{username:userName}, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
                setFollowed(true);
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to follow or unfollow a user
    }

    async function handleReport(mainReason,subReason) {
        let response;
        try{
            response = await handler(`/posts/${postId}/report`, "POST", {reason: mainReason, sureason: subReason}, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk");
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to report a post
    }

    async function handleBlock() {
        let response;
        try{
        response = await handler(`/users/block`, "POST",{username:userName}, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
        console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to block a user
    }

    async function handleSaved () {
        let response;
        try{
            if(saved){
                response = await handler(`/posts/${postId}/unsave`, "POST","", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
                setSaved(false);
            }else{
                response = await handler(`/posts/${postId}/save`, "POST","", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEyOTQyMzYzfQ.E0PFDU6ISE1SGY6P-Yrew1Mw1wGPOUaUCRybHj09uDk")
                setSaved(true);
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to save a post
    }

    async function handleReplyNotifications () {
        setReplyNotifications(!sendReplyNotifications);
        //api call to set reply notifications
    }

    return (
        <div className={styles.post} onClick={() => deleted ? "" : router.push(`/comments/${postId}?isEditing=${false}`)}>
            {isFullScreen && 
                    <div className={styles.fullImage} onClick={(e) => {e.stopPropagation();}} >
                        <button type="button" className={`${styles.changeImage} ${styles.exitFullScreen}`} onClick={() => {setIsFullScreen(false)}}>
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
                            <button type="button" className={`${styles.changeImage} ${styles.nextImage}`} onClick={() => {setImageIndex(imageIndex+1)}}>
                            <Image 
                            src={nextImage}
                            width={16}
                            height={16} 
                            viewBox="0 0 20 20"
                            alt="next image" />
                        </button>}
                        {(imageIndex !== 0) &&                        
                            <button type="button" className={`${styles.changeImage} ${styles.previousImage}`} onClick={() => {setImageIndex(imageIndex-1)}}>
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
                <div className={styles.deleted} >
                    <div className={styles.deletedText}>Post deleted</div>
                </div>}
                {hidden === true && <HiddenPost unHide={handleHide} />}
                {(hidden === false && deleted === false) && <div>
                    <Header postId={postId} subRedditName={subRedditName} userName={userName} subRedditPicture={subRedditPicture} time={time} banner={banner} subRedditDescription={subRedditDescription} subRedditRules={subRedditRules} isProfile={isProfile} cakeDate={cakeDate} isFollowed={isFollowed} onFollow={handleFollow} isMember={isMember} joined={joined} onJoin={handleJoin} myPost={true} isNSFW={NSFW} onNSFW={handleNSFW} isSpoiler={spoiler} onSpoiler={handleSpoiler} isSaved={saved} onSave={handleSaved} replyNotifications={replyNotifications} onReplyNotifications={handleReplyNotifications} onReport={handleReport} onBlock={handleBlock} onHide={handleHide} onDelete={handleDelete} />
                    <div className={styles.title}>{title}</div>
                    <div className={styles.content} >
                        {(!view && (isNSFW || isSpoiler) ) && <div className={styles.overlay} onClick={(e) => {e.stopPropagation();}} ></div>}
                        {(!view && (isNSFW || isSpoiler) ) && <div className={styles.viewButton} onClick={(e) => {e.stopPropagation();}} >
                            {(isNSFW && !isSpoiler ) && <Button className={styles.viewButton} name={"View NSFW content"} onClick={() => setView(true)} active={true} />}
                            {(isSpoiler && !isNSFW) && <Button className={styles.viewButton} name={"View spoiler"} onClick={() => setView(true)} active={true} />}
                            {(isSpoiler && isNSFW)  && <Button className={styles.viewButton} name={"View NSFW content & spoilers"} onClick={() => setView(true)} active={true} />}
                        </div>}
                        {displayDescription && <div className={`${styles.description} ${!view ? styles.view : ""}`} dangerouslySetInnerHTML={{ __html: formattedDescription }} ></div>}
                        {!displayDescription && <div className={styles.media} onClick={(e) => {e.stopPropagation();}}>
                            {video.length !== 0 &&
                                <iframe className={styles.video} title="Posted video"
                                allowFullScreen
                                src={convertToEmbedLink(video[0])}
                            />}
                            {(video.length === 0 && images.length !== 0) &&       
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
                        </div>}
                    </div>
                    {pollOptions.length !== 0 && <Poll isOpen={pollIsOpen} options={pollOptions} onVote={handlePollVote} pollExpiration={pollExpiration} />}
                    <PostFooter upvote={() => handleUpVote(1)} downvote={() => handleUpVote(-1)} voteCount={upVotes} commentCount={comments} isMod={true} />
                </div>}
            </div>
        </div>
    );
};

export default Post;
