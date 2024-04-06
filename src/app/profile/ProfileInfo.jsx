import React from "react";
import Image from "next/image";
import styles from "./ProfileInfo.module.css";
import PostDropDownMenu from "../components/post/PostDropDownMenu";
import PostDropDownItem from "../components/post/PostDropDownItem";

import PostOptionsImage from "@/app/assets/three-dots-menu.svg"
import follow from "@/app/assets/follow.svg"
import unfollow from "@/app/assets/unfollow.svg"
import comments from "@/app/assets/post-images/comments.svg"
import shareArrow from "@/app/assets/shareArrow.svg"
import blockIcon from "@/app/assets/block.svg"
import reportIcon from "@/app/assets/post-images/report.svg"

function ProfileInfo() {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isFollowed, setIsFollowed] = React.useState(false);

  function toggleDropdown() {
    setShowDropdown(prevShowDropdown => !prevShowDropdown);
  }

  function toggleFollow(){
    setIsFollowed(prevIsFollowed => !prevIsFollowed);
  }
  return (
      <div className={styles.info}>
        <div className={styles.username_container}>
          <h2>Username</h2>
          <div className={styles.circle} onClick={toggleDropdown}>
            <Image src={PostOptionsImage} width={12} height={12} alt="Post Options" />

            <PostDropDownMenu showDropdown={showDropdown} setShowDropDown={setShowDropdown} > 
                <PostDropDownItem icon={shareArrow} iconAlt="Share Icon" description="Share" /> 
                <PostDropDownItem icon={comments} iconAlt="Message Icon" description="Send a Message" />
                <PostDropDownItem icon={blockIcon} iconAlt="Block Icon" description="Block Account" />
                <PostDropDownItem icon={reportIcon} iconAlt="Report Icon" description="Report Account" />
            </PostDropDownMenu>

          </div>
        </div>

        <div className={styles.action_buttons}>
            <button className={(isFollowed ? styles.btn : styles.blue)} onClick={toggleFollow}>
                <Image src={(isFollowed ? unfollow : follow)} alt="Follow/Unfollow image" width={16} height={16} />
                <span>{(isFollowed ? "Unfollow" : "Follow")}</span>
            </button>

            <button className={styles.btn} >
                <Image src={comments} alt="comments image" width={16} height={16} />
                <span>Message</span>
            </button>
        </div>

        <div className={styles.stats_container}>
          <div className={styles.stats}>
            <p className={styles.stats_value}>4</p>
            <p className={styles.stats_description}>Karma</p>
          </div>

          <div className={styles.stats}>
            <p className={styles.stats_value}>Feb 19, 2024</p>
            <p className={styles.stats_description}>Cake Day</p>
          </div>
        </div>

      </div>
  );
}

export default ProfileInfo;