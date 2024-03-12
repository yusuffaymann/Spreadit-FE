import React from "react";
import Image from "next/image";
import logo from "../assets/logoSpreadIt.svg"

function ResetPassword() {
    return (
      <div className="PageColumn__left"> 
        <div className="form_logo">
            <Image src={logo} height={40}/>
        </div>
        <h1 className="Title">Reset your password</h1>
        <p className="Description">
            Tell us the username and email address associated with your Reddit account, and we'll send you an email with a link to reset your password.
        </p>
        <form className="PasswordForm">
            
        </form>
      </div>
    );
  }

  export default ResetPassword;