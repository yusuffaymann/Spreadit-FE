import React from "react";

function BottomHelp(props) {
    return (
      <>
      {props.children || (
        <div className="bottom-text">
        Don't have an email or need assistance logging in?
        <a href="#" className="bottom-link"> get help</a>
        </div>
        )}

        <div className="bottom-text">
        <a href="#" className="bottom-link">Log in</a>
        <span className="link-separator">•</span>
        <a href="#" className="bottom-link">sign up</a>
        </div>
      </>
      
    );
  }

  export default BottomHelp;