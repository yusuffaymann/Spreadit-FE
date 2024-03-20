import React, { useState, useRef } from "react";
import styles from "./BannerArea.module.css";
import PlusIcon from "./PlusIcon";
import "./Profile.css";

export default function BannerArea() {
  const [bannerImage, setBannerImage] = useState(null);
  const inputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // You can perform additional checks/validation here if needed
      setBannerImage(file);
    }
  };

  const bannerStyle = {
    backgroundImage: bannerImage ? `url(${URL.createObjectURL(bannerImage)})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "200px", // Set your desired height
  };

  return (
    <div className="profile--banner">
      <label className="profile--images-dragarea profile--images-border">
        <div
          style={bannerStyle}
        >
          {bannerImage ? null : (
            <div className="profile--banner-shiftdown">
              <PlusIcon />
              <div className="profile--images-text">
                <span>
                  Drag and Drop or Upload{" "}
                  <span className="profile--images-textbold">Banner</span> Image
                </span>
              </div>
            </div>
          )}
        </div>
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
