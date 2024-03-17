'use client'
import SettingItem from "../../components/UI/SettingItem.jsx";
import optionData from "./options.js";

function Home() {
    return (
    <div className="settings--container">
    <div className="settings--content">
          <h2 className="settings--h2">Feed settings</h2>
          <h3 className="uppercase-h3-description">Content Preferences</h3>
          {optionData.map(option => (
                    option.id < 12 && <SettingItem key={option.id} option={option} />
                ))}
        <h3 className="uppercase-h3-description">Post Preferences</h3>
        {optionData.map(option => (
                    option.id === 12 && <SettingItem key={option.id} option={option} />
                ))}
    </div>
    </div>
    )
};

export default Home