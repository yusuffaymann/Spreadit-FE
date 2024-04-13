import React, { useState, useRef, useEffect } from "react";
import styles from "./RichTextEditor.module.css";

function RichToolbarItem({ onClick, ariaLabel, ariaSelected, className, icon })
{
  return (
    <span>
      <button
        role="button"
        onClick={onClick}
        tabIndex="-1"
        aria-label={ariaLabel}
        aria-selected={ariaSelected}
        className={`${styles.RichTextToolbarItem} ${className}`}
      >
        <span className={`${styles.miscIcon} icon icon-add`}>
          {icon}
        </span>
      </button>
    </span>
  );
};

export default RichToolbarItem;
