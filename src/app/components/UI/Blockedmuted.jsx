import React from "react";
import Image from "next/image";
import pathPP1 from "../../assets/PP1.png"
import pathPP2 from "../../assets/PP2.png" 
import styles from "./Blockedmuted.module.css"
const Blockedmuted=(props)=>{
    const removeProfile = () => {
        props.onRemove(props.profilename); // Call the function passed from the parent component
    };
    return(
        <div className={styles.smallcontainer}>
            <div className={styles.removecontainer}>
                <div className={styles.smallprofile} onClick={() => alert("redirect me to this profile")}>
                    <Image className={styles.smallprofilepicture} src={props.path==1? pathPP1 : pathPP2} alt="" />
                    <p className={styles.profilename}>{props.profilename}</p>
                </div>
                <button className={styles.removebutton} onClick={removeProfile}>REMOVE</button>
            </div>
        </div>
    );
}

export default Blockedmuted;
