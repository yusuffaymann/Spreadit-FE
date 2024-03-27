import React, { useState } from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import BottomHelp from "../components/UI/BottomHelp.jsx";
import submitToApi from "../utils/submitToApi.js";

function ChangePassword() {
  const url = "http://localhost:3002/reset-password";
  const [formData, setFormData] = useState({ password: "", password2: "" });
  const [isEqual, setIsEqual] = useState(true);
  const [isLong, setIsLong] = useState(true);

  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    setIsEqual(true);
    setIsLong(true);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.password2) {
      setIsEqual(false);
      return;
    }
    if (formData.password.length < 8) {
      setIsLong(false);
      return;
    }
    const password = formData.password;
    submitToApi(url, "POST", {password});
    setFormData({ password: "", password2: "" });
  }


  return (
    <div className="pageColumn__right">
      <div className="userFormContainer">
        <FormInfo
          title="Reset your password"
          description="Choose a new password here, then log in to your account."
        />
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <input
              className={isLong ? "form-input" : "form-input input-error"}
              name="password"
              type="password"
              placeholder="New Password"
              onChange={handleInputChange}
              value={formData.password}
            />
            {!isLong ? (
              <p className="error-message">
                Password must be at least 8 characters
              </p>
            ) : null}
          </div>

          <div>
            <input
              className={
                isEqual && isLong ? "form-input" : "form-input input-error"
              }
              name="password2"
              type="password"
              placeholder="Verify Password"
              onChange={handleInputChange}
              value={formData.password2}
            />
            {!isEqual ? (
              <p className="error-message">Passwords do not match</p>
            ) : isLong ? null : (
              <p className="error-message">
                Password must be at least 8 characters
              </p>
            )}
          </div>
          <BlueButton>Set Password</BlueButton>
        </form>
        <BottomHelp> </BottomHelp>
      </div>
    </div>
  );
}

export default ChangePassword;
