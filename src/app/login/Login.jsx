import React, { useEffect, useState } from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import Validation from "../utils/Validation.js";
import "./Login.css";
import { signIn } from "next-auth/react";
import Link from "next/link.js";


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


  const url = "http://localhost:3001/login";
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
      .then((data) => console.log(data));
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
        <button className="continue_with" onClick={handleGoogleSignIn}>Sign in with Google</button>
        <p className="or_spliter">______________ OR ______________</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="info_holder"
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleInputChange}
            />
            {errors.username && (
              <p className="errors-text">{errors.username}</p>
            )}
          </div>

          <div>
            <input
              className="info_holder"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="errors-text">{errors.password}</p>
            )}
          </div>
          <input
            type="checkbox"
            className="remember_me"
            onChange={HandleRememberMe}
          />
          <label className="remember_me_label">Remember me</label>
          <BlueButton>Log in</BlueButton>
          <div className="bottom-text">
            <span className="link-text">Forgot your </span>
            <Link href="./username" className="bottom-link">
              username
            </Link>
            <span className="link-text"> or </span>
            <Link href="./password" className="bottom-link">
              password
            </Link>
            <span className="link-text">? </span>
          </div>
        </form>
        <div className="bottom-text">
          New to Spreadit?
          <Link href="./signup" className="bottom-link"> SIGN UP </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
