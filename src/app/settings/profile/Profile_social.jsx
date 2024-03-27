import Image from "next/image";
import React, { useState, useEffect } from "react";
import "./Profile.css";
import GrayButton from "./components/GrayButton";
import SocialLink from "./components/SocialLink";
import GrayOutMenuWrapper from "./components/GrayOutMenu"; // Import the correct component
import social from "../social.js";

export default function ProfileSocial({ isOpen, onClose, onSelectSocial, addSocialLink, deleteSocialLink, socialLinks, counter }) {

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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <a href={link.url} style={{ textDecoration: "none" }}>
                    <SocialLink key={link.id} logo={link.logo} name={link.name} />
                  </a>
                </div>
              ))}
              <GrayButton
                children={"Add social link"}
                wasClicked={onClose}
                isDisabled={counter === 5}
              />
              <GrayOutMenuWrapper
                isOpen={isOpen}
                onClose={onClose}
                onSelectWrapper={onSelectSocial}
                addFunc={addSocialLink}
              />{" "}
              {/* Pass onClose instead of onClick */}
            </ul>
            <ul>
              {socialLinks.map((link, index) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SocialLink
                    key={index}
                    id={link.id}
                    logo={link.logo}
                    name={link.name}
                    wasClicked={deleteSocialLink}
                    isDeletor={true}
                  />
                </div>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
