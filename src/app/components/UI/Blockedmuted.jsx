import React from "react";
import styles from "./Blockedmuted.module.css"
const Blockedmuted=(props)=>{
    const removeProfile = () => {
        props.onRemove(props.profilename); // Call the function passed from the parent component
    };
    return(
        <div className={styles.smallcontainer}>
            <div className={styles.removecontainer}>
                <div className={styles.smallprofile} onClick={() => alert("redirect me to this profile")}>
                    <img className={styles.smallprofilepicture} src={props.link} alt=""></img>
                    <p className={styles.profilename}>{props.profilename}</p>
                </div>
                <button className={styles.removebutton} onClick={removeProfile}>REMOVE</button>
            </div>
        </div>
    );
}

export default Blockedmuted;