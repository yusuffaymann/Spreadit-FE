import React from "react";
import Image from "next/image";
import sideArt from "../../assets/reddit-side-art.png";

function SideArt({className, alt}) {
    return (
      <div className="PageColumn__left"> 
        <Image className={`art ${className}`} src={sideArt} alt={alt} />
      </div>
    );
  }
export default SideArt;
