import React, {useState} from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
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
      if(valErrors.username === "" && valErrors.password === "")
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
             <button className="continue_with" onClick={handleGoogleSignIn}>Sign in with Google</button>
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
             <Link href="./login" className="bottom-link"> Log In </Link>
            </div>
        </div>
      </div>
    );
  }

  export default Signup;