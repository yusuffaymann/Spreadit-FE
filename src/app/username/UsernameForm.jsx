import React from "react";
import BlueButton from "../components/UI/BlueButton";

export default function UserNameForm({handleSubmit, handleInputChange, email, emailError}) {
        return(
                <form className="form" onSubmit={handleSubmit}>
                    <div>
                        <input
                            className={!emailError ? "form-input" : "form-input input-error"}
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            value={email}
                        />
                        {emailError ? (
                            <p className="error-message">
                                {emailError}
                            </p>
                        ) : null}
                    </div>
                    <BlueButton>Email Me</BlueButton>
                </form>
        
     ) }
