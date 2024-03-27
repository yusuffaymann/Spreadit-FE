import React from "react";
import styles from "./BlueButton.module.css";

function BlueButton({ children, onClick }) {
  return (
    <div>
      <button onClick={onClick} className={styles.blue_button}>{children}</button>
    </div>
  );
}

export default BlueButton;
