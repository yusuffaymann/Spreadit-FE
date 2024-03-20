import React, {useState} from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import Script from 'next/script';
import Home from "../home/Home";
import Validation from "../Validation"
import ContinueWith from "../ContinueWith";
import "./Signup.css";


function Signup() {
    const [formData, setFormData] = useState({username:"", password:"", email:""})
    const [errors, setErrors] = useState({username:"", password:"", email:""})
    const [ googleToken, setGoogleToken]= useState("")

    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}))
    }

    function handleSubmit(event) {
        event.preventDefault()
        loginSubmit(JSON.stringify(formData))
        submitToAPI(formData)
        setErrors(Validation(formData))
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


    return (
      <>
      <Script
         src="https://accounts.google.com/gsi/client"
         strategy="beforeInteractive"
         async
      />
      <div className="pageColumn__right">
        <div className="userFormContainer"> 
            <FormInfo 
            title="Sign up" 
            description="By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy."
            />
            <ContinueWith setGoogleToken= {setGoogleToken}/>
            <p className="or_spliter">______________ OR ______________</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input className="info_holder"
                        name="email" 
                        type="text"
                        placeholder="Email"
                        onChange={handleInputChange} 
                        value={formData.email}
                    />
                     {errors.email && <p className="errors-text">{errors.email}</p>}
                </div>
                <div>
                    <input className="info_holder"
                        name="username" 
                        type="text"
                        value= {formData.username}
                        placeholder="Username"
                        onChange={handleInputChange} 
                    />
                    {errors.username && <p className="errors-text">{errors.username}</p>}
                </div>
                <div>
                    <input className="info_holder"
                        name="password" 
                        type="password" 
                        value= {formData.password}
                        placeholder="Password" 
                        onChange={handleInputChange}
                    />
                    {errors.password && <p className="errors-text">{errors.password}</p>}
                </div>
                <BlueButton>Continue</BlueButton>
            </form>
            <div className="bottom-text">
              Already a spreaditor?
             <a href="#" className="bottom-link"> Log In </a>
            </div>
        </div>
      </div>
      </>
    );
  }

  export default Signup;