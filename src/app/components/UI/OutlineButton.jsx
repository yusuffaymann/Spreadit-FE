import React from "react";
import styles from "./OutlineButton.module.css";

function OutlineButton(props) {
  const handleClick = () => {
    console.log(props.children , "clicked!");
  };

  return (
    <div>
      <button
        role="button"
        tabIndex="0"
        className={`${styles. buttonBorder} ${styles.buttonText} ${styles.buttonColor}`}
        onClick={props.btnClick}
      >
        {props.children}
      </button>
    </div>
  );
}

export default OutlineButton;
