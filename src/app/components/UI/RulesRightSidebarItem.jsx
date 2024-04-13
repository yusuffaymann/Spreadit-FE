import React, { useState } from "react";
import styles from "./CommunityRightSidebar.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

function RulesRightSidebarItem({ title, description, key, count }) {
  const [showDescp, setShowDescp] = useState(false);

  function toggleDropdown() {
    setShowDescp((prevShowDescp) => !prevShowDescp);
  }

  return (
    <div className={`${styles.dropdownmenu} $`}>
      <li
        key={key}
        onClick={() => toggleDropdown()}
        className={`${styles.row} $`}
      >
        {" "}
        {showDescp ? (
          <>
            <div className={styles.dropdown}>
              <p className={styles.dropdowntitle}>{count}</p>

              <p className={styles.dropdowntitle}>{title}</p>
              <KeyboardArrowUpOutlinedIcon className={styles.arrowbutton} />
            </div>
            <p>{description}</p>
          </>
        ) : (
          <div className={styles.dropdown}>
            <p className={styles.dropdowntitle}>{count}</p>

            <p className={styles.dropdowntitle}>{title}</p>
            <KeyboardArrowDownIcon className={styles.arrowbutton} />
          </div>
        )}
      </li>
    </div>
  );
}

export default RulesRightSidebarItem;
