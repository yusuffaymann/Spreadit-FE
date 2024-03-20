import React from "react";
import { useState } from 'react';
import  Styles from "./Listbutton.module.css";

const Changegendercountry= (props)=>{
    const [showList, setShowList] = useState(false);
    const [selectedItem, setSelectedItem] = useState(props.initialv);


    const ref = useRef(null);

    useEffect(() => {
      const handleOutSideClick = (event) => {
        if (!ref.current?.contains(event.target)) {;
          setShowList(false);
        }
      };
  
      window.addEventListener("mousedown", handleOutSideClick);
  
      return () => {
        window.removeEventListener("mousedown", handleOutSideClick);
      };
    }, [ref]);
  
    const handleItemClick = (item) => {
      setSelectedItem(item)
      setShowList(false);
    };
  
    return(
      <div className={Styles.smallcontainer}>
        <div className={Styles.changecontainer}>
          <div className={Styles.text}>
            <h3 className={Styles.subsectiontitle}>{props.type}</h3>
            <p className={Styles.description}>{props.description}</p>
          </div>
          <div className={Styles.list}>
            <button className={`${Styles.openlistbutton} ${props.displayedColor === "blue" ? Styles.blueButton : Styles.greyButton}`} onClick={()=> setShowList(!showList)} >{selectedItem}</button>
              {showList && (
            <ul className={Styles.unorderedlist} ref = {ref} >
              {props.list.map((item, index) => (
                <li className={`${Styles.listitem} ${selectedItem === item ? Styles.selected : ""}`} key={index} onClick={() => handleItemClick(item)} >
                  {item}
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>    
      </div>
      
    );
  }

  export default Changegendercountry;
