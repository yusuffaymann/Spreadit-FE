import Image from "next/image";
import React from "react";
import styles from "./SettingItem.module.css";

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


<button role="button" tabindex="0" class="_2iuoyPiKHN3kfOoeIQalDT _2tU8R9NTqhvBrhoNAXWWcP HNozj_dKjQZ59ZsfEegz8 ">Clear history</button>
                <div className={styles.buttonsliderball}></div>

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