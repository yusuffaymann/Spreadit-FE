import React, { useState, useRef, useEffect } from "react";
import DropdownCommunity from "./DropdownCommunity";
import styles from "./CreateDropdownMenu.module.css";
import CreateCommunityModal from "../components/UI/CreateCommunityModal";
import awwpfp from "@/app/assets/awwpfp.jpg";
import { useRouter } from "next/navigation";

function CreateDropdownMenu({
  userName = "Testing",
  userIcon = "https://styles.redditmedia.com/t5_7r9ed6/styles/profileIcon_ljpm97v13fpc1.jpg",
  setCommunity,
  communities
}) {
  const router = useRouter()

    
  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState(awwpfp);

  const handleRedirect = () => {
    // Redirect to the desired URL when the div is clicked
    window.location.href = "profile";
  };

  function CreateCommunity() {
    setShowCreateCommunityModal(true);
  }

  const CloseCreateCommunity = () => {
    setShowCreateCommunityModal(false);
  };

  return (
    <div className={`${styles.createDropdownMenu} ${styles.DropdownMenu}`}>
      {showCreateCommunityModal && (
        <CreateCommunityModal close={() => CloseCreateCommunity()} />
      )}
      <div className={`${styles.DropdownMenuSection}`}>
        <div className={`${styles.userHeader}`}>Your profile</div>
        <div
          className={`${styles.menuCommunityContainer}`}
          onClick={handleRedirect}
        >
          <div className={`${styles.menuCommunity}`}>
            <div className={`${styles.userIconPosition}`}>
              <img
                alt="User avatar"
                className={`${styles.userIconRadius} ${styles.userIconIdent}
            ${styles.userIconBorder} ${styles.userIconSize}`}
                src={avatar}
              />
            </div>
            <div className={`${styles.userNameFlex}`}>
              <span className={`${styles.userNameText}`}>u/{username}</span>
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
            onClick={CreateCommunity}
          >
            Create New
          </button>
        </div>
        {console.log(communities) ?? communities.map((communityObj) => {
          return (
            <DropdownCommunity communityName={communityObj.name} communityMembers={communityObj.membersCount} setCommunity={setCommunity}/>
          )
        })}
      </div>
    </div>
  );
}

export default CreateDropdownMenu