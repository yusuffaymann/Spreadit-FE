import React from "react";
import styles from "./BlueButton.module.css"

function BlueButton({children}) {
    return (
      <div> 
        <button className={styles.blue_button}>{children}</button>
      </div>
    );
  }

  export default BlueButton;