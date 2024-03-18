import React from "react";
import Image from "next/image";
import sideArt from "../../assets/reddit-side-art.png";

function SideArt() {
  return (
    <div className="PageColumn__left">
      <Image className="art" src={sideArt} />
    </div>
  );
}

export default SideArt;
