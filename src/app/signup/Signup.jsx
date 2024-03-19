import React, {useState} from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import {auth,provider} from "../config";
import {signInWithPopup} from "firebase/auth";
import Home from "../home/Home";
import Validation from "../Validation"
import "./Signup.css";


function Signup() {
    const [formData, setFormData] = useState({email:""})
    const [errors, setErrors] = useState({email:""})

    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}))
    }

    function handleSubmit(event) {
        event.preventDefault()
        loginSubmit(formData)
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

    const url = "http://localhost:3001/signup"
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
            title="Sign up" 
            description="By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy."
            />
          {value? <Home/> : <button className="continue_with" onClick= {handleContinueWith}>Continue with Google</button>}
            <p className="or_spliter">______________ OR ______________</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input className="info_holder"
                        name="email" 
                        type="text"
                        placeholder="Email"
                        onChange={handleInputChange} 
                    />
                     {errors.email && <p className="errors-text">{errors.email}</p>}
                </div>

                <BlueButton>Continue</BlueButton>
            </form>
            <div className="bottom-text">
              Already a spreaditor?
             <a href="#" className="bottom-link"> Log In </a>
            </div>
        </div>
      </div>
    );
  }

  export default Signup;