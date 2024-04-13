import React from "react";
import styles from "./ProfileIcon.module.css";
import Image from "next/image";

function ProfileIcon({ url }) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.icon}
        src={url}
        alt="Profile icon"
        width={35} // Set the width of the icon
        height={35} // Set the height of the icon
        layout="fixed"
      />
    </div>
  );
}

export default ProfileIcon;
