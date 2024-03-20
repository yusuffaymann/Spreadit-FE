import Image from "next/image";
import React from "react";
import SettingItem from "../../components/UI/SettingItem.jsx"
import optionData from "../options.js";

export default function ProfileAdvanced(props)
{
    return (
      <div>
        {optionData.map(option => (
                    (option.id < 18) && (13 < option.id ) && <SettingItem key={option.id} option={option} onItemClick={props.clickEvent} 
                    isLocked={props.lockedList[option.id]}/>
                ))}
        </div>
    )
}