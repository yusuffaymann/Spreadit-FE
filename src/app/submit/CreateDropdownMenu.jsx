import React, { useState, useRef, useEffect } from "react";
import DropdownCommunity from "./DropdownCommunity";
import styles from "./CreateDropdownMenu.module.css";

const handleRedirect = () => {
  // Redirect to the desired URL when the div is clicked
  window.location.href = "profile";
};

function CreateDropdownMenu({userName= "Testing",
userIcon = "https://styles.redditmedia.com/t5_7r9ed6/styles/profileIcon_ljpm97v13fpc1.jpg"}) {
  return (
    <div className={`${styles.createDropdownMenu} ${styles.DropdownMenu}`}>
      <div className={`${styles.DropdownMenuSection}`}>
        <div className={`${styles.userHeader}`}>Your profile</div>
        <div className={`${styles.menuCommunityContainer}`} onClick={handleRedirect}>
          <div className={`${styles.menuCommunity}`}>
            <div className={`${styles.userIconPosition}`}>
              <img
                alt="User avatar"
                className={`${styles.userIconRadius} ${styles.userIconIdent}
            ${styles.userIconBorder} ${styles.userIconSize}`}
                src={userIcon}
              />
            </div>
            <div className={`${styles.userNameFlex}`}>
              <span className={`${styles.userNameText}`}>u/{userName}</span>
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
        <DropdownCommunity communityMembers={1} /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity /><DropdownCommunity />
      </div>
    </div>
  );
}

export default CreateDropdownMenu