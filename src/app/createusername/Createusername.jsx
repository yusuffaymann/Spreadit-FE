import React, {useState} from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import BlueButton from "../components/UI/BlueButton.jsx";
import Validation from "../Validation"
import "./Createusername.css";

function Createusername() {
    const [formData, setFormData] = useState({username: "", password: "", usernameTaken: false})
    const [errors, setErrors] = useState({username: "", password: ""})

    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}))
    }
   
    function handleSubmit(event) {
        submitToAPI(formData)
        event.preventDefault()
        setErrors(Validation(formData))
    }

    function submitToAPI(formData) {
        console.log("data submitted")
    }

    return (
      <div className="pageColumn__right">
        <div className="userFormContainer"> 
            <FormInfo 
            title="Create your username and password" 
            description="Spreadit is anonymous, so your username is what you’ll go by here. Choose wisely—because once you get a name, you can’t change it."
            />
            <form onSubmit={handleSubmit}>
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
        </div>
      </div>
    );
  }

  export default Createusername;