import React from "react";
import styles from "./AvatarArea.module.css";
import PlusIcon from "./PlusIcon";
import "./Profile.css";

export default function AvatarArea() {

  return (
      <div className="profile--avatar">
        <label className="profile--images-dragarea  profile--images-border">
          <PlusIcon />
          <div className="profile--images-text">
            <span>
              Drag and Drop or Upload{" "}
              <span className="profile--images-textbold">Avatar</span> Image
            </span>
          </div>
          <div className="acceptinput"></div>
        </label>
      </div>
  );
}
