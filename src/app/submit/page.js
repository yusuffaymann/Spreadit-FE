'use client'
import SettingItem from "../components/UI/SettingItem.jsx"
import CreateLeftHeader from "./CreateLeftHeader.jsx";
import CreateLeftDropdown from "./CreateLeftDropdown.jsx";
import CreateRightRules from "./CreateRightRules.jsx";

function Submit() {
    return (
      <main className="create">
      <div className="createMainFlex">
        <div className="createLeftFlex">
            <CreateLeftHeader />
            <CreateLeftDropdown />
          <h1 className="contentBelow"> Big textbox goes here</h1>
          
        </div>
        <div className="createRightFlex">
        <div className="createRightFlexPadding">
          <CreateRightRules />
          </div>  
        </div>
      </div>
    </main>
    )
};

export default Submit