import React from "react";
import styles from "./OutlineButton.module.css";


/**
 * Component for rendering outline button (round white background button)
 * @component
 * @param {object} props  The props passed to the OutlineButton component
 * @param {boolean} props.isDisabled  Whether the button is disabled or not
 * @param {string} props.children Text inside button
 * @param {Function} props.btnClick The function to be called upon clicking the button
 * @returns {JSX.Element} The rendered OutlineButton component.
 *
 * @example
 * <OutlineButton isDisabled={false} btnClick={handleClick}>Click Me</OutlineButton>
 */
function OutlineButton(props) {

  /**
   * Leftover debug function
   */
  const handleClick = () => {
    console.log(props.children , "clicked!");
  };

  return (
    <div>
      <button
        role="button"
        tabIndex="0"
        className={`${styles. buttonBorder} ${styles.buttonText} ${props.isInverted ? styles.buttonColorInverted : styles.buttonColor}`}
        onClick={props.btnClick}
        disabled={props.isDisabled}
      >
        {props.children}
      </button>
    </div>
  );
}

// Set a default value for colorInverted if not provided
OutlineButton.defaultProps = {
  isInverted: false,
};

export default OutlineButton;
