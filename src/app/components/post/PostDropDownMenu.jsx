import React from 'react';
import styles from './PostDropDownMenu.module.css';

function PostDropDownMenu({children, showDropdown}) {
    return (
        <div className={`${styles.dropdown_menu} ${showDropdown ? styles.active : styles.inactive}`}>
                <ul className={styles.no_style}>
                    {children}
                </ul>
           </div>
    )
}

export default PostDropDownMenu


