import React, { useState, useRef, useEffect } from "react";
import styles from "./DropdownCommunity.module.css";

function DropdownCommunity({communityName = "announcements",
communityIcon = "https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png",
communityMembers = 0}) {
  const handleRedirect = () => {
    // Redirect to the desired URL when the div is clicked
    window.location.href = `https://www.reddit.com/r/${communityName}`;
  };

  return (
    <div
      className={`${styles.menuCommunityContainer}`}
      onClick={handleRedirect}
      // Adding tabIndex={0} to make the div focusable
      tabIndex={0}
      role="link"
    >
          <div className={`${styles.menuCommunity}`}>
            <img
              alt="Subreddit Icon"
              role="presentation"
              style={{ backgroundColor: "rgb(252, 71, 30)" }}
              className={`${styles.menuCommunityIcon}`}
              src={communityIcon}
            />
            <div className={`${styles.menuCommunityDetailsFlex}`}>
              <span className={`${styles.menuCommunityDetailsTitle}`}>
                r/{communityName}
              </span>
              <span className={`${styles.menuCommunityDetailsMembers}`}>
                {communityMembers} {communityMembers === 1 ? "member" : "members"}
              </span>
            </div>
          </div>
        </div>
  )
}

export default DropdownCommunity