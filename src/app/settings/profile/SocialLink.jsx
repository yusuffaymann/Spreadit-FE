import React from "react";
import styles from "./SocialLink.module.css";
import { ReactDOM } from "react";
function SocialLink({ children , wasClicked, svgDisplayed = '&#43;'}) {

  return (
    <li class={styles.buttonround} onClick={wasClicked} tabIndex="0" role="button"> 
    <img src="https://www.redditstatic.com/desktop2x/img/social-links/facebook.png" className={styles.iconMargin} />{children}</li>
  );
}

export default SocialLink;
