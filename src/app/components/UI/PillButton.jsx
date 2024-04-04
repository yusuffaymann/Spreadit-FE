import React from "react";
import Image from "next/image";
import styles from "./PillButton.module.css"

function PillButton({text, Image, onClick}) {
    return (
        <button className={styles.btn} onClick={onClick}>
            <Image width={16} height={16} src={Image} alt="Comments Icon"/>
            <span>{text}</span>
        </button>
    );
}

export default PillButton;