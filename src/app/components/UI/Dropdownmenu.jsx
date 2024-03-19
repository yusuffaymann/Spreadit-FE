import React, { useState, useEffect } from "react";
import "./dropdown";

function Dropdownmenu({ closeMenu }) {

  return (
    <>
            <div className="_1VhYfuKTAdUU_3j4cMjkr5" onClick={closeMenu}>
                <div className="menuFormat">
              <button
                role="menuitem"
                className="_10K5i7NW6qcm-UoCtpB3aK _3LwUIE7yX7CZQKmD2L87vf _1oYEKCssGFjqxQ9jJMNj5G _1IKtbRloF_LV1hPqMzP3MC"
              >
                <span className="pthKOcceozMuXLYrLlbL1">🔥</span>
                <span className="_2-cXnP74241WI7fpcpfPmg">Hot</span>
              </button>
              <button
                role="menuitem"
                className="_10K5i7NW6qcm-UoCtpB3aK _3LwUIE7yX7CZQKmD2L87vf _1oYEKCssGFjqxQ9jJMNj5G"
              >
                <span className="pthKOcceozMuXLYrLlbL1">🆕</span>
                <span className="_2-cXnP74241WI7fpcpfPmg">New</span>
              </button>
              <button
                role="menuitem"
                className="_10K5i7NW6qcm-UoCtpB3aK _3LwUIE7yX7CZQKmD2L87vf _1oYEKCssGFjqxQ9jJMNj5G"
              >
                <span className="pthKOcceozMuXLYrLlbL1">🔝</span>
                <span className="_2-cXnP74241WI7fpcpfPmg">Top</span>
              </button>
              <button
                role="menuitem"
                className="_10K5i7NW6qcm-UoCtpB3aK _3LwUIE7yX7CZQKmD2L87vf _1oYEKCssGFjqxQ9jJMNj5G"
              >
                <span className="pthKOcceozMuXLYrLlbL1">💹</span>
                <span className="_2-cXnP74241WI7fpcpfPmg">Rising</span>
              </button>
            </div>
            </div>
    </>
  );
}

export default Dropdownmenu;
