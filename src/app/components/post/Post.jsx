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

function Post({type, postId, title, description, userName, subRedditName, subRedditPicture, subRedditRules, attachments, upVotes, upVoteStatus, comments, time, banner, subRedditDescription, isProfile, cakeDate, isFollowed, isMember, isSpoiler, isNSFW, isSaved, sendReplyNotifications, pollIsOpen, pollOptions, pollExpiration, pollVote }) {

    let token ="" ;
    const router = useRouter();
    const { images, videos } = attachments.reduce(
        (acc, attachment) => {
          if (attachment.type === 'image') {
            acc.images.push(attachment.link);
          } else if (attachment.type === 'video') {
            acc.videos.push(attachment.link);
          }
          return acc;
        },
        { images: [], videos: [] }
      );

    const displayDescription = (videos.length === 0 && images.length === 0) ? true : false;
    const [imageIndex, setImageIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [joined,setJoined] = useState(false);
    const [hidden,setHidden] = useState(false);
    const [view, setView] = useState(false);
    const [deleted,setDeleted] = useState(false);
    const [votes,setVotes] = useState(upVotes);
    const [NSFW,setNSFW] = useState(isNSFW);
    const[spoiler,setSpoiler] = useState(isSpoiler);
    const [saved,setSaved] = useState(isSaved);
    const [followed,setFollowed]=useState(isFollowed);
    const [replyNotifications,setReplyNotifications] = useState(sendReplyNotifications);
    const [myPost,setMyPost] = useState(false);

    useEffect(() => {
        async function fetchData() {
          const cookie = await getCookies();
    
          if(cookie.username === userName){
            setMyPost(true);
          }
        }
        fetchData();
      }, [token]);

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
        setVotes(upVotes);
    }, [upVotes]);

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
        const cookie = await getCookies();
        if(cookie !== null && cookie.access_token && cookie.username){
            token = (cookie.access_token);
    
          } else {
            router.push("/login")
          }
        let response;
        try{
            if(joined){
                response = await handler("/community/unsubscribe", "POST", {communityName: subRedditName}, token)
                setJoined(false);
            }else{
                response = await handler("/community/subscribe", "POST", {communityName: subRedditName}, token)
                setJoined(true);
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to join subreddit
    }

    async function handleHide() {
        const cookie = await getCookies();
        if(cookie !== null && cookie.access_token && cookie.username){
            token = (cookie.access_token);
    
          } else {
            router.push("/login")
          }
        let response;
        try {
            if(hidden){
                response = await handler(`/posts/${postId}/unhide`, "POST", "", token)
                setHidden(false);
            }else{
                response = await handler(`/posts/${postId}/hide`, "POST", "", token)
                setHidden(true)
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to hide a post
    }

    async function handleDelete () {
        const cookie = await getCookies();
        if(cookie !== null && cookie.access_token && cookie.username){
            token = (cookie.access_token);
    
          } else {
            router.push("/login")
          }
        let response;
        try {
            response = await handler(`/posts/${postId}`, "DELETE", "", token)
            setDeleted(true);
            console.log(response);
        }  catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to delete a post
    }

    async function handleUpVote(vote) {
        const cookie = await getCookies();
        if(cookie !== null && cookie.access_token && cookie.username){
            token = (cookie.access_token);
    
          } else {
            router.push("/login")
          }
        let response;
        try {
            if(vote === 1)
            {
                response = await handler(`/posts/${postId}/upvote`, "POST", "", token);
            }
            else
            {
                response = await handler(`/posts/${postId}/downvote`, "POST", "", token);
            }
            console.log(response);
            setVotes(response.votes);
        }  catch(e){
            console.error("Error fetching Data: " ,e)
        }

        //api call to upvote or down vote
    }

    async function handlePollVote(choice) {
        const cookie = await getCookies();
        if(cookie !== null && cookie.access_token && cookie.username){
            token = (cookie.access_token);
    
          } else {
            router.push("/login")
          }
        let response;
        try {
            response = await handler(`/posts/${postId}/poll/vote`, "POST", { selectedOption:choice.option}, token);
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to vote 
    }

    async function handleNSFW() {
        const cookie = await getCookies();
        if(cookie !== null && cookie.access_token && cookie.username){
            token = (cookie.access_token);
    
          } else {
            router.push("/login")
          }
        let response;
        try{
            if(NSFW){
                response = await handler(`/posts/${postId}/unnsfw`, "POST","", token)
                setNSFW(false);
            }else{
                response = await handler(`/posts/${postId}/nsfw`, "POST","", token)
                setNSFW(true);
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to invert NSFW
    }

    async function handleSpoiler() {
        const cookie = await getCookies();
        if(cookie !== null && cookie.access_token && cookie.username){
            token = (cookie.access_token);
    
          } else {
            router.push("/login")
          }
        let response;
        try{
            if(spoiler){
                response = await handler(`/posts/${postId}/unspoiler`, "POST","", token)
                setSpoiler(false);
            }else{
                response = await handler(`/posts/${postId}/spoiler`, "POST","", token)
                setSpoiler(true);
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to invert Spoiler
    }

    async function handleFollow() {
        const cookie = await getCookies();
        if(cookie !== null && cookie.access_token && cookie.username){
            token = (cookie.access_token);
    
          } else {
            router.push("/login")
          }
        let response;
        try{
            if(followed){
                response = await handler(`/users/unfollow`, "POST",{username:userName}, token)
                setFollowed(false);
            }else{
                response = await handler(`/users/follow`, "POST",{username:userName}, token)
                setFollowed(true);
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to follow or unfollow a user
    }

    async function handleReport(mainReason,subReason) {
        const cookie = await getCookies();
        if(cookie !== null && cookie.access_token && cookie.username){
            token = (cookie.access_token);
    
          } else {
            router.push("/login")
          }
        let response;
        try{
            response = await handler(`/posts/${postId}/report`, "POST", {reason: mainReason, sureason: subReason}, token);
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to report a post
    }

    async function handleBlock() {
        const cookie = await getCookies();
        if(cookie !== null && cookie.access_token && cookie.username){
            token = (cookie.access_token);
    
          } else {
            router.push("/login")
          }
        let response;
        try{
        response = await handler(`/users/block`, "POST",{username:userName}, token)
        console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to block a user
    }

    async function handleSaved () {
        const cookie = await getCookies();
        if(cookie !== null && cookie.access_token && cookie.username){
            token = (cookie.access_token);
    
          } else {
            router.push("/login")
          }
        let response;
        try{
            if(saved){
                response = await handler(`/posts/${postId}/unsave`, "POST","", token)
                setSaved(false);
            }else{
                response = await handler(`/posts/${postId}/save`, "POST","", token)
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
        <div className={styles.post} onClick={() => deleted ? "" : router.push(`/comments/${postId}`)}>
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
                    <Header postId={postId} subRedditName={subRedditName} userName={userName} subRedditPicture={subRedditPicture} showProfilePicture={true} time={time} banner={banner} subRedditDescription={subRedditDescription} subRedditRules={subRedditRules} isProfile={isProfile} cakeDate={cakeDate} isFollowed={isFollowed} onFollow={handleFollow} isMember={isMember} joined={joined} onJoin={handleJoin} myPost={myPost} isNSFW={NSFW} onNSFW={handleNSFW} isSpoiler={spoiler} onSpoiler={handleSpoiler} isSaved={saved} onSave={handleSaved} replyNotifications={replyNotifications} onReplyNotifications={handleReplyNotifications} onReport={handleReport} onBlock={handleBlock} onHide={handleHide} onDelete={handleDelete} />
                    <div className={styles.title}>{title}</div>
                    <div className={styles.content} >
                        {(!view && (isNSFW || isSpoiler) ) && <div className={styles.overlay} onClick={(e) => {e.stopPropagation();}} ></div>}
                        {(!view && (isNSFW || isSpoiler) ) && <div className={styles.viewButton} onClick={(e) => {e.stopPropagation();}} >
                            {(isNSFW && !isSpoiler ) && <Button className={styles.viewButton} name={"View NSFW content"} onClick={() => setView(true)} active={true} />}
                            {(isSpoiler && !isNSFW) && <Button className={styles.viewButton} name={"View spoiler"} onClick={() => setView(true)} active={true} />}
                            {(isSpoiler && isNSFW)  && <Button className={styles.viewButton} name={"View NSFW content & spoilers"} onClick={() => setView(true)} active={true} />}
                        </div>}
                        {displayDescription && <div className={`${styles.description} ${(!view && (isNSFW || isSpoiler)) ? styles.view : ""}`} dangerouslySetInnerHTML={{ __html: formattedDescription }} ></div>}
                        {!displayDescription && <div className={styles.media} onClick={(e) => {e.stopPropagation();}}>
                            {videos.length !== 0 &&
                                <iframe className={styles.video} title="Posted videos"
                                allowFullScreen
                                src={convertToEmbedLink(videos[0])}
                            />}
                            {(videos.length === 0 && images.length !== 0) &&       
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
                    {pollOptions.length !== 0 && <Poll isOpen={pollIsOpen} options={pollOptions} onVote={handlePollVote} pollExpiration={pollExpiration} myVote={pollVote} />}
                    <PostFooter upvote={() => handleUpVote(1)} downvote={() => handleUpVote(-1)} voteCount={votes} commentCount={comments} voteStatus={upVoteStatus} isMod={true} />
                </div>}
            </div>
        </div>
    );
};

export default Post;
