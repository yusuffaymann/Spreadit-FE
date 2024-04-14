import { useState,useEffect } from 'react';
import Image from 'next/image'
import Link from "next/link";
import plusicon from "../../assets/plus-circle.svg"
import dashicon from "../../assets/dash-circle.svg"
import chaticon from "../../assets/chat-dots.svg" 
import cakeicon from "../../assets/cake.svg" 
import styles from "./ProfileInfoModal.module.css"
import getCookies from '@/app/utils/getCookies'; 
import handler from "@/app/utils/apiHandler";
import { useRouter } from "next/navigation";

function ProfileInfoModal ({userName,isUser, profilePicture,  cakeDate}) {
    const router = useRouter();
    const temporaryToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEzMDI5MjM1fQ.ih5SD2C1dSo96CRDbUGX3E5z9mGvCh37zAGh53Y8z-M";
    const [isFollowed,setIsFollowed]=useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
          const cookie = await getCookies();
          if(cookie&&cookie.username){
            if(cookie.username !== userName){
                setLoading(true);
                const response=await handler(`/users/isfollowed/${userName}`,"GET", "",temporaryToken);
                setIsFollowed(response.isFollowed);
                setLoading(false);
            }
          }
          
            
        }
        fetchData();
      }, []);

      const handleFollow=async()=> {
        try {
            if(!isFollowed){
                const response = await handler(`/users/follow`, "POST",{username:userName}, temporaryToken);
                console.log(response);
            }
            else{
                const response = await handler(`/users/unfollow`, "POST",{username:userName}, temporaryToken);
                console.log(response);
            }
            setIsFollowed(!isFollowed);
          } catch (error) {
            console.error('Error toggling follow :', error);
          }
    }

    return (
        <div className={styles.modal} onClick={(e) => {e.stopPropagation();}} >
            {!loading&&
            <div onClick={() => {router.push(`/profile/${userName}`)}}>
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
            {!isUser&&
            <div className={styles.buttons}>
                {!isFollowed&&(
                    <div className={styles.followButton} onClick={handleFollow} >
                        <Image src={plusicon} alt="plus icon" className={styles.icons} />
                        <p className={styles.buttondescription}>Follow</p>
                    </div>
                )}
                {isFollowed&&(
                    <div className={styles.followButton} onClick={handleFollow} >
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
            </div> } 
            </div>} 
            {loading&&<p className={styles.loading}>loading</p>}             
        </div>
    );


}

export default ProfileInfoModal;
