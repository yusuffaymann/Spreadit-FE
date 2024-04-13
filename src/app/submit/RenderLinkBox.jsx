import React, { useState } from "react";
import "./Create.css";
import styles from "./RenderLinkBox.module.css";

function RenderLinkBox({url,setUrl}) {
  function handleInputChange(event) {
    const { value } = event.target;
    const newValue = value.replace(/[\r\n]/g, ' '); // Remove line breaks
    setUrl(newValue);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); 
    }
  }

    return (<div>
      <textarea placeholder="Url"
      className={`${styles.textareaStyle} ${styles.textarea}`}
      value={url}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      rows="1"
      data-tribute="true"
      style={{ overflowX: "hidden", overflowWrap: "break-word", height: "65.6px" }}
      >
      </textarea>
    </div>);
}

export default RenderLinkBox;
