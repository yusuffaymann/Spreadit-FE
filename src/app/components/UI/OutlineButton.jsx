import React from "react";
import styles from "./OutlineButton.module.css"

function OutlineButton({children}) {
    return (
      <div> 
        <button role="button" tabIndex="0" className={`${styles.buttonBorder} ${styles.buttonText} ${styles.buttonColor}`}>{children}</button>
      </div>
    );
  }

  export default OutlineButton;