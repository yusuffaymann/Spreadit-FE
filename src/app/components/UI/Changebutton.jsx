import React from "react";
import  Styles from "./Changebutton.module.css";

const Changeemailpassword= (props)=>{
    return(
      <div className={Styles.smallcontainer}>
        <div className={Styles.changecontainer}>
          <h3 className={Styles.subsectiontitle}>{props.type}</h3>
          <button className={Styles.brightbutton} onClick={() => {props.activate()}}>{props.display}</button>
        </div>
        <p className={Styles.description}>{props.description}</p>
      </div>
    );
  }
  export default Changeemailpassword;
