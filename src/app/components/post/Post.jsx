import React from "react";
import styles from "./Post.module.css";
import Image from 'next/image'
import { useState } from "react";
import Header from "./PostHeader";
import nextImage from "../../assets/right-chevron-svgrepo-com.svg"
import previousImage from "../../assets/left-chevron-svgrepo-com.svg"
import PostFooter from "./PostFooter";

/**
 * Component for displaying the post.
 * @component
 */

function Post({ title, description, subRedditName, subRedditPicture, video, images, upVotes, comments, time }) {

    const displayDescription = (video===undefined && images===undefined) ? true : false;
    const [imageIndex, setImageIndex] = useState(0);

    return (
        <div className={styles.post}>
            <div className={styles.body}>
                <Header subRedditName={subRedditName} subRedditPicture={subRedditPicture} time={time} />
                <div className={styles.title}>{title}</div>
                {displayDescription && <div className={styles.description}>{description}</div>}
                <div className={styles.media}>
                    {video !== undefined &&
                        <iframe className={styles.video} title="Posted video"
                        allowFullScreen
                        src={video}
                    />}
                    {(video === undefined && images !==undefined) &&       
                        <div className={styles.image} >
                            <div className={styles.backgroundImage} style={{backgroundImage: `url(${images[imageIndex]})`}}></div>
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
                        </div>
                    }
                </div>
                <PostFooter />
            </div>
        </div>
    );
};

export default Post;
