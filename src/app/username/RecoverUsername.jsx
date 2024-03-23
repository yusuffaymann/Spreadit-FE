import React, { useState } from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import BottomHelp from "../components/UI/BottomHelp.jsx";
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
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <input
              className={!emailError ? "form-input" : "form-input input-error"}
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={email}
            />
            {emailError ? (
              <p className="error-message">
                {emailError}
              </p>
            ) : null}
          </div>
          <BlueButton>Email Me</BlueButton>
        </form>
        <BottomHelp />
      </div>
    </div>
  );
}

export default RecoverUsername;
