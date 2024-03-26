import React, { useState, useRef, useEffect } from "react";
import styles from "./BannerArea.module.css";
import PlusIcon from "./PlusIcon";
import "../Profile.css";


/**
 * Component rendering the banner upload area
 * @component
 * @param   {Function} setBannerUrl     The setter to the URL link
 * @returns {JSX.Element} The rendered BannerArea component.
 *
 * @example
 * //Non interactive static area
 * <BannerArea />
 * //Print the URL to be returned
 * <bannerArea setBannerUrl={console.log(`${URL.createObjectURL(bannerImage)}`)}/>
 */
export default function BannerArea({setBannerUrl}) {
  const [bannerImage, setBannerImage] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bannerImage) {
      setBannerUrl(URL.createObjectURL(bannerImage));
    }
  }, [bannerImage, setBannerUrl]);

   /**
 * Handles image upload event
 * @param   {object} event The event object triggered by the image upload
 * @returns {void} Nothing returned.
 *
 * @example
 * // This will set the bannerImage object, which will then have its URL derived by above useEffect
 * <input type="file" onChange={handleImageUpload} />
 */
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
