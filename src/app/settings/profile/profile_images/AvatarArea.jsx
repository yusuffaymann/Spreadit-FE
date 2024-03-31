import React, { useState, useRef, useEffect } from "react";
import styles from "./AvatarArea.module.css";
import PlusIcon from "./PlusIcon";
import "../Profile.css";

/**
 * Component rendering the avatar upload area
 * @component
 * @param   {Function} setAvatarUrl     The setter to the URL link
 * @returns {JSX.Element} The rendered AvatarArea component.
 *
 * @example
 * //Non interactive static area
 * <AvatarArea />
 * //Print the URL to be returned
 * <AvatarArea setAvatarUrl={console.log(`${URL.createObjectURL(avatarImage)}`)}/>
 */
export default function AvatarArea({setAvatarUrl}) {
  const [avatarImage, setAvatarImage] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (avatarImage) {
      setAvatarUrl(URL.createObjectURL(avatarImage));
    }
  }, [avatarImage, setAvatarUrl]);

  /**
 * Handles image upload event
 * @param   {object} event The event object triggered by the image upload
 * @returns {void} Nothing returned.
 *
 * @example
 * // This will set the avatarImage object, which will then have its URL derived by above useEffect
 * <input type="file" onChange={handleImageUpload} />
 */
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
