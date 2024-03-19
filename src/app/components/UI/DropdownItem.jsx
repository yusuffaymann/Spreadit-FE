import React, { useState, useEffect } from "react";
import "./dropdown.css";
import Dropdownmenu from "./dropdownmenu";

function DropdownItem({ toggleMenu }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenuVisibility = () => {
    console.log('clicked');
    setIsMenuVisible(!isMenuVisible);
  };
  return (
      <div class="_2gyG4Nl0mMXg9j65G_cVwp" onClick={toggleMenu}>
  <div class="_2OI2GNt8U_hqISJzbsrb0Y" data-testid="subreddit-sort-setting-listing">
    <div class="Mw10gImD3M_Xbm-yM9eyH">
      <button role="menuitem" class="_10K5i7NW6qcm-UoCtpB3aK _3LwUIE7yX7CZQKmD2L87vf _183U1ds639-b2Av2n7Mdt_ _1IKtbRloF_LV1hPqMzP3MC">
        <span class="pthKOcceozMuXLYrLlbL1">
          🆕
        </span>
        <span class="_2-cXnP74241WI7fpcpfPmg">New</span>
      </button>
      <span>
        <svg class="XHbKeEqnW58ib9mTN6jnS u_kypUXmB-k1A5TcC8MI9" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path>
        </svg>
      </span>
    </div>
    </div>
    </div>
  );
}

export default DropdownItem;
