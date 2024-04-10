import React from "react";
import styles from "./ProfileBar.module.css";
import { useRouter } from "next/navigation";

function ProfileBar({ selected, isMe, setSelected, username}) {
  const router = useRouter();
  return (
    <div className={styles.tabs}>

      <button onClick={() => {router.push(`/profile/${username}`); setSelected(0)}} className={`${styles.link} ${selected === 0 ? styles.selected : ""}`}>
        <h1 >Overview</h1>
      </button>

      <button onClick={() => {router.push(`/profile/${username}/posts`); setSelected(1)}} className={`${styles.link} ${selected === 1 ? styles.selected : ""}`}>
        <h1 >Posts</h1>
      </button>

      <button onClick={() => {router.push(`/profile/${username}/comments`); setSelected(2)}} className={`${styles.link} ${selected === 2 ? styles.selected : ""}`}>
        <h1 >
          Comments
        </h1>
      </button>

      {isMe ? <button onClick={() => {router.push(`/profile/${username}/saved`); setSelected(3)}} className={`${styles.link} ${selected === 3 ? styles.selected : ""}`}>
        <h1 >Saved</h1>
      </button> : ""}

      {isMe ? <button onClick={() => {router.push(`/profile/${username}/hidden`); setSelected(4)}} className={`${styles.link} ${selected === 4 ? styles.selected : ""}`}>
        <h1 >Hidden</h1>
      </button> : ""}

      {isMe ? <button onClick={() => {router.push(`/profile/${username}/upvoted`); setSelected(5)}} className={`${styles.link} ${selected === 5 ? styles.selected : ""}`}>
        <h1 >Upvoted</h1>
      </button> : ""}

      {isMe ? <button onClick={() => {router.push(`/profile/${username}/downvoted`); setSelected(6)}} className={`${styles.link} ${selected === 6 ? styles.selected : ""}`}>
        <h1 >Downvoted</h1>
      </button> : ""}
    </div>
  );
}

export default ProfileBar;
