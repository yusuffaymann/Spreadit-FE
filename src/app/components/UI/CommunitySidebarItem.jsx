import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/navigation";

function CommunitySidebarItem({
  title,
  icon,
  link,
  isfavoriteprop,
  key,
  onCreate,
}) {
  const [isFavorite, setIsFavorite] = useState(isfavoriteprop);
  const router = useRouter();

  const handleStarClick = (event) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleItemClick = () => {
    if (link === "create") {
      onCreate();
    } else {
      router.push(`/community/${link}`);
    }
  };

  return (
    <div className={styles.click} onClick={handleItemClick}>
      <li
        key={key}
        className={styles.row}
        id={window.location.pathname == link ? styles.active : styles.notactive}
      >
        <div id={styles.icon}>{icon}</div> <div id={styles.title}>{title}</div>
        {link !== "create" && (
          <div onClick={handleStarClick}>
            {" "}
            {isFavorite ? <StarIcon /> : <StarOutlineOutlinedIcon />}
          </div>
        )}
      </li>
    </div>
  );
}

export default CommunitySidebarItem;
