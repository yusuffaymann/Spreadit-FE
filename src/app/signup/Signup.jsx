import React, {useState} from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import ContinueWith from "../components/UI/ContinueWith";
import SignupForm from "./SignupForm.jsx";
import Validation from "../utils/Validation.js"
import "./Signup.css";
import Link from "next/link.js";


function Signup() {
    const [formData, setFormData] = useState({username:"", password:"", email:""})
    const [errors, setErrors] = useState({username:"", password:"", email:""})

    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}))
    }

    async function handleSubmit(event) {
      await event.preventDefault();
      const valErrors = Validation(formData)
      console.log(valErrors);
      setErrors(valErrors);
      if(valErrors.username === "" && valErrors.password === "" && valErrors.email === "")
      {
        await loginSubmit(JSON.stringify(formData));
      }
    }

    function submitToAPI(formData) {
        console.log("data submitted")
    }

    const url = "http://localhost:3001/signup"
    const loginSubmit = async(values)=>{
      console.log(values)
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: values
          }
           fetch(url, options).then(response => response.json()).then(data => console.log(data.message));
        };

    const handleGoogleSignIn = async () => {
      await signIn("google");
     };

    return (
      <div className="pageColumn__right">
        <div className="userFormContainer"> 
            <FormInfo 
            title="Sign up" 
            description="By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy."
            />
             <ContinueWith handleGoogleSignIn={handleGoogleSignIn}/>
            <p className="or_spliter">______________ OR ______________</p>
            <SignupForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          emailErrors={errors.email}
          usernameErrors={errors.username}
          passwordErrors={errors.password}
          username={formData.username}
          password={formData.password}
          email={formData.email}
          />
            <div className="bottom-text">
              Already a spreaditor?
             <Link href="./login" className="bottom-link"> Log In </Link>
            </div>
        </div>
      </div>
    );
  }

  export default Signup;