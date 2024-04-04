import React from "react";
import styles from "./PillButton.module.css"
import Image from "next/image";

function PillButton({text, image, onClick}) {
    return (
        <>
            <button className={styles.btn} onClick={onClick}>
                {image && <Image src={image} alt="button image" width={16} height={16} />}
                <span>{text}</span>
            </button>
        </>
    );
}

export default PillButton;