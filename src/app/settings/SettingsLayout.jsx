'use client'

// components/Layout.js
import React, { useMemo, useState } from 'react';
import Bar from "./Bar";
import styles from "./SettingsLayout.module.css";

const Layout = ({ index }) => {
  /* const [selected, setSelected] = useState(index); // Initialize selected state with 0 */

/*   const handleSelect = (index) => {
    setSelected(index); // Update selected state
  }; */

  const layout = useMemo(() => (
    <>
        <div className={styles.title}>User settings</div> 
        <Bar selected={index} /* handleSelect={handleSelect} */ />
    </>
  ), [index]);

  return layout;
};

export default Layout;
