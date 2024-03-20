import React from "react";
import styles from "./GrayButton.module.css";

function GrayButton({ children }) {
  const handleClick = () => {
    console.log(children , "clicked!");
  };

  return (
    <li class={styles.buttonround} onClick={handleClick} tabIndex="0" role="button"> 
    <i className="icon">&#43;</i>{children}</li>
  );
}

export default GrayButton;
