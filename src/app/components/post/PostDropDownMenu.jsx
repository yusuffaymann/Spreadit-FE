import React, {useRef, useEffect} from 'react';
import styles from './PostDropDownMenu.module.css';

function PostDropDownMenu({children, showDropdown, setShowDropDown}) {

    const ref = useRef(null);

    useEffect(() => {
      const handleOutSideClick = (event) => {
        if (!ref.current?.contains(event.target)) {;
            setShowDropDown(false);
        }
      };
  
      window.addEventListener("mousedown", handleOutSideClick);
  
      return () => {
        window.removeEventListener("mousedown", handleOutSideClick);
      };
    }, [ref]);

    return (
        <div className={`${styles.dropdown_menu} ${showDropdown ? styles.active : styles.inactive}`}>
                <ul className={styles.no_style} ref = {ref} >
                    {children}
                </ul>
           </div>
    )
}

export default PostDropDownMenu


