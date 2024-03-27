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
  const [socialUrl, setUrl] = useState("");
  const [selectedLinkId, setSelectedLinkId] = useState(-1);

  /**
   * Handles changes in the social URL input field and `setDisplayName` of the social link as such
   * @param   {Event} event   The input change event
   */
  function handleDispInputChange(event) {
    const { value } = event.target;

    setDisplayName(value);
  }


  /**
   * Handles changes in the social URL input field and `setUrl` as such
   * @param   {Event} event   The input change event
   */
  function handleUrlInputChange(event) {
    const { value } = event.target;

    setUrl(value);
  }

  /**
   * Toggles the dialog and choices states to move between the link selection and link adding screen states
   */
  const handleToggleStates = () => {
    setDialogOpen((prevState) => !prevState);
    setChoicesOpen((prevState) => !prevState);
  };

    /**
   * Handles enter key press event for QOL.
   * @param   {Event} event   The key press event
   */
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  /**
   * Ensures the fields are not empty then sends these parameters back to `ProfileSocial`, then onto the `page.js` to be added into the array.
   * Note: a bug exists, the id returned is not unique. Therefore, when a deletion happens, all icons of the same type will be deleted
   * This is also not accounted for in the `counter` in `page.js`, since it is supposed to delete just one at a time
   */
  const handleSave = () => {
    if (displayName.trim() !== "" && socialUrl.trim() !== "") {
      // Check if displayName is not empty
      const tempFinder = social.find((finder) => finder.id === selectedLinkId);
      addSocial(selectedLinkId, displayName, socialUrl, tempFinder.logo); // Pass an object with displayName to addSocial function
      onClose();
    }
  };

  /**
   * Actually unnecessary and unused.
   */
  const handleClick = (event) => {
    // Prevent clicks from propagating to elements underneath the menu
    event.stopPropagation();
  };

  /**
   * When you select an icon to add, this will send said icon to the next screen where you enter in the fields before saving
   * @param   {number} id  The ID of the clicked link
   */
  const handleLinkClick = (id) => {
    handleToggleStates();
    setSelectedLinkId(id);
    console.log(id);
  };

  /**
   * Renders the dialog section.
   * @returns {JSX.Element}  The rendered dialog section
   */
  const renderDialog = () => {
    return (
      <>
        {social.map(
          (optionSocial) =>
            optionSocial.id === selectedLinkId && (
              <SocialLink
                key={optionSocial.id}
                id={optionSocial.id}
                logo={optionSocial.logo}
                name={optionSocial.name}
                wasClicked={handleLinkClick}
              />
            )
        )}
        <div>
          <input
            placeholder="Display text"
            className={styles.txtBox}
            value={displayName}
            data-tribute="true"
            onKeyDown={handleKeyPress}
            onChange={handleDispInputChange}
          />
          <input
            placeholder="insert url"
            onChange={handleUrlInputChange}
            className={styles.txtBox}
            value={socialUrl}
            data-tribute="true"
            onKeyDown={handleKeyPress}
          />
        </div>
      </>
    );
  };

  /**
   * Renders the choices section.
   * @returns {JSX.Element}  The rendered choices section
   */
  const renderChoices = () => {
    return (
      <>
        {social.map((optionSocial) => (
          <SocialLink
            key={optionSocial.id}
            id={optionSocial.id}
            logo={optionSocial.logo}
            name={optionSocial.name}
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
                  <button onClick={handleToggleStates}>
                    <div className="color-X icon">&larr;</div>
                  </button>
                </div>
              )}
              <div className={styles.flexHeaderText}>
                <div className={styles.textHeader}>Add Social Link</div>
              </div>
              {isChoicesOpen && (
                <div className={styles.flexX} style={{ flexBasis: "16px" }}>
                  <button onClick={onClose}>
                    <div className="color-X icon">&#10006;</div>
                  </button>
                </div>
              )}
              {isDialogOpen && (
                <div className={styles.flexX} style={{ flexBasis: "16px" }}>
                  <OutlineButton
                    children={"Save"}
                    isDisabled={displayName === "" || socialUrl === ""}
                    btnClick={handleSave}
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
