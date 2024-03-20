// components/Bar.js
import React from "react";
import styles from "./Bar.module.css"; // Import CSS file
import Link from "next/link";

export default function Bar({ selected }) {

    return (
        <div className={styles.tabs}> 
            <Link className={styles.link} href="/account">
            <h1 className={selected === 0 ? styles.selected : ""}>Account</h1> 
            </Link>
            <Link className={styles.link} href="/profile">          
            <h1 className={selected === 1 ? styles.selected : ""}>Profile</h1> 
            </Link>
            <Link className={styles.link} href="/privacy">
            <h1 className={selected === 2 ? styles.selected : ""}>Safety & Privacy</h1>
            </Link>
            <Link className={styles.link} href="/feed">
            <h1 className={selected === 3 ? styles.selected : ""}>Feed settings</h1>
            </Link>
            <Link className={styles.link} href="/notifications">
                <h1 className={selected === 4 ? styles.selected : ""}>Notifications</h1> 
            </Link>
            <Link className={styles.link} href="/emails">
                <h1 className={selected === 5 ? styles.selected : "" }>Emails</h1>
            </Link>
            <Link className={styles.link} href="/subscriptions">
            <h1 className={selected === 6 ? styles.selected : ""}>Subscriptions</h1>
            </Link>
            <Link className={styles.link} href="/messaging">
            <h1 className={selected === 7 ? styles.selected : ""}>Chat & Messaging</h1>
            </Link>
        </div>
    );
};
