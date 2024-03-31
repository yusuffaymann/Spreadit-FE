import React from "react";
import styles from "./SocialLink.module.css";
import { ReactDOM } from "react";

/**
 * Component for social links section in the profile settings page.
 * @component
 * @param   {string} logo   URL to the link icon (I failed to make it load the local icons, but it can load hyperlinks from the internet)
 * @param   {string} name   The title of the icon chosen (user determinable)
 * @param   {number} id    The id of the link (note: a bug has been detected, this should have been unique, therefore if you have 5 Spreadit links for example and one of them is deleted, this will delete all of them, and will also not decrement the counter correctly)
 * @param   {boolean} isDeletor    Sets if it is a deletor icon (the same social link bubble but with a black background to distinguish it)
 * @returns {JSX.Element} The rendered SocialLink component.
 *
 * @example
 * //Renders the bubble in a static manner where it is non functional
 * <SocialLink />;
 * @example
 * //Same but given a title
 * <SocialLink name={"This link doesnt work"}/>;
 * //Console log when clicked
 * <GrayButton children={"Click"} wasClicked={console.log(`Clicked`)}/>;
 * //This will make the icon a deleter of all icons with id 1 and itself (this is a bug and is not intended, will be fixed by using unique ids)
 * <GrayButton children={"Will Delete all id 1s"} wasClicked={deleteSocialIcon} isDeletor={true}/>;
*/
function SocialLink({logo,name, wasClicked, id, isDeletor})

{
  /**
 * Unnecessary function used for debugging to detect what id was clicked, then execute the wasClicked function
 * @component
 * @param   {object} event   the click
 * @returns {void}        Nothing returned.
 *
 * @example
 * //When the id is 6 and wasClicked is set to null for simplicity
 * onClick={handleClick}
 * //The console log prints `6`
*/
  const handleClick = (event) => {
  console.log(id);
  wasClicked(id);
};

  return (
    <>
     {!isDeletor && (<li className={`${styles.buttonround} ${styles.limargin}`} onClick={handleClick} tabIndex="0" role="button"> 
    <img src={logo} className={styles.iconMargin} />{name}</li>)}

    {isDeletor && <li className={`${styles.buttonroundd} ${styles.limargin}`} onClick={handleClick} tabIndex="0" role="button"> 
    <img src={logo} className={styles.iconMargin} />{name}</li>}
    </>
  );
}

export default SocialLink;
