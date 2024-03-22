"use client"
import React, { useState } from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import BottomHelp from "../components/UI/BottomHelp.jsx";
import submitToApi from "../utils/submitToApi.js";
import { useRouter } from "next/navigation";
import Link from "next/link.js";

function ResetPassword() {
  const url = "http://localhost:3002/forgot-password";
  const [formData, setFormData] = useState({ username: "", email: "" });
  const router = useRouter();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const responseData = await submitToApi(url, "POST", formData);
    await console.log(responseData);
    await setFormData({ username: "", email: "" });
    if (responseData.message) {
      router.push("/newpassword");
    }
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
              value={formData.username}
            />
          </div>

          <div>
            <input
              className="form-input"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </div>
          <BlueButton>Reset Password</BlueButton>
          <Link href="./username" className="bottom-link">
            forgot username?
          </Link>
        </form>
        <BottomHelp />
      </div>
    </div>
  );
}

export default ResetPassword;
