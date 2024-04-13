import React, { useState, useRef, useEffect } from "react";
import styles from "./DropdownCommunity.module.css";

function DropdownCommunity() {
  return (
    <div className={`${styles.menuCommunityContainer}`}>
          <div className={`${styles.menuCommunity}`}>
            <img
              alt="Subreddit Icon"
              role="presentation"
              style={{ backgroundColor: "rgb(252, 71, 30)" }}
              className={`${styles.menuCommunityIcon}`}
              src="https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png?width=256&amp;s=897f8538fb9de5be72e13970788816a27cd7bd0e"
            />
            <div className={`${styles.menuCommunityDetailsFlex}`}>
              <span className={`${styles.menuCommunityDetailsTitle}`}>
                r/announcements
              </span>
              <span className={`${styles.menuCommunityDetailsMembers}`}>
                0 members
              </span>
            </div>
          </div>
        </div>
  )
}

export default DropdownCommunity