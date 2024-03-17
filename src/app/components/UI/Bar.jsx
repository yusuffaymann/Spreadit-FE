// components/Bar.js
import React from "react";
import styles from "./Bar.module.css"; // Import CSS file
import Link from "next/link";

export default function Bar({ selected, handleSelect }) {

    return (
        <div className={styles.tabs}> 
            <h1 className={selected === 0 ? styles.selected : ""} /* onClick={() => handleSelect(0)} */>Account</h1> 
            <h1 className={selected === 1 ? styles.selected : ""} /* onClick={() => handleSelect(1)} */>Profile</h1> 
            <h1 className={selected === 2 ? styles.selected : ""} /* onClick={() => handleSelect(2)} */>Safety & Privacy</h1>
            <h1 className={selected === 3 ? styles.selected : ""} /* onClick={() => handleSelect(3)} */>Feed settings</h1> 
            <Link href="/notifications">
                <h1 className={selected === 4 ? styles.selected : ""} /* onClick={() => handleSelect(4)} */>Notifications</h1> 
            </Link>
            <Link href="/emails">
                <h1 className={selected === 5 ? styles.selected : "" } /* onClick={() => handleSelect(5)} */>Emails</h1>
            </Link>
            <h1 className={selected === 6 ? styles.selected : ""} /* onClick={() => handleSelect(6)} */>Subscriptions</h1>
            <h1 className={selected === 7 ? styles.selected : ""} /* onClick={() => handleSelect(7)} */>Chat & Messaging</h1>
        </div>
    );
};
