import React from "react";
import Image from "next/image";
import logo from "../../assets/logoSpreadIt.svg"
import styles from "./FormInfo.module.css"

function FormInfo({title, description}) {
    return (
      <div> 
        <div className="form_logo">
            <Image src={logo} alt="Spreadit Logo." height={40}/>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    );
  }

  export default FormInfo; 