import React, {useState} from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";

function ResetPassword() {
    const [formData, setFormData] = useState({username: "", email: ""})

    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}))
    }

    function handleSubmit(event) {
        submitToAPI(formData)
    }

    function submitToAPI(formData) {
        console.log("data submitted")
    }

    return (
      <div className="pageColumn__right">
        <div className="userFormContainer"> 
            <FormInfo 
            title="Reset your password" 
            description="Tell us the username and email address associated with your Reddit account, and we'll send you an email with a link to reset your password."
            />
            <form onSubmit={handleSubmit}>
                <div>
                    <input name="username" 
                        type="text"
                        placeholder="Username"
                        onChange={handleInputChange} 
                    />
                </div>

                <div>
                <input name="email" 
                    type="text" 
                    placeholder="Email" 
                    onChange={handleInputChange}
                />
                </div>
                <BlueButton>Reset Password</BlueButton>
            </form>
        </div>
      </div>
    );
  }

  export default ResetPassword;