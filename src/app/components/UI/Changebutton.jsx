import React from "react";
import { useState,useEffect } from 'react';
import ChangeEmailmodal from "./ChangeEmailModal";
import ChangePasswordModal from "./ChangePasswordModal";
import  Styles from "./Changebutton.module.css";

const Changeemailpassword= (props)=>{
    const [showModal,setShowModal]=useState(false);

    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    return(
      <div className={Styles.smallcontainer}>
        <div className={Styles.changecontainer}>
          <h3 className={Styles.subsectiontitle}>{props.type}</h3>
          <button className={Styles.brightbutton} onClick={openModal}>change</button>
        </div>
        <p className={Styles.description}>{props.description}</p>
        {props.type==="Email address" &&showModal && (<ChangeEmailmodal close={()=>closeModal()} />) }
        {props.type==="Password" &&showModal && (<ChangePasswordModal close={()=>closeModal()} />)}
      </div>
    );
  }

  export default Changeemailpassword;
