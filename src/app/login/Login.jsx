import React, {useEffect, useState} from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import Validation from "../Validation";
import axios from "axios";
import {auth,provider} from "../config";
import {signInWithPopup} from "firebase/auth";
import Home from "../home/Home";
import "./Login.css";

function Login() {
    const [formData, setFormData] = useState({username: "", password: "",usernameExists: false, incorrectPassword: false})
    const [errors, setErrors] = useState({username: "", password: ""})
    

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

    const [value,setValue]= useState('')
    function handleContinueWith(){
        signInWithPopup(auth, provider).then((data)=>{
           setValue(data.user.email)
           localStorage.setItem("email", data.user.email)
        })
    }

    useEffect(()=>{
         setValue(localStorage.getItem('email'))
    })

    function setCookie(){
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        document.cookie="myusrname="+username+";path=http://localhost:3000/";
        document.cookie="mypswd="+password+";path=http://localhost:3000/";

    }

    const url = "http://localhost:3001/login"
    const loginSubmit = async(values)=>{
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
          }
      
          fetch(url, options).then(response => response.json()).then(data => console.log(data.message));
        };
    

    return (
      <div className="pageColumn__right">
        <div className="userFormContainer"> 
            <FormInfo 
            title="Log in" 
            description="Tell us the username and email address. By continuing, you agree to our User Agreement and Privacy Policy."
            />
            {value? <Home/> : <button className="continue_with" onClick= {handleContinueWith}>Continue with Google</button>}
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
                <input type="checkbox" className="remember_me" onChange={setCookie}/>
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
    );
 }

  export default Login;