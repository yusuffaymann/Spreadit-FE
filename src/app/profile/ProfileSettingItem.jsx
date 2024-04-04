import React from "react";
import Image from "next/image";
import PillButton from "../components/UI/PillButton";
import styles from "./ProfileSettingItem.module.css";

function ProfileSettingItem({ title, description, image, isSvg, onClick, buttonText }) {
    return (
        <li className={styles.settings_item_container} role="presentation">
                <div className={styles.settings_item}>
                    <span className={styles.settings_item_info}>
                        {isSvg ? <Image src={image} alt="setting icon" width={24} height={24} /> 
                        : <Image src={image} alt="profile picture" width={32} height={32} className={styles.icons}/>}
                        <span className={styles.title_container}>
                            <span className={styles.title}>{title}</span>
                            <span className={styles.description}>{description}</span>
                        </span>
                    </span>

                    <PillButton text={buttonText}  onClick={onClick} />
                </div>
        </li>
    )
}

export default ProfileSettingItem;