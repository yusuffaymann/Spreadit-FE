import React from "react";
import styles from "./Switch.module.css"; // Import CSS module

export default function Toogle(props) {

    const optionClassName = props.disabled ? styles.disabledOption : "";

    return (
        <div className={`${styles.option} ${optionClassName}`}>
            <div className={styles.data}>
            <h1 className={styles.optionName}>{props.optionTitle}</h1>
            <h2 className={styles.optionDescription}>{props.optionDescription}</h2>
            </div>
            <label className={styles.switch}>
                <input type="checkbox" checked={props.isToggled} onChange={props.onToggle} disabled={props.disabled} />
                <span className={styles.slider} />
            </label>
        </div>
    );
};

