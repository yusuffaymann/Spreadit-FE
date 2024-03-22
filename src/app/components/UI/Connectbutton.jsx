import React from "react";
import { useState,useEffect } from 'react';
import Image from "next/image";
import mailp from "../../assets/mailimage.png"
import googlep from "../../assets/Google.png"
import Styles from "./Connectbutton.module.css"

const Connectbutton=(props)=>{
    const [currentPassword, setCurrentPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    let connected=props.condition;
    const [isConnected,setIsConnected]=useState(connected);
   
    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };
    const isButtonDisabled = currentPassword === '';
    const handleSubmit = (event) => {
        event.preventDefault();
        if (currentPassword.trim().length < 8) {
            setIsPasswordValid(false);
            setPasswordErrorMessage('Password must be at least 8 characters long.');
          }
          else{
            setIsPasswordValid(true);
            setPasswordErrorMessage('');
          }
          if(isPasswordValid){
            setIsFormValid(true);
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
            setPasswordErrorMessage('Incorrect password.');
          }else{
            setIsConnected(false);
            alterconnect(false); 
            closeModal();  
          }
        } catch (error) {
          console.error('Error ', error.message);
        }
      }
      async function alterconnect(isConnected) {
        try {
            const response = await fetch('http://localhost:3002/settings/account', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    connected: isConnected
                })
            });
      
            if (!response.ok) {
                throw new Error('Failed to alter connection');
            }
            console.log("connected changed to "+isConnected);
        } catch (error) {
            console.error('Error altering connection:', error.message);
        }
      }
      useEffect(() => {
        // Submit form 
        if (isFormValid&&isPasswordValid) {
              checkpassword(); 
            }
      }, [isFormValid, isPasswordValid]);
    const openModal = (event) => {
        handleCurrentPasswordChange(event);
        setIsFormValid(false);
        setShowModal(true);
    };
    
    const closeModal = () => {
        setShowModal(false);
        setIsPasswordValid(true);
        setIsFormValid(false);
    };
    return(
        <div className={Styles.smallcontainer}>
            <div className={Styles.changecontainer}>
                <div className="labeldescription">
                    <h3 className={Styles.subsectiontitle}>Connect to {props.type}</h3>
                    <p className={Styles.description}>{props.description}</p>
                </div>
                {!isConnected&&<button className={Styles.connectbutton}><Image src={googlep} className={Styles.picture} /> Connect to {props.type}</button>}
                {isConnected&&<button className={Styles.disconnectbutton} onClick={openModal}>(disconnect)</button>}
            </div>
            {showModal && (
            <div className={Styles.modaloverlay}>
                <div className={Styles.modal}>
                <button className={Styles.Xbutton} onClick={closeModal}>X</button>
                <Image className={Styles.mailimage} src={mailp} alt=""/>
                <h2 className={Styles.connectformlabel}>Disconnect {props.type} Account</h2>
                <p>To continue, confirm your password.</p>
                <form>
                    <div className={Styles.connectform}>
                        <input className={isPasswordValid ? Styles.inputs : Styles.invalidInput} type="password" required placeholder="PASSWORD" onChange={handleCurrentPasswordChange} ></input>
                        {!isPasswordValid && <p className={Styles.errorMessage}>{passwordErrorMessage}</p>}
                        <div className={Styles.leftflex}>
                            <button className={Styles.brightbutton} onClick={closeModal}>CANCEL</button>
                            <button className={Styles.darkbutton} disabled={isButtonDisabled} onClick={handleSubmit}>Reset password</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
            )}
        </div>
    );
}

export default Connectbutton;
