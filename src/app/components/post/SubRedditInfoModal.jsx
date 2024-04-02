import Image from 'next/image'
import styles from "./SubRedditInfoModal.module.css"

function SubRedditInfoModal ({subRedditBanner, subRedditPicture, subRedditName, subRedditDescription}) {

    return (
        <div className={styles.modal} >
            {subRedditBanner && 
            <div className={styles.banner} >
                <Image 
                    src={subRedditBanner}
                    fill 
                    style={{objectFit: "cover", maxWidth: "100%"}}
                    alt="The subReddit banner "
                    quality={100} 
                />
            </div>}
            <div className={styles.subRedditNameAndPicture}>
                <Image className={styles.subRedditPicture}
                    src={subRedditPicture}
                    width={256}
                    height={256}
                    alt="The subReddit picture "
                    quality={100}
                />
                <div className={styles.subRedditName}>{subRedditName}</div>
            </div>
            <div className={styles.subRedditDescription}>{subRedditDescription}</div>
        </div>
    );


}

export default SubRedditInfoModal;