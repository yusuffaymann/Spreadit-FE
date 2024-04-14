import React,{useState} from "react";
import Image from "next/image";
import Link from "next/link";
import messageicon from "../../assets/envelope.svg"
import Changebutton from "./Changebutton"
import handler from "@/app/utils/apiHandler";
import styles from "./RightCommentsSidebar.module.css"
import { useRouter } from "next/navigation";

const rightCommentsSidebar=({name,description,members,rules,isJoined, onJoin,moderators})=>{
    const router = useRouter();
     return(
        <div className={styles.rightsidebar}>
            <div className={styles.sectioninfo}>
                {!isJoined&&(<Changebutton type={name} description="" display="join" activate={onJoin} />)}
                {isJoined&&(<Changebutton type={name} description="" display="joined" activate={onJoin} />)}
                <h1 className={styles.title} onClick={() => {router.push(`/community/${name}`)}}>{name}</h1>
                <p className={styles.description}>{description}</p>
                <h1 className={styles.title}>{members}</h1>
                <p className={styles.description}>Members</p>
            </div>
            <div className={styles.sectioninfo}>
                <p className={styles.description}>RULES</p>
                <ol className={styles.orderedlist}>
                    {rules.map((rule, index) => (
                    <li className={styles.listitem} key={index} >
                        {rule.title}
                    </li>
                    ))}
                </ol>
            </div>
            <div className={styles.sectioninfo}>
                <p className={styles.description}>MODERATORS</p>
                {moderators.map((moderator)=>(
                    <div className={styles.moderatorinfo}>
                        <img className={styles.profilePicture} 
                        alt="Profile Picture"
                        src={moderator.profilePicture} 
                        />
                    <span>{moderator.userName}</span>
                </div>
                ))}
                <Link className={styles.link} href="/sendmessages">
                    <div className={styles.messagebutton} >
                        <Image src={messageicon} alt="message icon" className={styles.icons} />
                        <p className={styles.buttontext}>Message the Mods</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default rightCommentsSidebar;