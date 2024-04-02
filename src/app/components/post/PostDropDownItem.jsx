import React from "react";
import Image from "next/image";
import styles from "./PostDropDownItem.module.css";

function PostDropDownItem({ icon, iconAlt, description}) {
  return (
    <li className={styles.dropdown_item}>
        <div className={styles.option}>
            <Image width={20} height={20} src={icon} alt={iconAlt} />
            <span>{description}</span>
        </div>
    </li>
  );
}

export default PostDropDownItem;