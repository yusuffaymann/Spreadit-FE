import React from "react";
import styles from "./GrayButton.module.css";

function GrayButton({ children , wasClicked, svgDisplayed = '&#43;'}) {

  return (
    <li class={styles.buttonround} onClick={wasClicked} tabIndex="0" role="button"> 
    <i className="icon">&#43;</i>{children}</li>
  );
}

export default GrayButton;
