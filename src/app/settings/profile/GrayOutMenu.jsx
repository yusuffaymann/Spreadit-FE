import React, { useState } from "react";
import styles from "./GrayOutMenu.module.css";

function GrayOutMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
  };

  return (
    <div>
      <button onClick={handleClick}>Open Menu</button>
      {isOpen && (
        <div className={`${styles.grayOut} ${styles.menuPosition}`}>
          <div aria-modal="true" className={styles.menuBox} role="dialog" tabIndex="-1">
            <section className={styles.sectionSize}>
              <header className={styles.menuHeader}>
                <div className={styles.flexHeader}>
                  <div className={styles.textHeader}>Add Social Link</div>
                  <div className={styles.flexX} style={{ flexBasis: "16px" }}>
                    <button onClick={handleClick}>
                      <i className="color-X icon icon-close"></i>
                    </button>
                  </div>
                </div>
              </header>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default GrayOutMenu;
