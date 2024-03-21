import React from "react";
import styles from "./GrayButton.module.css";

function GrayButton({ children , wasClicked, isDisabled}) {

  return (<>
    {isDisabled && (<li class={styles.buttonroundd}  tabIndex="0" role="button"> 
    <i className="icon">&#43;</i>{children}</li>)}

    {!isDisabled && (<li class={styles.buttonround} onClick={wasClicked} tabIndex="0" role="button"> 
    <i className="icon">&#43;</i>{children}</li>)
  }
    </>
  );
}

export default GrayButton;
