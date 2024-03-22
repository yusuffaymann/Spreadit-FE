import Image from "next/image";
import React, { useState } from "react";
import "./Profile.css";

export default function ProfileAbout() {
  const [about, setAbout] = useState("");
  const maxChars = 200;

  function handleInputChange(event) {
    const { value } = event.target;
    if (value.length <= maxChars) {
      setAbout(value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitToAPI(formData);
    setAbout("");
  }

  function submitToAPI(formData) {
    console.log("data submitted");
  }

  return (
    <div>
      <div className="settings--flex">
        <div className="settings--flexheader">
          <h3 className="settings--h3">About (optional)</h3>
          <p className="settings--p">
            A brief description of yourself shown on your profile.
          </p>
        </div>
        <div className="settings--flexoption">
          <textarea
            className="profile--aboutTextBox"
            name="aboutTextbox"
            onChange={handleInputChange}
            value={about}
            maxLength={maxChars}
            placeholder="About (optional)"
          ></textarea>
          <p className="textboxlettercount">
            {maxChars - about.length} Characters remaining
          </p>
        </div>
      </div>
    </div>
  );
}
