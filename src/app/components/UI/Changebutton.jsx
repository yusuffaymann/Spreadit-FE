import React from "react";
import Image from "next/image";
import mailp from "../../assets/mailimage.png"
import { useState,useEffect } from 'react';
import  Styles from "./Changebutton.module.css";

const Changeemailpassword= (props)=>{
    const [currentPassword, setCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    
    const handleCurrentPasswordChange = (event) => {
      setCurrentPassword(event.target.value);
    };
  
    const handleNewEmailChange = (event) => {
      setNewEmail(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Validate password
      if (currentPassword.trim().length < 8) {
        setIsPasswordValid(false);
        setPasswordErrorMessage('Password must be at least 8 characters long.');
      }else{
        setIsPasswordValid(true);
        setPasswordErrorMessage('');
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)) {
        setIsEmailValid(false);
      } else {
        setIsEmailValid(true);
      }
      if(isEmailValid&&isPasswordValid){
        setIsFormValid(true);
      }
      if(isPasswordValid&&props.type==="Password"){
        setIsEmailValid(true);
        setIsFormValid(true);
      }
    }
    async function updateEmail(newEmail) {
      try {
          const response = await fetch('http://localhost:3001/settings/account', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email: newEmail
              })
          });
    
          if (!response.ok) {
              throw new Error('Failed to change email');
          }
    
          //const data = await response.json();
          console.log("email changed to "+newEmail);
      } catch (error) {
          console.error('Error updating email:', error.message);
      }
    } 
    async function post(url, data) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        return response;
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to make POST request');
      }
    }
    async function checkpassword() {
      try {
        const response = await post('http://localhost:3001/settings/layout/check-password',{currentPassword});
        if (!response.ok) {
          setIsPasswordValid(false);
          setPasswordErrorMessage('Incorrect password.');
        }else{
          if(props.type==="Email address"){
            updateEmail(newEmail);   
            closeModal();
          }
          if(props.type==="Password"){
            console.log("updated password");
            closeModal();
          }   
        }
      } catch (error) {
        console.error('Error ', error.message);
      }
    }       
    useEffect(() => {
      // Submit form 
      if (isFormValid&&isEmailValid&&isPasswordValid) {
        checkpassword(); 
      }
    }, [isFormValid, isPasswordValid, isEmailValid]);
    // Disable the button if either input is empty
    const isButtonDisabled = currentPassword === '' || newEmail === '';
    const isButtonDisabled2 = currentPassword === '';
  
  
    const openModal = (event) => {
      setIsFormValid(false);
      handleCurrentPasswordChange(event);
      handleNewEmailChange(event);
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
      setIsPasswordValid(true);
      setIsEmailValid(true);
      setIsFormValid(false);
    };
  
    return(
      <div className={Styles.smallcontainer}>
        <div className={Styles.changecontainer}>
          <h3 className={Styles.subsectiontitle}>{props.type}</h3>
          <button className={Styles.brightbutton} onClick={openModal}>change</button>
        </div>
        <p className={Styles.description}>{props.description}</p>
        {props.type==="Email address" &&showModal && (
          <div className={Styles.modaloverlay}>
            <div className={Styles.modal}>
              <button className={Styles.Xbutton} onClick={closeModal}>X</button>
              <Image className={Styles.mailimage} src={mailp} alt="" />
              <h2 className={Styles.changeformlabel}>Update your email</h2>
              <p>Update your email below. There will be a new verification email sent that you will need to use to verify this new email.</p>
              <form>
                <div className={Styles.updateemailform}>
                  <input className={isPasswordValid ? Styles.inputs : Styles.invalidInput} type="password" required placeholder="CURRENT PASSWORD" onChange={handleCurrentPasswordChange}></input>
                  {!isPasswordValid && <p className={Styles.errorMessage}>{passwordErrorMessage}</p>}
                  <input className={isEmailValid ? Styles.inputs : Styles.invalidInput} type="email" required placeholder="NEW EMAIL" onChange={handleNewEmailChange}></input>
                  {!isEmailValid && <p className={Styles.errorMessage}>Please enter a valid email address.</p>}
                  <div className={Styles.leftflex}>
                    <button className={Styles.darkbutton} disabled={isButtonDisabled} onClick={handleSubmit} >Save email</button>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
        )}
        {props.type==="Password" &&showModal && (
          <div className={Styles.modaloverlay}>
            <div className={Styles.modal}>
              <button className={Styles.Xbutton} onClick={closeModal}>X</button>
              <Image className={Styles.mailimage} src={mailp} alt=""/>
              <h2 className={Styles.changeformlabel}>Change the password</h2>
              <p>Enter the old password</p>
              <form>
                <div className={Styles.changepasswordform}>
                  <input className={isPasswordValid ? Styles.inputs : Styles.invalidInput} type="password" required placeholder="CURRENT PASSWORD" onChange={handleCurrentPasswordChange} ></input>
                  {!isPasswordValid && <p className={Styles.errorMessage}>{passwordErrorMessage}</p>}
                  <div className={Styles.leftflex}>
                    <button className={Styles.darkbutton} disabled={isButtonDisabled2} onClick={handleSubmit}>Reset password</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default Changeemailpassword;