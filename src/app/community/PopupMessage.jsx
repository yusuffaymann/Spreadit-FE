import React, { useState, useEffect } from "react";
import "./PopupMessage.css";

const PopupMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically hide the pop-up message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`popup-message ${isVisible ? "show" : "hide"}`}>
      {message}
    </div>
  );
};

export default PopupMessage;
