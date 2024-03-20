import React, { useState, useRef } from "react";
import styles from "./AvatarArea.module.css";
import PlusIcon from "./PlusIcon";
import "./Profile.css";

export default function AvatarArea() {
  const [avatarImage, setAvatarImage] = useState(null);
  const inputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarImage(file);
    }
  };

  return (
    <div className="profile--avatar">
      <label className="profile--images-dragarea profile--images-border">
        {avatarImage ? (
          <img className={`${styles.box} ${styles.color} ${styles.border} }`} src={URL.createObjectURL(avatarImage)} alt="Uploaded Avatar" />
        ) : (
          <>
            <PlusIcon />
            <div className="profile--images-text">
              <span>
                Drag and Drop or Upload{" "}
                <span className="profile--images-textbold">Avatar</span> Image
              </span>
            </div>
          </>
        )}
        <input
          type="file"
          accept=".png, .jpg"
          onChange={handleImageUpload}
          className="acceptinput"
          ref={inputRef}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}
