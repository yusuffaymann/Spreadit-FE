import React from "react";
import SideArt from "./SideArt";
import FormInfo from "../form/FormInfo";
import Toogle from "./Switch";
import { useState,useEffect } from 'react';
import Styles from "./ChangePasswordModal.module.css"

const ChangePasswordModal =(props)=>{
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [newPassword2, setnewPassword2] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
    const [isNewPassword2Valid, setIsNewPassword2Valid] = useState(true);
    const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] = useState('');
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('');
    const [newPassword2ErrorMessage, setNewPassword2ErrorMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    
    const handleCurrentPasswordChange = (event) => {
      setCurrentPassword(event.target.value);
    };

    const handlenewPasswordChange = (event) => {
      setnewPassword(event.target.value);
    };
    const handlenewPassword2Change = (event) => {
      setnewPassword2(event.target.value);
    };

    const handleclose=()=>{
        setIsPasswordValid(true);
        setIsNewPasswordValid(true);
        setIsNewPassword2Valid(true);
        setIsFormValid(false);
        props.close();
        setIsFormValid(false);
    }
    
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Validate password
      if (currentPassword.trim().length < 8) {
        setIsPasswordValid(false);
        setCurrentPasswordErrorMessage('Password must be at least 8 characters long.');
      }else{
        setIsPasswordValid(true);
        setCurrentPasswordErrorMessage('');
      }
      if (newPassword.trim().length < 8) {
        setIsNewPasswordValid(false);
        setNewPasswordErrorMessage('Password must be at least 8 characters long.');
      }else{
        setIsNewPasswordValid(true);
        setNewPasswordErrorMessage('');
      }
      if (newPassword2.trim().length < 8) {
        setIsNewPassword2Valid(false);
        setNewPassword2ErrorMessage('Password must be at least 8 characters long.');
      }else if(newPassword2!=newPassword){
        setIsNewPassword2Valid(false);
        setNewPassword2ErrorMessage("Passwords doesnt match");  
      }
      else{
        setIsNewPassword2Valid(true);
        setNewPassword2ErrorMessage('');
      }

      if(isPasswordValid&&isNewPasswordValid&&isNewPassword2Valid){
        setIsFormValid(true);
      }
    }
    async function updatePassword(newPassword) {
      try {
          const response = await fetch('http://localhost:3002/settings/account', {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  password: newPassword
              })
          });
    
          if (!response.ok) {
              throw new Error('Failed to change password');
          }
          console.log("password changed to "+newPassword);
      } catch (error) {
          console.error('Error changing password:', error.message);
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
        const response = await post('http://localhost:3002/settings/layout/check-password',{currentPassword});
        if (!response.ok) {
          setIsPasswordValid(false);
          setCurrentPasswordErrorMessage('Incorrect password.');
        }else{
            updatePassword(newPassword);   
            handleclose();
        }
      } catch (error) {
        console.error('Error ', error.message);
      }
    }       
    useEffect(() => {
      // Submit form 
      if (isFormValid&&isPasswordValid&&isNewPasswordValid&&isNewPassword2Valid) {
        checkpassword(); 
      }
    }, [isFormValid, isPasswordValid,isNewPasswordValid,isNewPassword2Valid]);

    return(
        <div className={Styles.modaloverlay}>
        <div className={Styles.passwordmodal}>
          <div className={Styles.rowflex}>
            <SideArt className="modal-art" />
            <div className={Styles.formcontainer}>
              <FormInfo title="Update your password" description=""/>
              <div className={Styles.inputwrap}>
                <input className={isPasswordValid ? Styles.inputs : Styles.invalidInput} type="password" required placeholder=" " onChange={handleCurrentPasswordChange}></input>
                <label htmlFor="">OLD PASSWORD</label>
                {!isPasswordValid && <p className={Styles.errorMessage}>{currentPasswordErrorMessage}</p>}
              </div>
              <div className={Styles.inputwrap}>
                <input className={isNewPasswordValid ? Styles.inputs : Styles.invalidInput} type="password" required placeholder=" " onChange={handlenewPasswordChange}></input>
                <label htmlFor="">NEW PASSWORD</label>
                {!isNewPasswordValid && <p className={Styles.errorMessage}>{newPasswordErrorMessage}</p>}
              </div>
              <div className={Styles.inputwrap}>
                <input className={isNewPassword2Valid ? Styles.inputs : Styles.invalidInput} type="password" required placeholder=" " onChange={handlenewPassword2Change}></input>
                <label htmlFor="">CONFIRM NEW PASSWORD</label>
                {!isNewPassword2Valid && <p className={Styles.errorMessage}>{newPassword2ErrorMessage}</p>}
              </div>
              <Toogle optionTitle="Log me out everywhere" optionDescription="Changing your password logs you out of all browsers on your device(s). Checking this box also logs you out of all apps you have authorized." />
              <button className={Styles.savebutton} disabled={false} onClick={handleSubmit} >Save</button>
            </div>
          </div>
          <button className={Styles.Xbutton} onClick={handleclose}>X</button>
        </div>
      </div>
    );
}

export default ChangePasswordModal;