import React, {useState} from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import BottomHelp from "../components/UI/BottomHelp.jsx";

function ChangePassword() {
    const [formData, setFormData] = useState({password: "", password2: ""})

    function handleInputChange(event) {
        const {name, value} = event.target;
        console.log(name, value)
        setFormData(prevFormData => ({...prevFormData, [name]: value}))
    }

    function handleSubmit(event) {
        event.preventDefault()
        submitToAPI(formData)
        setFormData({password: "", password2: ""})
    }

    function submitToAPI(formData) {
        console.log("data submitted")
    }

    return (
      <div className="pageColumn__right">
        <div className="userFormContainer"> 
            <FormInfo 
            title="Reset your password" 
            description="Choose a new password here, then log in to your account."
            />
            <form onSubmit={handleSubmit}>
                <div>
                    <input name="password" 
                        type="password"
                        placeholder="New Password"
                        onChange={handleInputChange}
                        value={formData.password} 
                    />
                </div>

                <div>
                    <input name="password2" 
                        type="password" 
                        placeholder="Verify Password" 
                        onChange={handleInputChange}
                        value={formData.password2}
                    />
                </div>
                <BlueButton>Set Password</BlueButton>
            </form>
            <BottomHelp> </BottomHelp>
        </div>
      </div>
    );
  }

  export default ChangePassword;