import React, { useState } from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import BottomHelp from "../components/UI/BottomHelp.jsx";

function ResetPassword() {
  const [formData, setFormData] = useState({ username: "", email: "" });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitToAPI(formData);
    setFormData({ username: "", email: "" });
  }

  function submitToAPI(formData) {
    console.log("data submitted");
  }

  return (
    <div className="pageColumn__right">
      <div className="userFormContainer">
        <FormInfo
          title="Reset your password"
          description="Tell us the username and email address associated with your Reddit account, and we'll send you an email with a link to reset your password."
        />
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <input
              className="form-input"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <input
              className="form-input"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </div>
          <BlueButton>Reset Password</BlueButton>
          <a href="#" className="bottom-link">
            forgot username?
          </a>
        </form>
        <BottomHelp />
      </div>
    </div>
  );
}

export default ResetPassword;
