import React, { useState } from "react";
import styles from "./CommunityBoxItem.module.css";
import SubRedditInfoModal from "@/app/components/post/SubRedditInfoModal.jsx";

function CommunityBoxItem({
  count,
  name,
  category,
  members,
  icon,
  iconurl,
  description,
  key,
}) {
  let timeOut;
  const [showSubRedditInfo, setShowSubRedditInfo] = useState(false);

  async function handleMouseLeave() {
    timeOut = setTimeout(() => {
      setShowSubRedditInfo(false);
    }, 200);
  }
  return (
    <li key={key} className={styles.box}>
      <p>{count}</p>
      <div className={styles.icon}>
        {icon}
        {showSubRedditInfo && (
          <div
            onMouseEnter={() => clearTimeout(timeOut)}
            onMouseLeave={() => setShowSubRedditInfo(false)}
          >
            {" "}
            <SubRedditInfoModal
              className="modal"
              subRedditName={name}
              subRedditPicture={iconurl}
              subRedditBanner={iconurl}
              subRedditDescription={description}
            />{" "}
          </div>
        )}
      </div>{" "}
      <div>
        <div
          className={styles.name}
          onMouseEnter={() => setShowSubRedditInfo(true)}
          onMouseLeave={() => handleMouseLeave()}
        >
          {name}
        </div>
        <div className={styles.category}>{category}</div>
        <div className={styles.members}>{members}</div>
      </div>
    </li>
  );
}

export default CommunityBoxItem;
