import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import styles from "./MiniaturePost.module.css";
import SubRedditInfoModal from "../components/post/SubRedditInfoModal";
import spoilerIcon from "../assets/post-images/mod-icons/spoiler.svg";
import nsfwIcon from "../assets/post-images/mod-icons/nsfw.svg";

function MiniaturePost ({postId,subRedditName,subRedditPicture,subRedditDescription,subRedditBanner,postTitle,attachments,upVotes,comments,isNSFW,isSpoiler,isMember}) {

    const router = useRouter();
    const [showSubRedditInfo,setShowSubRedditInfo] = useState(false);
    const [joined,setJoined] = useState(false);
    let timeOut;

    const { postPictures, videos } = attachments.reduce(
        (acc, attachment) => {
          if (attachment.type === 'image') {
            acc.postPictures.push(attachment.link);
          } else if (attachment.type === 'video') {
            acc.videos.push(attachment.link);
          }
          return acc;
        },
        { postPictures: [], videos: [] }
      );

    function convertToEmbedLink(videosLink) {
        // Regular expression to check if the link is a YouTube link
        const youtubeRegex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    
        if (youtubeRegex.test(videosLink)) {
            // If it's a YouTube link, replace "watch" with "embed"
            return videosLink.replace("/watch?v=", "/embed/");
        } else {
            // If it's not a YouTube link, return the original link
            return videosLink;
        }
    }

    function handleJoin() {
        setJoined(!joined);
        //api call to join subreddit
    }


    async function handleMouseLeave() {
        timeOut = setTimeout(() => {
            setShowSubRedditInfo(false);     
        }, 200);
    }

    return(

        <div className={styles.post} onClick={() => router.push(`/comments/${postId}?isEditing=${false}`)}>
            <div className={styles.content}>
                <div className={styles.body}>
                    <div className={styles.header}>
                        <div className={styles.subRedditNameAndPicture} onMouseEnter={() => setShowSubRedditInfo(true)} onMouseLeave={() => handleMouseLeave()} onClick={(e) => {e.stopPropagation();router.push(`/community/${subRedditName}`)}}>
                            {showSubRedditInfo &&
                            <div className={styles.subInfo} onMouseEnter={() => clearTimeout(timeOut)} onMouseLeave={() => setShowSubRedditInfo(false)} >
                                <SubRedditInfoModal subRedditName={subRedditName} subRedditPicture={subRedditPicture} subRedditBanner={subRedditBanner} subRedditDescription={subRedditDescription} isMember={isMember} joined={joined} onJoin={handleJoin}/>
                            </div>}
                            <img className={styles.subRedditPicture}
                                src={subRedditPicture}
                                width={256}
                                height={256}
                                alt="The subReddit picture "
                                quality={100}
                            />
                            <div className={styles.subRedditName}>{`r/${subRedditName}`}</div>
                        </div>  
                    </div>
                    <div className={styles.title}>{postTitle}</div>
                </div>
                {(postPictures.length !== 0 || videos.length !== 0 ) && <div className={styles.media} onClick={(e) => {e.stopPropagation();}} >
                        {(isSpoiler || isNSFW) && <div className={styles.overlay} onClick={(e) => {e.stopPropagation();}} ></div>}
                        <div className={styles.warningIcon} onClick={(e) => {e.stopPropagation();}} >
                            {isNSFW && <Image 
                                        src={nsfwIcon}
                                        width={36}
                                        height={36} 
                                        viewBox="0 0 20 20"
                                        alt="NSFW" />}
                            {(isSpoiler && !isNSFW) && <Image 
                                        src={spoilerIcon}
                                        width={36}
                                        height={36} 
                                        viewBox="0 0 20 20"
                                        alt="Spoiler" />}
                            </div>
                        <div>
                            {videos.length === 0 && <Image src={postPictures[0]} alt="posted image " fill style={{objectFit: "cover", maxWidth: "100%"}}  />}
                            {videos.length !==0 && <video className={styles.video} title="Posted videos" src={convertToEmbedLink(videos[0])}  ></video>}
                        </div>
                    </div>}
                </div>
            <div className={styles.footer}>
                {upVotes !== 0 && <div className={styles.upvotes}> {`${upVotes} upvotes`} </div>}
                {(upVotes !== 0 && comments !== 0) && <div>•</div>}
                {comments !== 0 && <div className={styles.comments}>{`${comments} comments`}</div>}
            </div>
        </div>






        
    );

}

export default MiniaturePost;