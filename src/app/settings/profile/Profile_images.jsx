import Image from "next/image";
import React from "react";
import "./Profile.css";

export default function ProfileImages()
{
    return (
        <div >
            <div className="settings--flex">
        <div className="settings--flexheader">
          <h3>Avatar and banner image</h3>
          <p>
            Images must be .png or .jpg format
          </p>
        </div>
        <div class="settings--flexoption">
          <div class="profile--images-flexdrag">
            <div class="profile--avatar">
              <label class="profile--images-dragarea  profile--images-border">
                <img src="Add.png" class="profile--images-icon"></img>
                <div class="profile--images-text">
                  <span >
                    Drag and Drop or Upload{" "}
                    <span class="profile--images-textbold">Avatar</span> Image
                  </span>
                </div>
                <div class="acceptinput"></div>
              </label>
            </div>
            <div class="profile--banner">
              <label class="profile--images-dragarea  profile--images-border">
                <img src="Add.png" class="profile--images-icon"></img>
                <div class="profile--images-text">
                  <span >
                    Drag and Drop or Upload{" "}
                    <span class="profile--images-textbold">Banner</span> Image
                  </span>
                </div>
                <div class="acceptinput"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}