import Image from 'next/image'
import Link from "next/link";
import plusicon from "../../assets/plus-circle.svg"
import dashicon from "../../assets/dash-circle.svg"
import chaticon from "../../assets/chat-dots.svg" 
import cakeicon from "../../assets/cake.svg" 
import styles from "./ProfileInfoModal.module.css"

function ProfileInfoModal ({userName, profilePicture,  cakeDate, isfollowed, onFollow}) {
    return (
        <div className={styles.modal} onClick={(e) => {e.stopPropagation();}} >
            <div className={styles.nameAndPicture}>
                <img className={styles.profilePicture}
                    src={profilePicture}
                    width={256}
                    height={256}
                    alt="The profile picture "
                    quality={100}
                />
                <div className={styles.userinfo}>
                    <div className={styles.userName}>{userName}</div>
                    <div className={styles.Description}>u/{userName}</div>
                    <div className={styles.date}>
                    <Image src={cakeicon} alt="cake icon" className={styles.icons} />
                    {cakeDate}
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                {!isfollowed&&(
                    <div className={styles.followButton} onClick={onFollow} >
                        <Image src={plusicon} alt="plus icon" className={styles.icons} />
                        <p className={styles.buttondescription}>Follow</p>
                    </div>
                )}
                {isfollowed&&(
                    <div className={styles.followButton} onClick={onFollow} >
                        <Image src={dashicon} alt="dash icon" className={styles.icons} />
                        <p className={styles.buttondescription}>Unfollow</p>
                    </div>
                )}
                <Link className={styles.link} href="/chats">
                    <div className={styles.followButton} >
                        <Image src={chaticon} alt="chat icon" className={styles.icons} />
                        <p className={styles.buttondescription}>Chat</p>
                    </div>
                </Link>
            </div>
                
        </div>
    );


}

export default ProfileInfoModal;
