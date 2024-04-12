import Image from "next/image";
import React from "react";
import logo from "../assets/logoSpreadIt.svg";
import "./Create.css";
import styles from "./CommunityInfoBox.module.css";

export default function CommunityInfoBox({
  title = "testCom",
  description = "testDesc",
  iconurl = "",
  bannerurl = "",
  membercount = 0,
  datecreated = "testDate",
}) {
  return (
    <div className={styles.boxSize}>
      <div className={styles.boxStyling}>
          <div className={styles.boxPadding} style={{ maxHeight: "none" }}>
            <div
              className={styles.boxBanner}
              style={{ backgroundImage: `${bannerurl}` }}
            ></div>
            <div className={styles.boxTitle}>
              <img
                alt="Subreddit Icon"
                role="presentation"
                src={iconurl}
                className={`${styles.boxIcon} ${styles.boxIconBorder}`}
                style={{backgroundColor: "rgb(0, 121, 211)"}}
              />

              <div className={styles.boxTitleText}>
                <a
                  className={styles.boxTitleTextLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/r/test/"
                  style={{color: "#1c1c1c"}}
                >
                  <span className={styles.boxTitleTextStyle}>{title}</span>
                </a>
              </div>
            </div>
            <div
                data-redditstyle="true"
                data-testid="no-edit-description-block"
                className={styles.boxDescription}
                style={{color: "#1c1c1c"}}
              >
                <div className={styles.boxDescriptionStyle}>{description}</div>
              </div>

              <div className={styles.boxCreated}>
              <div className={styles.boxCreatedText} id="IdCard--CakeDay--undefined--t5_93lki0">
                <span className={`${styles.boxCreated} ${styles.icon} ${styles.iconMargin}`}>🎂</span>
                <span className={styles.boxCreatedTextColor}>Created {datecreated}</span>
                </div>
              </div>
              <div className={styles.spacingDiv}></div>
              <hr className={styles.middleHr}></hr>
              <div className={styles.boxOnline}>
              <div>
                <div className={styles.boxOnlineFont} style={{color: "#1c1c1c"}}>{membercount}</div>
                <p className={styles.boxOnlineText}>
                    Members
                </p>
              </div>
              <div>
              <div className={styles.boxOnlineFont} style={{color: "#1c1c1c"}}>
                <span style={{color:"#46d160", marginRight:"4px"}}>●</span>
                24</div>
                <p className={styles.boxOnlineText}>
                    Online
                </p>
                </div>
                <div></div><div></div>
              </div>
          </div>
        </div>
      </div>
  );
}
