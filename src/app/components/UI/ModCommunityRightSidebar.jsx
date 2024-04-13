import React, { useState } from "react";
import styles from "./ModCommunityRightSidebar.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { RulesData } from "./RulesData";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import EditCommunityModal from "./EditCommunityModal";

function ModCommunityRightSidebar({ communityName }) {
  const [showEditCommunityModal, setShowEditCommunityModal] = useState(false);
  //const [communityName, setcommunityName] = useState("Comunityname");
  const [communityDescription, setcommunityDescription] = useState(
    "Comunitydescription"
  );
  const [communityMembers, setcommunityMembers] = useState("Members");
  const [communityMembersNum, setcommunityMembersNum] = useState(11);
  const [textWidget, settextWidget] = useState("textWidget");
  const [widgetDescription, setWidgetDescription] =
    useState("widgetDescription");

  const [showDescp, setShowDescp] = useState(false);

  function toggleDropdown() {
    setShowDescp((prevShowDescp) => !prevShowDescp);
  }

  function EditCommunity() {
    setShowEditCommunityModal(true);
  }

  const CloseEditCommunity = () => {
    setShowEditCommunityModal(false);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.communityname}>
        <h1 className={styles.communitytype}>{communityName}</h1>
        <ModeEditOutlineTwoToneIcon
          className={styles.editbutton}
          onClick={() => EditCommunity()}
        />
      </div>
      <p className={styles.description}>{communityDescription}</p>

      <div className={styles.communityinfo}>
        <div className={styles.communityinfo1}>
          <h1 className={styles.nums}>{communityMembersNum}</h1>
          <p className={styles.numstitle}>{communityMembers}</p>
        </div>
      </div>

      <p className={styles.spliter}>_______________________________________</p>

      <div className={styles.communityname}>
        <h1 className={styles.sidebartitles}>RULES</h1>
        <ModeEditOutlineTwoToneIcon className={styles.editbutton} />
      </div>
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

      <div className={styles.communityname}>
        <h1 className={styles.sidebartitles}>{textWidget}</h1>
        <ModeEditOutlineTwoToneIcon className={styles.editbutton} />
      </div>
      <p className={styles.description}>{widgetDescription}</p>

      <p className={styles.spliter}>_______________________________________</p>

      <h1 className={styles.sidebartitles}>MODERATORS</h1>
      <br></br>
      <button className={styles.bookmarksbuttons}>Message the mods</button>

      <p className={styles.spliter}>_______________________________________</p>

      <div className={styles.communityname}>
        <h1 className={styles.sidebartitles}>COMMUNITY SETTINGS</h1>
        <ModeEditOutlineTwoToneIcon className={styles.editbutton} />
      </div>
      <p className={styles.description}>Community Appearance</p>
      <button
        className={styles.bookmarksbuttons}
        style={{ backgroundColor: "rgb(48, 52, 206)", color: "white" }}
      >
        Edit Widgets
      </button>

      <br></br>
      <br></br>
      <br></br>

      {showEditCommunityModal && (
        <EditCommunityModal close={() => CloseEditCommunity()} />
      )}
    </div>
  );
}

export default ModCommunityRightSidebar;
