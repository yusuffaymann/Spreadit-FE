import React from "react";
import Image from "next/image";
import sideArt from "../../assets/reddit-side-art.png";

function SideArt(props) {
    return (
      <div className="PageColumn__left"> 
        <Image className="art" {...props} src={sideArt} />
      </div>
    );
  }
export default SideArt;
