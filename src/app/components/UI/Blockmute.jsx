import React from "react";
import { useState } from 'react';
import styles from "./Blockmute.module.css";

const Blockmute =(props)=>{
    const [name, setname] = useState('');
    const handlenameChange = (event) => {
        setname(event.target.value);
    };
    const handleAdd = (event) => {
        event.preventDefault();
    }
    const isButtonDisabled = name === '';

    return(
        <div className={styles.smallcontainer}>
            <p className={styles.subsectiontitle}>{props.type}</p>
            <p className={styles.description}>{props.description}</p>
            <div className={styles.addboxcontainer}>
                <div className={styles.inputwrap}>
                    <input className={styles.inputbox} required placeholder=" " onChange={handlenameChange}></input>
                    <label for="">{props.inputmsg}</label>
                </div>
                <button className={styles.addbutton} disabled={isButtonDisabled} onClick={handleAdd}>ADD</button>
            </div>
        </div>
    );
}

export default Blockmute;