import React, { useState, useRef, useEffect } from "react";
import DropdownCommunity from "./DropdownCommunity";
import styles from "./CreateDropdownMenu.module.css";

function CreateDropdownMenu() {
  return (
    <div className={`${styles.createDropdownMenu} ${styles.DropdownMenu}`}>
      <div className={`${styles.DropdownMenuSection}`}>
        <div className={`${styles.userHeader}`}>Your profile</div>
        <div className={`${styles.menuCommunityContainer}`}>
          <div className={`${styles.menuCommunity}`}>
            <div className={`${styles.userIconPosition}`}>
              <img
                alt="User avatar"
                className={`${styles.userIconRadius} ${styles.userIconIdent}
            ${styles.userIconBorder} ${styles.userIconSize}`}
                src="https://styles.redditmedia.com/t5_7r9ed6/styles/profileIcon_ljpm97v13fpc1.jpg?width=256&amp;height=256&amp;crop=256:256,smart&amp;s=7ea7274e9112af1a5bf84b2549d997c4c627f72b"
              />
            </div>
            <div className={`${styles.userNameFlex}`}>
              <span className={`${styles.userNameText}`}>u/Testing</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.DropdownMenuSection}`}>
        <div className={`${styles.DropdownMenuCommunityHeader}`}>
          <span className={`${styles.DropdownMenuCommunityHeaderText}`}>
            Your communities
          </span>
          <button
            role="button"
            tabIndex="0"
            className={`${styles.buttonCreateNew} ${styles.buttonCreateNewMargin}
            ${styles.buttonCreateNewText} ${styles.buttonCreateNewAlignment}`}
          >
            Create New
          </button>
        </div>
        <DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity />
      </div>
    </div>
  );
}

export default CreateDropdownMenu