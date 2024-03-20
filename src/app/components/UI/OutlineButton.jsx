import React from "react";
import styles from "./OutlineButton.module.css";

function OutlineButton({ children }) {
  const handleClick = () => {
    console.log(children , "clicked!");
  };

  return (
    <div>
      <button
        role="button"
        tabIndex="0"
        className={`${styles. buttonBorder} ${styles.buttonText} ${styles.buttonColor}`}
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
}

export default OutlineButton;
