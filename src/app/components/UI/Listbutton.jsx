import React from "react";
import { useState } from 'react';
import  Styles from "./Listbutton.module.css";

const Changegendercountry= (props)=>{
    const [showList, setShowList] = useState(false);
    const [Ygender,setYgender]=useState(props.initialv);
  
    const handleItemClick = (item) => {
      setYgender(item);
      setShowList(false);
    };
  
    return(
      <div className={Styles.smallcontainer}>
        <div className={Styles.changecontainer}>
          <h3 className={Styles.subsectiontitle}>{props.type}</h3>
          <div className={Styles.list}>
            <button className={Styles.openlistbutton} onClick={()=> setShowList(!showList)} >{Ygender}</button>
              {showList && (
            <ul className={Styles.unorderedlist}>
              {props.list.map((item, index) => (
                <li className={Styles.listitem} key={index} onClick={() => handleItemClick(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>    
        <p className={Styles.description}>This information may be used to improve your recommendations and ads.</p>
      </div>
      
    );
  }

  export default Changegendercountry;