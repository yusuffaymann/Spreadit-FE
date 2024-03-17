import Image from "next/image";
import React from "react";
import SettingItem from "../../components/UI/SettingItem.jsx"

export default function ProfileAdvanced()
{
    return (
      <div>
        <SettingItem option={{
            id: 14,
            title: "Allow people to follow you",
            description: "Followers will be notified about posts you make to your profile and see them in their home feed.",
          }}/>
        
        <SettingItem option={{
            id: 15,
            title: "Content visibility",
            description: <>
            Posts to this profile can appear in <a href="/all">r/all</a> and your profile can be discovered in <a href="/users">/users</a>
            </>,
          }}/>

        <SettingItem option={{
            id: 16,
            title: "Active in communities visibility",
            description: "Show which communities I am active on my profile.",
          }}/>

        <SettingItem option={{
            id: 17,
            title: "Clear history",
            description: "Delete your post views history.",
          }}/>
        </div>
    )
}