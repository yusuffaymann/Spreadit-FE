import Image from "next/image";
import React from "react";
import styles from "./SettingItem.module.css";
import Switch from "./Switch"
import Dropdown from "./Dropdown"
import OutlineButton from "./OutlineButton"

export default function SettingItem({ option })
{
  console.log(option.subOptions)

    return (
<div>
      <div className={styles.settingOption} >
        <div className={styles.settingOptionLeft}>
          <h3 className="settings--h3">{option.title}</h3>
          <p className="settings--p">{option.description}</p>
        </div>
          <div className={styles.settingOptionRight}>
            <div className={styles.settingOptionRightButtonFloat}>

            {option.type === 'switch' && <Switch />}
            {option.type === 'dropdown' && <Dropdown pId = {option.id} />}
            {option.type === 'button' && <OutlineButton> {option.buttontext} </OutlineButton>}



            </div>
          </div>
        
      </div>
      {option.subOptions &&
        option.subOptions.map((subOption) => (
          <div className={styles.settingSuboption}>
          <SettingItem key={subOption.id} option={subOption} />
          </div>
        ))}
    </div>
 
    )
}