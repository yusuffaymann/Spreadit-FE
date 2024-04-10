import { useState } from "react";
import Image from 'next/image';
import styles from "./MiniaturePost.module.css";
import SubRedditInfoModal from "../components/post/SubRedditInfoModal";

function MiniaturePost ({subRedditName,subRedditPicture,subRedditDescription,subRedditBanner,postTitle,postPicture,upVotes,comments,video}) {

    const [showSubRedditInfo,setShowSubRedditInfo] = useState(false);
    const [joined,setJoined] = useState(false);
    let timeOut;

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

        <div className={styles.post} onClick={() => {console.log("redirect")}}>
            <div className={styles.content}>
                <div className={styles.body}>
                    <div className={styles.header}>
                        <div className={styles.subRedditNameAndPicture} onMouseEnter={() => setShowSubRedditInfo(true)} onMouseLeave={() => handleMouseLeave()} onClick={(e) => {e.stopPropagation();}}>
                            {showSubRedditInfo &&
                            <div className={styles.subInfo} onMouseEnter={() => clearTimeout(timeOut)} onMouseLeave={() => setShowSubRedditInfo(false)} >
                                <SubRedditInfoModal subRedditName={subRedditName} subRedditPicture={subRedditPicture} subRedditBanner={subRedditBanner} subRedditDescription={subRedditDescription} isMember={false} joined={joined} onJoin={handleJoin}/>
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
                    </div>
                    <div className={styles.title}>{postTitle}</div>
                </div>
                    {postPicture !== "" && <div className={styles.media} onClick={(e) => {e.stopPropagation();}}>
                        {!video && <Image src={postPicture} alt="posted image " fill style={{objectFit: "cover", maxWidth: "100%"}}  />}
                        {video && <video className={styles.video} title="Posted video" src={video} ></video>}
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