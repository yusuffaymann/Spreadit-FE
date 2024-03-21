import Image from "next/image";
import React, { useState } from "react";
import "./Profile.css";
import GrayButton from "./components/GrayButton";
import SocialLink from "./components/SocialLink";
import GrayOutMenuWrapper from "./components/GrayOutMenu"; // Import the correct component

export default function ProfileSocial({ isOpen, onClose , onSelectSocial}) {
  const [socialLinks, setSocialLinks] = useState([]);
  const [counter, setCounter] = useState(0);

  const addSocialLink = (name) => {
    if (counter < 5) {
      // Spread the existing socialLinks array and add the new object to it
      setSocialLinks([...socialLinks, { name }]);
      setCounter(counter + 1);
    }
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
              <GrayButton children={'Add social link'} wasClicked={onClose} />
              <SocialLink>face</SocialLink>
              {socialLinks.map((link, index) => (
                <SocialLink key={index}>{link.name}</SocialLink>
              ))}
              <GrayOutMenuWrapper isOpen={isOpen} onClose={onClose} isAddBtn = {true} onSelectWrapper={onSelectSocial}
              addFunc={addSocialLink}/> {/* Pass onClose instead of onClick */}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
