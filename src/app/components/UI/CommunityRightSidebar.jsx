import React, { useState } from "react";
import { RulesData } from "./RulesData";
import styles from "./CommunityRightSidebar.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

function CommunityRightSidebar() {
  const [showRulesModal, setShowRulesModal] = useState(false);

  const [communityData, setCommunityData] = useState({
    communityType: "A subreddit for cute and cuddly pictures",
    description:
      "Things that make you go AWW! -- like puppies, bunnies, babies, and so on... Feel free to post original pictures and videos of cute things.",
    members: "36M",
    rankbysize: "5",
  });
  const [showDescp, setShowDescp] = useState(false);

  function toggleDropdown() {
    setShowDescp((prevShowDescp) => !prevShowDescp);
  }

  return (
    <div className={styles.sidebar}>
      <h1 className={styles.communitytype}>{communityData.communityType}</h1>
      <p className={styles.description}>{communityData.description}</p>

      <div className={styles.communityinfo}>
        <div className={styles.communityinfo1}>
          <h1 className={styles.nums}>{communityData.members}</h1>
          <p className={styles.numstitle}>Members</p>
        </div>
        <div className={styles.communityinfo2}>
          <h1 className={styles.nums}>{communityData.rankbysize}</h1>
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
        <ol className={styles.sidebarlist}>
          {RulesData.map((val, key) => {
            return (
              <div className={`${styles.dropdownmenu} $`}>
                <li key={key} onClick={() => toggleDropdown()}>
                  {showDescp ? (
                    <>
                      <div className={styles.dropdown}>
                        <p className={styles.dropdowntitle}>{val.title}</p>
                        <KeyboardArrowUpOutlinedIcon
                          className={styles.arrowbutton}
                        />
                      </div>
                      <p>{val.description}</p>
                    </>
                  ) : (
                    <div className={styles.dropdown}>
                      <p className={styles.dropdowntitle}>{val.title}</p>
                      <KeyboardArrowDownIcon className={styles.arrowbutton} />
                    </div>
                  )}
                </li>
              </div>
            );
          })}
        </ol>
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
