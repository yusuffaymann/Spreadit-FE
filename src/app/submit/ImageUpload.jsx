import React, { useState, useRef, useEffect } from "react";
import styles from "./ImageUpload.module.css";

function ImageUpload({ inputRef, handleImageUpload }) {
  return (
    <div className={`${styles.uploadWrapper}`}>
      <p className={`${styles.uploadText}`}>
        Drag and drop images or{" "}
        <div style={{ marginLeft: "10px" }}>
          <label
            className={`${styles.uploadButton} ${styles.uploadButtonBorder}`}
          >
            Upload
            <input
              type="file"
              accept=".jpeg, .jpg, .png, .gif, .webm, .mp4, .mkv"
              onChange={handleImageUpload}
              ref={inputRef}
              style={{ display: "none" }}
              multiple // Allow multiple file selection
            />
          </label>
        </div>
      </p>
    </div>
  );
}

export default ImageUpload