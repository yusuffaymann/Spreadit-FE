import Image from "next/image";
import React from "react";
import "./Profile.css";
import AvatarArea from "./AvatarArea";
import BannerArea from "./BannerArea"

export default function ProfileImages() {
  return (
    <div>
      <div className="settings--flex">
        <div className="settings--flexheader">
          <h3>Avatar and banner image</h3>
          <p>Images must be .png or .jpg format</p>
        </div>
        <div class="settings--flexoption">
          <div className="profile--images-flexdrag">
            <AvatarArea/>
            <BannerArea/>
          </div>
        </div>
      </div>
      
    </div>
  );
}
