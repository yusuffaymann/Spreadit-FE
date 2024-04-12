import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { SidebarData } from "./SidebarData";
import { ModData } from "./ModData";
import { RecentData } from "./RecentData";
import { CommunitiesData } from "./CommunitiesData";
import { ResourcesData } from "./ResourcesData";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CreateCommunityModal from "./CreateCommunityModal";
import CommunitySidebarItem from "./CommunitySidebarItem";

function Sidebar() {
  const [showModDropdown, setShowModDropdown] = useState(false);
  const [showRecentDropdown, setShowRecentDropdown] = useState(false);
  const [showCommunitiesDropdown, setShowCommunitiesDropdown] = useState(false);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [showCreateCommunityModal, setShowCreateCommunityModal] = useState(false);

  function toggleDropdown(dropdown) {
    switch (dropdown) {
      case "mod":
        setShowModDropdown((prevShowModDropdown) => !prevShowModDropdown);
        break;
      case "recent":
        setShowRecentDropdown(
          (prevShowRecentDropdown) => !prevShowRecentDropdown
        );
        break;
      case "communities":
        setShowCommunitiesDropdown(
          (prevShowCommunitiesDropdown) => !prevShowCommunitiesDropdown
        );
        break;
      case "resources":
        setShowResourcesDropdown(
          (prevShowResourcesDropdown) => !prevShowResourcesDropdown
        );
        break;
      default:
        break;
    }
  }

  function CreateCommunity() {
    setShowCreateCommunityModal(true);
  }

  const CloseCreateCommunity = () => {
    setShowCreateCommunityModal(false);
  };

  return (
    <div className={styles.sidebar}>
      {showCreateCommunityModal && (
        <CreateCommunityModal close={() => CloseCreateCommunity()} />
      )}
      <ul className={styles.sidebarlist}>
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className={styles.row}
              id={
                window.location.pathname == val.link
                  ? styles.active
                  : styles.notactive
              }
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div id={styles.icon}>{val.icon}</div>{" "}
              <div id={styles.title}>{val.title}</div>
            </li>
          );
        })}
      </ul>

      <p className={styles.spliter}>_____________________________</p>

      <div className={styles.dropdown} onClick={() => toggleDropdown("mod")}>
        {" "}
        <p className={styles.dropdowntitle}>MODERATION</p>
        {showModDropdown ? (
          <KeyboardArrowUpOutlinedIcon className={styles.arrowbutton} />
        ) : (
          <KeyboardArrowDownIcon className={styles.arrowbutton} />
        )}
      </div>

      <div
        className={`${styles.dropdownmenu} ${showModDropdown ? styles.active : styles.inactive}`}
      >
        <ul className={styles.sidebarlist}>
          {ModData.map((val, key) => {
            return (
              <li
                key={key}
                className={styles.row}
                id={
                  window.location.pathname == val.link
                    ? styles.active
                    : styles.notactive
                }
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div id={styles.icon}>{val.icon}</div>{" "}
                <div id={styles.title}>{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>

      <p className={styles.spliter}>_____________________________</p>

      <div className={styles.dropdown} onClick={() => toggleDropdown("recent")}>
        {" "}
        <p className={styles.dropdowntitle}>RECENT</p>
        {showRecentDropdown ? (
          <KeyboardArrowUpOutlinedIcon className={styles.arrowbutton} />
        ) : (
          <KeyboardArrowDownIcon className={styles.arrowbutton} />
        )}{" "}
      </div>

      <div
        className={`${styles.dropdownmenu} ${showRecentDropdown ? styles.active : styles.inactive}`}
      >
        <ul className={styles.sidebarlist}>
          {RecentData.map((val, key) => {
            return (
              <li
                key={key}
                className={styles.row}
                id={
                  window.location.pathname == val.link
                    ? styles.active
                    : styles.notactive
                }
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div id={styles.icon}>{val.icon}</div>{" "}
                <div id={styles.title}>{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>

      <p className={styles.spliter}>_____________________________</p>
      
      <div
        className={styles.dropdown}
        onClick={() => toggleDropdown("communities")}
      >
        {" "}
        <p className={styles.dropdowntitle}>COMMUNITIES</p>
        {showCommunitiesDropdown ? (
          <KeyboardArrowUpOutlinedIcon className={styles.arrowbutton} />
        ) : (
          <KeyboardArrowDownIcon className={styles.arrowbutton} />
        )}{" "}
      </div>

      <div
        className={`${styles.dropdownmenu} ${showCommunitiesDropdown ? styles.active : styles.inactive}`}
      >
        <ul className={styles.sidebarlist}>
          {CommunitiesData.map((val, key) => {
            return (
              <CommunitySidebarItem
                title={val.title}
                icon={val.icon}
                link={val.link}
                isfavoriteprop={val.isfavorite}
                onCreate={CreateCommunity}
                key={key}
              />
            );
          })}
        </ul>
      </div>


      <p className={styles.spliter}>_____________________________</p>

      <div
        className={styles.dropdown}
        onClick={() => toggleDropdown("resources")}
      >
        {" "}
        <p className={styles.dropdowntitle}>RESOURCES</p>
        {showResourcesDropdown ? (
          <KeyboardArrowUpOutlinedIcon className={styles.arrowbutton} />
        ) : (
          <KeyboardArrowDownIcon className={styles.arrowbutton} />
        )}{" "}
      </div>

      <div
        className={`${styles.dropdownmenu} ${showResourcesDropdown ? styles.active : styles.inactive}`}
      >
        <ul className={styles.sidebarlist}>
          {ResourcesData.map((val, key) => {
            return (
              <li
                key={key}
                className={styles.row}
                id={
                  window.location.pathname == val.link
                    ? styles.active
                    : styles.notactive
                }
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div id={styles.icon}>{val.icon}</div>{" "}
                <div id={styles.title}>{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
