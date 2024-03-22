import Image from "next/image";
import React, { useState } from "react";
import "./Profile_name";

export default function ProfileName({ displayName, setDisplayName, handleSubmit }) {
  const maxChars = 30;

  function handleInputChange(event) {
    const { value } = event.target;
    if (value.length <= maxChars) {
      setDisplayName(value);
    }
  }

  return (
    <div>
      <div className="settings--flex">
        <div className="settings--flexheader">
          <h3 className="settings--h3">Display name (optional)</h3>
          <p className="settings--p">
            Set a display name. This does not change your username.
          </p>
          <div className="settings--flexoption">
            <form onSubmit={handleSubmit}>
              <input
                name="nameTextbox"
                placeholder="Display name (optional)"
                type="text"
                className="profile--textbox"
                onChange={handleInputChange}
                value={displayName}
                maxLength={maxChars}
              ></input>
              <p className="textboxlettercount">
                {maxChars - displayName.length} Characters remaining
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
