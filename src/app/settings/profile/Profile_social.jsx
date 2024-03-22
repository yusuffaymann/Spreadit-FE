import Image from "next/image";
import React, { useState, useEffect } from "react";
import "./Profile.css";
import GrayButton from "./components/GrayButton";
import SocialLink from "./components/SocialLink";
import GrayOutMenuWrapper from "./components/GrayOutMenu"; // Import the correct component
import social from "../social.js";

export default function ProfileSocial({ isOpen, onClose, onSelectSocial }) {
  const [socialLinks, setSocialLinks] = useState([]);
  const [counter, setCounter] = useState(0);

  const addSocialLink = (id, name, link, logo) => {
    if (counter < 5) {
      // Spread the existing socialLinks array and add the new object to it
      setSocialLinks([...socialLinks, { id, name, link, logo }]);
      setCounter(counter + 1);
    }
  };

  const deleteSocialLink = (id) => {
    // Filter out the social link with the given id
    const updatedSocialLinks = socialLinks.filter(link => link.id !== id);
    // Update the state with the new array
    setSocialLinks(updatedSocialLinks);
    setCounter(counter - 1);
  };

  return (
    <div>
      <div className="settings--flex">
        <div className="settings--flexheader">
          <h3 className="settings--h3">Social links (5 max)</h3>
          <p className="settings--p">
            People who visit your profile will see your social links.
          </p>
        </div>
        <div className="settings--flexoption">
          <nav className="profile--social-nav">
            <ul>
              {socialLinks.map((link, index) => (
                <div style={{display: "flex", alignItems: "center"}}>
                <a href={link.link} style={{ textDecoration: "none" }}>
                  <SocialLink key={index} logo={link.logo} name={link.name} />
                </a>
                </div>
              ))}
              <GrayButton children={"Add social link"} wasClicked={onClose} isDisabled={counter === 5}/>
              <GrayOutMenuWrapper
                isOpen={isOpen}
                onClose={onClose}
                onSelectWrapper={onSelectSocial}
                addFunc={addSocialLink}
              />{" "}
              {/* Pass onClose instead of onClick */}
            </ul>
            <ul>{socialLinks.map((link, index) => (
                <div style={{display: "flex", alignItems: "center"}}>
                  <SocialLink key={index} id={link.id} logo={link.logo} name={link.name} wasClicked={deleteSocialLink} isDeletor={true}/>
                </div>
              ))}</ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
