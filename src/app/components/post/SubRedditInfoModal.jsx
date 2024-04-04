import Image from 'next/image'
import styles from "./SubRedditInfoModal.module.css"
import Button from './Button';

function SubRedditInfoModal ({subRedditBanner, subRedditPicture, subRedditName, subRedditDescription, isMember, joined, handleJoin}) {

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
                {!isMember &&
                    <div className={styles.joinButton} >
                        {!joined && <Button className={styles.myButton} name={"Join"} onClick={() => handleJoin()} active={true} />}
                        {joined && <Button className={styles.myButton} name={"Leave"} onClick={() => handleJoin()} active={true} />}
                    </div>
                }
            </div>
            <div className={styles.subRedditDescription}>{subRedditDescription}</div>
        </div>
    );


}

export default SubRedditInfoModal;