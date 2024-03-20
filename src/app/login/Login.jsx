import React, { useEffect, useState} from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import Validation from "../Validation";
import ContinueWith from "../ContinueWith";
import Script from 'next/script';
import "./Login.css";

function Login() {
    const [formData, setFormData] = useState({username: "", password: "", rememberme: false ,usernameExists: false, incorrectPassword: false})
    const [errors, setErrors] = useState({username: "", password: ""})
    const [ googleToken, setGoogleToken]= useState("")
    const [rememberMe, setRememberMe] = useState(false)
    

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
    
    const url = "http://localhost:3001/login"
    const loginSubmit = async(values)=>{
      console.log(values)
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: values
          }
           fetch(url, options).then(response => response.json()).then(data => console.log(data));
        }

     function HandleRememberMe (){
          setRememberMe(!rememberMe);
         }


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
            title="Log in" 
            description="Tell us the username and email address. By continuing, you agree to our User Agreement and Privacy Policy."
            />
            <ContinueWith setGoogleToken= {setGoogleToken}/>
            <p className="or_spliter">______________ OR ______________</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input className="info_holder"
                        name="username" 
                        type="text"
                        placeholder="Username"
                        onChange={handleInputChange} 
                    />
                  {errors.username && <p className="errors-text">{errors.username}</p>}
                </div>

                <div>
                    <input className="info_holder"
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        onChange={handleInputChange}
                    />
                    {errors.password && <p className="errors-text">{errors.password}</p>}
                </div>
                <input type="checkbox" className="remember_me" onChange={HandleRememberMe}/>
                <label className="remember_me_label">Remember me</label>
                <BlueButton>Log in</BlueButton>
                <div className="bottom-text">
                    <span className="link-text">Forgot your </span>
                    <a href="#" className="bottom-link">username</a>
                    <span className="link-text"> or </span>
                    <a href="#" className="bottom-link">password</a>
                    <span className="link-text">? </span>
                </div>
            </form>
            <div className="bottom-text">
               New to Spreadit?
             <a href="#" className="bottom-link"> SIGN UP</a>
            </div>
        </div>
      </div>
      </>
    );
 }

  export default Login;