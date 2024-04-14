import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/navigation";
import getCookies from "@/app/utils/getCookies";
import handler from "@/app/utils/apiHandler";

function CommunitySidebarItem({
  title,
  icon,
  key,
  onCreate,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (title === "Create a Community") {
        return;
      }
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token) {
        router.push("/login");
      }

      const isFavoriteData = await handler(
        `/community/is-favourite?communityName=${title}`,
        "GET",
        "",
        cookies.access_token
      );
      console.log(`favorite Data: ${isFavoriteData.isFavourite}`);
      setIsFavorite(isFavoriteData.isFavourite);
    }
    fetchData();
  }, [])

  const handleStarClick = async (event) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    const cookies = await getCookies();
    if (cookies === null || !cookies.access_token) {
      router.push("/login");
    }
    const respone = isFavorite 
    ? await handler(
      `/community/remove-favourite`,
      "POST",
      {communityName: title},
      cookies.access_token
    ) 
    : await handler(
      `/community/add-to-favourites`,
      "POST",
      {communityName: title},
      cookies.access_token
    );
    console.log(respone);
  };

  const handleItemClick = () => {
    if (title === "Create a Community") {
      onCreate();
    } else {
      router.push(`/community/${title}`);
    }
  };

  return (
    <div className={styles.click} onClick={handleItemClick}>
      <li
        key={key}
        className={styles.row}
      >
        <div id={styles.icon}>{icon}</div> <div id={styles.title}>{title}</div>
        {title !== "Create a Community" && (
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
