import React from "react";
import styles from "./AvatarArea.module.css";
import PlusIcon from "./PlusIcon";
import "./Profile.css";

export default function AvatarArea() {

  return (
      <div class="profile--banner">
        <label class="profile--images-dragarea  profile--images-border">
          <PlusIcon />
          <div class="profile--images-text">
            <span>
              Drag and Drop or Upload{" "}
              <span class="profile--images-textbold">Banner</span> Image
            </span>
          </div>
          <div class="acceptinput"></div>
        </label>
      </div>
  );
}
