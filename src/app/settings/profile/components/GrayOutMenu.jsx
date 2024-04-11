import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./GrayOutMenu.module.css";
import SocialLink from "./SocialLink";
import OutlineButton from "@/app/components/UI/OutlineButton";
import social from "../../social";

/**
 * Component for rendering the grayed-out modal menu for adding social links
 * @component
 * @param   {Function} onClose       Function to toggle the menu
 * @param   {Function} onSelectGray  Function passed down from the wrapper onto the component itself (unnecessary and unused)
 * @param   {Function} addSocial     Function to add a new social link
 * @returns {JSX.Element}            The rendered GrayOutMenuWrapper component.
 *
 * @example
 * // Note: This component relies on its wrapper to set it to be visible
 * // Therefore, if you somehow set the menu to be visible but set the passed down functions as such
 * // You wont be able to exit the menu
 * const onClose = () => { console.log("Menu toggle attempt") };
 * const addSocial = () => { console.log("Social link add attempt") };
 * <GrayOutMenu onClose={onClose} addSocial={addSocial} />
 */
function GrayOutMenu({ onClose, onSelectGray, addSocial }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isChoicesOpen, setChoicesOpen] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [platform, setPlatform] = useState("Platform");
  const [socialUrl, setUrl] = useState("");
  const [selectedLinkId, setSelectedLinkId] = useState(-1);

  function handleDispInputChange(event) {
    const { value } = event.target;
    setDisplayName(value);
  }

  function handleUrlInputChange(event) {
    const { value } = event.target;
    setUrl(value);
  }

  const handleToggleStates = () => {
    setDialogOpen((prevState) => !prevState);
    setChoicesOpen((prevState) => !prevState);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = () => {
    if (displayName.trim() !== "" && socialUrl.trim() !== "") {
      // Check if displayName is not empty
      addSocial(platform, socialUrl, displayName, socialUrl); // Pass an object with displayName to addSocial function
      onClose();
    }
  };

  //Prevent menu from being closed
  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleLinkClick = (id) => {
    handleToggleStates();
    setSelectedLinkId(id);
    const matchingSocial = social.find(
      (optionSocial) => optionSocial.id === id
    );
    if (matchingSocial) {
      setPlatform(matchingSocial.platform);
    }
  };

  const renderDialog = () => {
    return (
      <>
        {social.map(
          (optionSocial, index) =>
            optionSocial.id === selectedLinkId && (
              <SocialLink
                key={index}
                id={index}
                displayName={optionSocial.name}
                platform={optionSocial.platform}
                wasClicked={(id) => {}} //Does nothing, just to stop errors from popping up
              />
            )
        )}
        <div>
          <input
            placeholder="Display text"
            className={`${styles.txtBox} focusable`}
            value={displayName}
            data-tribute="true"
            onKeyDown={handleKeyPress}
            onChange={handleDispInputChange}
          />
          <input
            placeholder="insert url"
            onChange={handleUrlInputChange}
            className={`${styles.txtBox} focusable`}
            value={socialUrl}
            data-tribute="true"
            onKeyDown={handleKeyPress}
          />
        </div>
      </>
    );
  };

  const renderChoices = () => {
    return (
      <>
        {social.map((optionSocial, index) => (
          <SocialLink className
          isFocusable={true}
            platform={optionSocial.platform}
            key={index}
            index={index}
            displayName={optionSocial.name}
            wasClicked={handleLinkClick}
          />
        ))}
      </>
    );
  };

  return (
    <div
      className={`${styles.grayOut} ${styles.menuPosition}`}
      onClick={onClose} // Close the menu when clicking on the gray area
    >
      <div
        aria-modal="true"
        className={styles.menuBox}
        role="dialog"
        tabIndex="-1"
        onClick={handleClick} // Prevent clicks from propagating to elements underneath the menu
      >
        <section className={styles.sectionSize}>
          <header className={styles.menuHeader}>
            <div className={styles.flexHeader}>
              {isDialogOpen && (
                <div className={styles.backArrow} style={{ flexBasis: "16px" }}>
                  <button className="focusable" onClick={handleToggleStates}>
                    <div className="color-X icon">&larr;</div>
                  </button>
                </div>
              )}
              <div className={styles.flexHeaderText}>
                <div className={styles.textHeader}>Add Social Link</div>
              </div>
              {isChoicesOpen && (
                <div className={`${styles.flexX}`} style={{ flexBasis: "16px" }}>
                  <button className="focusable" onClick={onClose}>
                    <div className="color-X icon">&#10006;</div>
                  </button>
                </div>
              )}
              {isDialogOpen && (
                <div className={`${styles.flexX}`} style={{ flexBasis: "16px" }}>
                  <OutlineButton
                    children={"Save"}
                    isDisabled={displayName === "" || socialUrl === ""}
                    isFocusable={true}
                    btnClick={handleSave}
                    isInverted={true}
                  />
                </div>
              )}
            </div>
          </header>
          <div className={`${styles.menuBody} ${styles.padding}`}>
            {isChoicesOpen && renderChoices()}
            {isDialogOpen && renderDialog()}
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * Wrapper for the menu to separate its visibility AND the actual options inside the menu itself
 * @component
 * @param   {boolean} isOpen         Flag indicating whether the menu is open or not
 * @param   {Function} onClose       Function to toggle the menu from inside
 * @param   {Function} onSelectWrapper  Actually unused and unnecessary
 * @param   {Function} addFunc       Passed down function to add a link from inside the menu onto the `page.js`
 * @returns {JSX.Element}            The rendered GrayOutMenuWrapper component
 *
 * @example
 * // Example usage of GrayOutMenuWrapper (will be permanently on due to `isOpen` being `true`)
 * const isOpen = true;
 * const onClose = () => { console.log("Menu toggle attempt") };
 * const addFunc = () => { console.log("Social link add attempt") };
 * <GrayOutMenuWrapper isOpen={isOpen} onClose={onClose} addFunc={addFunc} />
 */
function GrayOutMenuWrapper({ isOpen, onClose, onSelectWrapper, addFunc }) {
  useEffect(() => {
    // Disable scrolling on the body when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]); // Only re-run the effect if isOpen changes

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent scrolling when the menu is open
      if (isOpen && event.key === "Escape")
      {
        onClose();
      }
      if (isOpen && (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Tab")) {
        event.preventDefault();
        const focusableElements = document.querySelectorAll(".focusable");
        const focusedIndex = Array.from(focusableElements).indexOf(document.activeElement);
    
        let nextIndex = focusedIndex + (event.shiftKey ? -1 : 1);
        if (nextIndex < 0) {
          nextIndex = focusableElements.length - 1; // Wrap around to the end
        } else if (nextIndex >= focusableElements.length) {
          nextIndex = 0; // Wrap around to the beginning
        }
    
        focusableElements[nextIndex].focus(); // Move focus to the next/previous element
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Use ReactDOM.createPortal to render the menu outside of its parent components
  return ReactDOM.createPortal(
    <GrayOutMenu
      onClose={onClose}
      onSelectGray={onSelectWrapper}
      addSocial={addFunc}
    />,
    document.body // Render the menu as a direct child of the document body
  );
}

export default GrayOutMenuWrapper;
