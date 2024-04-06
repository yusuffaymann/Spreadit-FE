import React from "react";
import styles from "./ProfileBar.module.css";

function ProfileBar({ selected, isMe}) {
  return (
    <div className={styles.tabs}>

      <button className={`${styles.link} ${selected === 0 ? styles.selected : ""}`}>
        <h1 >Overview</h1>
      </button>

      <button className={`${styles.link} ${selected === 1 ? styles.selected : ""}`}>
        <h1 >Posts</h1>
      </button>

      <button className={`${styles.link} ${selected === 2 ? styles.selected : ""}`}>
        <h1 >
          Comments
        </h1>
      </button>

      {isMe ?? <button className={`${styles.link} ${selected === 3 ? styles.selected : ""}`}>
        <h1 >Saved</h1>
      </button>}

      {isMe ?? <button className={`${styles.link} ${selected === 4 ? styles.selected : ""}`}>
        <h1 >Hidden</h1>
      </button>}

      {isMe ?? <button className={`${styles.link} ${selected === 5 ? styles.selected : ""}`}>
        <h1 >Upvoted</h1>
      </button>}

      {isMe ?? <button className={`${styles.link} ${selected === 6 ? styles.selected : ""}`}>
        <h1 >Downvoted</h1>
      </button>}
    </div>
  );
}

export default ProfileBar;
