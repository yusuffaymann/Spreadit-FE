import React, { useState } from "react";
import { RulesData } from "./RulesData";
import styles from "./CommunityRightSidebar.module.css";
import RulesRightSidebarItem from "./RulesRightSidebarItem";

function CommunityRightSidebar({communityData}) {


  return (
    <div className={styles.sidebar}>
      <h1 className={styles.communitytype}>{communityData.category}</h1>
      <p className={styles.description}>{communityData.description}</p>

      <div className={styles.communityinfo}>
        <div className={styles.communityinfo1}>
          <h1 className={styles.nums}>{communityData.membersCount}</h1>
          <p className={styles.numstitle}>Members</p>
        </div>
        <div className={styles.communityinfo2}>
          <h1 className={styles.nums}>{1}</h1>
          <p className={styles.numstitle}>Rank by size</p>
        </div>
      </div>

      <p className={styles.spliter}>_______________________________________</p>

      <h1 className={styles.sidebartitles}>COMMUNITY BOOKMARKS</h1>
      <button className={styles.bookmarksbuttons}>Rules</button>
      <button className={styles.bookmarksbuttons}> Related Subspreadits</button>
      <button className={styles.bookmarksbuttons}>Discord</button>

      <p className={styles.spliter}>_______________________________________</p>

      <h1 className={styles.sidebartitles}>RULES</h1>
      <br></br>
      <div>
        <ul className={styles.sidebarlist}>
          {communityData.rules.map((val, key) => {
            return (
              <RulesRightSidebarItem
                title={val.title}
                description={val.description}
                key={key}
                count={key + 1}
              />
            );
          })}
        </ul>
      </div>

      <p className={styles.spliter}>_______________________________________</p>

      <h1 className={styles.sidebartitles}>SUBSPREADIT LINKS</h1>
      <br></br>
      <button className={styles.bookmarksbuttons}>Full list of rules</button>
      <button className={styles.bookmarksbuttons}>
        {" "}
        Our related subspreadits
      </button>
      <button className={styles.bookmarksbuttons}>Subspreadits Discord</button>
      <button className={styles.bookmarksbuttons}>
        Subspreadits of the week
      </button>
      <button className={styles.bookmarksbuttons}>Contact Moderators</button>

      <p className={styles.spliter}>_______________________________________</p>

      <h1 className={styles.sidebartitles}>MODERATORS</h1>
      <br></br>
      <button className={styles.bookmarksbuttons}>Message the mods</button>
      <button className={styles.bookmarksbuttons}>View all moderators</button>

      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default CommunityRightSidebar;
