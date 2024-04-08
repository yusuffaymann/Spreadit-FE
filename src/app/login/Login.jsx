import React, { useEffect, useState } from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import ContinueWith from "../components/UI/ContinueWith";
import LoginForm from "./LoginForm.jsx";
import Validation from "../utils/Validation.js";
import "./Login.css";
import { signIn } from "next-auth/react";
import Link from "next/link.js";
import storeCookies from "../utils/storeCookies.js";


function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberme: false,
    usernameExists: false,
    incorrectPassword: false,
  });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  async function handleSubmit(event) {
    await event.preventDefault();
    const valErrors = Validation(formData)
    console.log(valErrors);
    setErrors(valErrors);
    if(valErrors.username === "" && valErrors.password === "")
    {
      await loginSubmit(JSON.stringify(formData));
    }
  }

  const url = "http://localhost:3002/login";
  const loginSubmit = async (values) => {
    console.log(values);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: values,
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if(data.token){
          storeCookies(data.token);
        }
      });
  };

  function HandleRememberMe() {
    setRememberMe(!rememberMe);
  };

  const handleGoogleSignIn = async () => {
    await signIn("google");
  };

  return (
    <div className="pageColumn__right">
      <div className="userFormContainer">
        <FormInfo
          title="Log in"
          description="Tell us the username and email address. By continuing, you agree to our User Agreement and Privacy Policy."
        />
        <ContinueWith handleGoogleSignIn={handleGoogleSignIn}/>
        <p className="or_spliter">______________ OR ______________</p>
        <LoginForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          HandleRememberMe={HandleRememberMe}
          usernameErrors={errors.username}
          passwordErrors={errors.password}
          username={formData.username}
          password={formData.password}
          />
        <div className="bottom-text">
          New to Spreadit?
          <Link href="./signup" className="bottom-link"> SIGN UP </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
