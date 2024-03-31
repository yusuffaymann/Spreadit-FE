import React, { useState } from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BottomHelp from "../components/UI/BottomHelp.jsx";
import UserNameForm from "./UsernameForm.jsx";
import submitToApi from "../utils/submitToApi.js";

function RecoverUsername() {
  const url = "http://localhost:3002/forgot-username";
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleInputChange(event) {
    const { value } = event.target;
    setEmail(value);
    setEmailError("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailPattern =/^[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if(email === ""){
      setEmailError("Email is required");
      return;
    }else if(!emailPattern.test(email)){
      setEmailError("Invalid email address");
      return;
    }else{
      setEmailError("");
    }
    const data = { email };
    const response = await submitToApi(url, "POST", data);
    console.log(response);
    setEmail("");
  };

  return (
    <div className="pageColumn__right">
      <div className="userFormContainer">
        <FormInfo
          title="Recover your username"
          description="Tell us the email address associated with your Reddit account, and we'll send you an email with your username."
        />
        <UserNameForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          email={email}
          emailError={emailError} 
          />
        <BottomHelp />
      </div>
    </div>
  );
}

export default RecoverUsername;
