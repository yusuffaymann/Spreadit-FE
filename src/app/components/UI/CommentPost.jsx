import React,{ useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./CommentPost.module.css";
import Image from 'next/image'
import Header from "../post/PostHeader";
import Button from "../post/Button";
import Poll from "../post/Poll";
import PostFooter from "../post/PostFooter";
import HiddenPost from "../post/HiddenPost";
import close from "../../assets/close.svg";
import CommentInput from "./CommentInput";
import nextImage from "../../assets/right-chevron-svgrepo-com.svg"
import previousImage from "../../assets/left-chevron-svgrepo-com.svg"
import getCookies from "../../utils/getCookies";
import handler from "@/app/utils/apiHandler";

/**
 * Component for displaying the post.
 * @component
 */

function CommentPost({ postId, title, description, userName,profilePicture, subRedditName, subRedditPicture,subRedditRules, attachments,  upVotes, comments, time, banner, subRedditDescription, upVoteStatus, isProfile, cakeDate, isMember, isJoined, onJoin, isSaved, sendReplyNotifications, isSpoiler, isNSFW, pollIsOpen, pollOptions, pollExpiration, Editing }) {

    const { images, video } = attachments.reduce(
        (acc, attachment) => {
          if (attachment.type === 'image') {
            acc.images.push(attachment.link);
          } else if (attachment.type === 'video') {
            acc.video.push(attachment.link);
          }
          return acc;
        },
        { images: [], video: [] }
      );
    
    const router = useRouter();
    const temporaryToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEzMDI5MjM1fQ.ih5SD2C1dSo96CRDbUGX3E5z9mGvCh37zAGh53Y8z-M";
    const [isEditing,setIsEditing]=useState(Editing);
    const [imageIndex, setImageIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [hidden,setHidden] = useState(false);
    const [view, setView] = useState(false);
    const [deleted,setDeleted] = useState(false);
    const [myPost,setMyPost] = useState(false);
    const [votes,setVotes] = useState(upVotes);
    const [NSFW,setNSFW] = useState(isNSFW);
    const[spoiler,setSpoiler] = useState(isSpoiler);
    const [saved,setSaved] = useState(isSaved);
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
        setVotes(upVotes);
    }, [upVotes]);

    useEffect(() => {
        setReplyNotifications(sendReplyNotifications);
    }, [sendReplyNotifications]);

    async function handleHide() {
        let response;
        try {
            if(hidden){
                response = await handler(`/posts/${postId}/unhide`, "POST", "", temporaryToken)
                setHidden(false);
            }else{
                response = await handler(`/posts/${postId}/hide`, "POST", "", temporaryToken)
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
            response = await handler(`/posts/${postId}`, "DELETE", "", temporaryToken)
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
                response = await handler(`/posts/${postId}/upvote`, "POST", "", temporaryToken);
            }
            else
            {
                response = await handler(`/posts/${postId}/downvote`, "POST", "", temporaryToken);
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
            response = await handler(`/posts/${postId}/poll/vote`, "POST", {selectedOptions: choice}, temporaryToken);
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
                response = await handler(`/posts/${postId}/unnsfw`, "POST","", temporaryToken)
                setNSFW(false);
            }else{
                response = await handler(`/posts/${postId}/nsfw`, "POST","", temporaryToken)
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
                response = await handler(`/posts/${postId}/unspoiler`, "POST","", temporaryToken)
                setSpoiler(false);
            }else{
                response = await handler(`/posts/${postId}/spoiler`, "POST","", temporaryToken)
                setSpoiler(true);
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to invert Spoiler
    }

/*     async function handleFollow() {
        let response;
        try{
            if(followed){
                response = await handler(`/users/unfollow`, "POST",{username:userName},temporaryToken)
                setFollowed(false);
            }else{
                response = await handler(`/users/follow`, "POST",{username:userName}, temporaryToken)
                setFollowed(true);
            }
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to follow or unfollow a user
    } */

    async function handleReport(mainReason,subReason) {
        let response;
        try{
            response = await handler(`/posts/${postId}/report`, "POST", {reason: mainReason, sureason: subReason}, temporaryToken);
            console.log(response);
        } catch(e){
            console.error("Error fetching Data: " ,e)
        }
        //api call to report a post
    }

    async function handleBlock() {
        let response;
        try{
        response = await handler(`/users/block`, "POST",{username:userName}, temporaryToken)
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
                response = await handler(`/posts/${postId}/unsave`, "POST","", temporaryToken)
                setSaved(false);
            }else{
                response = await handler(`/posts/${postId}/save`, "POST","", temporaryToken)
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

    const onEdit= async (newcontent)=>{
        try {
            console.log(newcontent);
            const response = await handler(`/posts/${postId}/edit`, "PUT",  {content:newcontent.content} , temporaryToken);
            console.log('edit done:', response);
            description=newcontent;
            setIsEditing(false);

    } catch (error) {
        console.error('Error editing', error.message);
    }
    };


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

    const parseAndStyleLinks = (text) => {
        // Regular expression to find URLs in text
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        
        // Replace URLs with anchor tags
        const formattedText = text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
        
        return formattedText;
    }

    const formattedDescription = parseAndStyleLinks(description);

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
                    <Header postId={postId} isUser={myPost} profilePicture={profilePicture} userName={userName} showProfilePicture={true} subRedditName={subRedditName} subRedditPicture={subRedditPicture} subRedditRules={subRedditRules} time={time} banner={banner} subRedditDescription={subRedditDescription} isProfile={isProfile} isInComment={true} cakeDate={cakeDate}  isMember={isMember} joined={isJoined} onJoin={onJoin} myPost={myPost} isNSFW={NSFW} onNSFW={handleNSFW} isSpoiler={spoiler} onSpoiler={handleSpoiler} isSaved={saved} onSave={handleSaved} onReport={handleReport} onBlock={handleBlock} onHide={handleHide} onDelete={handleDelete} replyNotifications={replyNotifications} onReplyNotifications={handleReplyNotifications} onEdit={()=>setIsEditing(true)} />
                    <div className={styles.title}>{title}</div>
                    <div className={styles.content} >
                        {isEditing&& <CommentInput onComment={onEdit} close={()=>setIsEditing(false)} commentBody={description} buttonDisplay={"Save edits"} isPost={true}/>}
                        <div className={styles.postcontent}>
                        
                        {(!view&& (isNSFW||isSpoiler))&&(
                            <div className={styles.overlay}>
                                <div className={styles.viewButton} >
                            {(isNSFW && !isSpoiler ) && <Button className={styles.viewButton} name={"View NSFW content"} onClick={() => setView(true)} active={true} />}
                            {(isSpoiler && !isNSFW) && <Button className={styles.viewButton} name={"View spoiler"} onClick={() => setView(true)} active={true} />}
                            {(isSpoiler && isNSFW)  && <Button className={styles.viewButton} name={"View NSFW content & spoilers"} onClick={() => setView(true)} active={true} />}
                                </div>
                            </div>
                        )}
                        {/* {!view && <div className={styles.overlay}></div>}
                        {!view && <div className={styles.viewButton} >
                            {(isNSFW && !isSpoiler ) && <Button className={styles.viewButton} name={"View NSFW content"} onClick={() => setView(true)} active={true} />}
                            {(isSpoiler && !isNSFW) && <Button className={styles.viewButton} name={"View spoiler"} onClick={() => setView(true)} active={true} />}
                            {(isSpoiler && isNSFW)  && <Button className={styles.viewButton} name={"View NSFW content & spoilers"} onClick={() => setView(true)} active={true} />}
                        </div>} */}
                        {!isEditing&& <div className={`${styles.description} ${!view ? styles.view : ""}`} dangerouslySetInnerHTML={{ __html: formattedDescription }}></div>}
                        <div className={styles.media}>
                            {(images.length !==0) &&       
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
                            {video.length !==0 &&
                                <iframe className={styles.video} title="Posted video"
                                allowFullScreen
                                src={convertToEmbedLink(video[0])}
                            />}
                        </div>
                        </div>
                    {pollOptions.length !== 0 && <Poll isOpen={pollIsOpen} options={pollOptions} onVote={handlePollVote} pollExpiration={pollExpiration} myVote={pollVote}/>}
                    <PostFooter upvote={() => handleUpVote(1)} downvote={() => handleUpVote(-1)} voteCount={votes} voteStatus={upVoteStatus} commentCount={comments} isMod={true} />
                </div>
                </div>}
            </div>
        </div>
    );
};

export default CommentPost;
