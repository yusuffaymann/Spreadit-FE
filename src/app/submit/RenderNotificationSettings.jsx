import React, { useState } from "react";
import "./Create.css";
import styles from "./RenderNotificationSettings.module.css";
import Checkbox from "../components/UI/Checkbox";


function RenderNotificationSettings({notify, setNotify}) {
  return (
    <div className={`${styles.notificationSettingsContainer}`}>
      <div className={`${styles.notificationSettingsContent}`}>
        <div className={`${styles.notificationSettingsInnerFlex}`}>
        <div className={`${styles.notificationSettingsOption}`}>
          <Checkbox onToggle={setNotify} isChecked={notify} label={"Send me post reply notifications"} />
        </div>
        <div className={`${styles.notificationSettingsAction}`}>
          <a
            href="/settings#connected-accounts"
            className="create--link"
            rel="noopener nofollow ugc"
            target="_blank"
          >
            Connect accounts to share your post
          </a>
        </div>
        </div>
        <div class="_1rdhEwGT1578MFV4zdgyXX"></div>
      </div>
    </div>
  );
}

export default RenderNotificationSettings;
