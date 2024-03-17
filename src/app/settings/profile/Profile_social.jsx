import Image from "next/image";
import React from "react";
import "./Profile.css";

export default function ProfileSocial()
{
    return (
      <div >
        <div className="settings--flex">
        <div className="settings--flexheader">
          <h3 className="settings--h3">Social links (5 max)</h3>
          <p className="settings--p">People who visit your profile will see your social links.</p>
          </div>
          <div className="settings--flexoption">
          <nav>
          <ul>
          <li class="buttonround"><img src="../../assets/logoSpreadIt.svg" />Add social link</li>
          </ul>
          </nav>
        
        </div>
      </div>
      </div>
    )
}