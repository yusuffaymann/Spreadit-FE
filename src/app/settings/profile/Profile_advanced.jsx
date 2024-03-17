import Image from "next/image";
import React from "react";
import SettingItem from "../../components/UI/SettingItem.jsx"
import optionData from "../feed/options.js";

export default function ProfileAdvanced()
{
    return (
      <div>
        {optionData.map(option => (
                    option.id === 14 && <SettingItem key={option.id} option={option} />
                ))}
        
        {optionData.map(option => (
                    option.id === 15 && <SettingItem key={option.id} option={option} />
                ))}

{optionData.map(option => (
                    option.id === 16 && <SettingItem key={option.id} option={option} />
                ))}

{optionData.map(option => (
                    option.id === 17 && <SettingItem key={option.id} option={option} />
                ))}
        </div>
    )
}