import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarIcon from "@mui/icons-material/Star";

function CommunitySidebarItem({
  title,
  icon,
  link,
  isfavoriteprop,
  key,
  onCreate,
}) {
  const [isFavorite, setIsFavorite] = useState(isfavoriteprop);

  return (
    <li
      key={key}
      className={styles.row}
      id={window.location.pathname == link ? styles.active : styles.notactive}
      onClick={() => {
        if (link == "create") {
          onCreate();
        } else {
          //window.location.pathname = link;
        }
      }}
    >
      <div id={styles.icon}>{icon}</div> <div id={styles.title}>{title}</div>
      {link != "create" ? (
        !isFavorite ? (
          <StarOutlineOutlinedIcon onClick={() => setIsFavorite(!isFavorite)} />
        ) : (
          <StarIcon onClick={() => setIsFavorite(!isFavorite)} />
        )
      ) : (
        ""
      )}
    </li>
  );
}

export default CommunitySidebarItem;
