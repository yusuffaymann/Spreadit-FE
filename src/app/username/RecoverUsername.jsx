import React, {useState} from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import BottomHelp from "../components/UI/BottomHelp.jsx";

function RecoverUsername() {
    const [email, setEmail] = useState("")

    function handleInputChange(event) {
        const {value} = event.target;
        console.log(value)
        setFormData(value)
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
            title="Recover your username" 
            description="Tell us the email address associated with your Reddit account, and we'll send you an email with your username."
            />
            <form onSubmit={handleSubmit}>
                <div>
                    <input name="email" 
                        type="text" 
                        placeholder="Email" 
                        onChange={handleInputChange}
                    />
                </div>
                <BlueButton>Email Me</BlueButton>
                <a href="#" className="bottom-link">forgot username?</a>
            </form>
            <BottomHelp />
        </div>
      </div>
    );
  }

  export default RecoverUsername;