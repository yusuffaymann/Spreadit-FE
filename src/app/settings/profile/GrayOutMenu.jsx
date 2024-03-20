import React from "react";
import styles from "./GrayButton.module.css";

function GrayOutMenu({ children }) {
  const handleClick = () => {
    console.log(children , "clicked!");
  };

  return (
    <div className={`${styles.grayOut} ${styles.menuPosition}`}>
        <div aria-modal="true" className={styles.menuBox} role="dialog" tabindex="-1">
            <section className={styles.sectionSize}>
                <header className = {styles.menuHeader}>
                    <div className = {styles.flexHeader}>
                        <div className = {styles.textHeader}>
                            Add Social Link
                        </div>
                        <div class="_2ghjBMFIsORwdO3oh2Kq6g" style="flex-basis: 16px;">
                            <button>
                                <i class="_1Ars0sGomEhw60_u0ZTnDn icon icon-close">
                                    </i>
                                    </button>
                                    </div>
                    </div>
                </header>
            </section>
        </div>
    </div>
  );
}

export default GrayButton;
