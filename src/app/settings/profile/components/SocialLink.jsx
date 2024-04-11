import React from "react";
import styles from "./SocialLink.module.css";
import { ReactDOM } from "react";
import social from "../../social";
/**
 * Component for social links section in the profile settings page.
 * @component
 * @param   {string} logo   URL to the link icon (I failed to make it load the local icons, but it can load hyperlinks from the internet)
 * @param   {string} name   The title of the icon chosen (user determinable)
 * @param   {number} index    The id of the link (note: a bug has been detected, this should have been unique, therefore if you have 5 Spreadit links for example and one of them is deleted, this will delete all of them, and will also not decrement the counter correctly)
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
function SocialLink({
  platform,
  displayName,
  wasClicked,
  index,
  isDeletor = false,
  isLink = false,
  url = "",
}) {
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
    console.log(index);
    wasClicked(index);
  };

  const getLogoUrl = (platform) => {
    const matchingSocial = social.find(
      (optionSocial) => optionSocial.platform === platform
    );
    if (matchingSocial) {
      return matchingSocial.logo;
    } else
      return "https://www.redditstatic.com/desktop2x/img/social-links/custom.png";
  };

  const logoUrl = getLogoUrl(platform);

  return (
    <>
      {!isDeletor && !isLink && (
        <li
          className={`${styles.buttonround} ${styles.limargin}`}
          onClick={handleClick}
          tabIndex="0"
          role="button"
        >
          <img src={logoUrl} className={styles.iconMargin} />
          {displayName}
        </li>
      )}

      {isDeletor && isLink && (
        <li
          className={`${styles.buttonround} ${styles.limargin}`}
          tabIndex="0"
          role="button"
        >
          <a href={url} style={{ textDecoration: "none", color: "inherit" }}>
            <img src={logoUrl} className={styles.iconMargin} />
            {displayName}
          </a>
          <span onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.icon} ${styles.xMarginLeft}`}
              viewBox="0 0 1024 1024"
              version="1.1"
            >
              <path d="M512 1024C229.702 1024 0 794.298 0 512S229.702 0 512 0s512 229.702 512 512-229.702 512-512 512z m0-975.22C256.559 48.78 48.78 256.559 48.78 512c0 255.441 207.779 463.127 463.22 463.127 255.441 0 463.127-207.686 463.127-463.127S767.441 48.78 512 48.78z" />
              <path d="M768 309.807L714.193 256 512.047 458.24 309.807 256 256 309.807 458.24 512 256 714.193 309.807 768 512 565.807 714.147 768l53.806-53.807L565.76 512.047z" />
            </svg>
          </span>
        </li>
      )}

      {isDeletor && !isLink && (
        <li
          className={`${styles.buttonround} ${styles.limargin}`}
          tabIndex="0"
          role="button"
        >
          <img src={logoUrl} className={styles.iconMargin} />
          {displayName}
          <span onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.icon} ${styles.xMarginLeft}`}
              viewBox="0 0 1024 1024"
              version="1.1"
            >
              <path d="M512 1024C229.702 1024 0 794.298 0 512S229.702 0 512 0s512 229.702 512 512-229.702 512-512 512z m0-975.22C256.559 48.78 48.78 256.559 48.78 512c0 255.441 207.779 463.127 463.22 463.127 255.441 0 463.127-207.686 463.127-463.127S767.441 48.78 512 48.78z" />
              <path d="M768 309.807L714.193 256 512.047 458.24 309.807 256 256 309.807 458.24 512 256 714.193 309.807 768 512 565.807 714.147 768l53.806-53.807L565.76 512.047z" />
            </svg>
          </span>
        </li>
      )}

      {!isDeletor && isLink && (
        <li
          className={`${styles.buttonround} ${styles.limargin}`}
          tabIndex="0"
          role="button"
        >
          <a href={url} style={{ textDecoration: "none", color: "inherit" }}>
            <img src={logoUrl} className={styles.iconMargin} />
            {displayName}
          </a>
        </li>
      )}

      {/*{isDeletor && (
        <li
          className={`${styles.buttonroundd} ${styles.limargin}`}
          onClick={handleClick}
          tabIndex="0"
          role="button"
        >
          <img src={logoUrl} className={styles.iconMargin} />
          {displayName}
          <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "black", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1"><path d="M512 1024C229.702 1024 0 794.298 0 512S229.702 0 512 0s512 229.702 512 512-229.702 512-512 512z m0-975.22C256.559 48.78 48.78 256.559 48.78 512c0 255.441 207.779 463.127 463.22 463.127 255.441 0 463.127-207.686 463.127-463.127S767.441 48.78 512 48.78z"/><path d="M768 309.807L714.193 256 512.047 458.24 309.807 256 256 309.807 458.24 512 256 714.193 309.807 768 512 565.807 714.147 768l53.806-53.807L565.76 512.047z"/></svg>
        </li>
      )*/}
    </>
  );
}

export default SocialLink;
