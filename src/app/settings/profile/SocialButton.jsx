import React from "react";
import styles from "./SocialButton.module.css";

function SocialButton({ choseLink, iconUrl, nameOption }) {

  const handleClick = () => {
    console.log('socialbutton');
    choseLink(12469);
  };

  return (
    <li onClick={handleClick} className={`${styles.choiceButton} ${styles.marginChoice}`}>
      <img className={styles.marginIcon} src={iconUrl}/>
      {nameOption}
    </li>
  );
}

export default SocialButton;
