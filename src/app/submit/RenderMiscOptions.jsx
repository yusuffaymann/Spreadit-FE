import React from "react";
import styles from "./RenderMiscOptions.module.css";
import OutlineButton from "../components/UI/OutlineButton";

function RenderMiscOptions({setSpoiler, setNsfw, nsfw, spoiler, ready, createPost}) {
  return (
    <div className={`${styles.miscOptionPad}`}>
      <div className={`${styles.miscOptionFlex}`}>
        <div
          className={`${styles._2_rA2mCdhHc1Lr7Ff1ygvH._2_rA2mCdhHc1Lr7Ff1ygvH} ${styles.XZKLTFT5CgGo9MvPQQsy}`}
        >
          <button
            role="button"
            tabIndex="0"
            onClick={() => setSpoiler(!spoiler)}
            aria-label="Mark as a spoiler"
            className={`${styles.miscOverflow} ${styles.miscAppearance} create--buttonContent create--buttonStyle
            ${
              spoiler === true ? styles.miscSpoilerSelected : ""
            }`}
          >
            <span className={`${styles.miscIcon} icon icon-add`}>{spoiler === true? <div>&#10003;</div> : <div>&#43;</div>}</span>
            <span>Spoiler</span>
          </button>
          <button
            role="button"
            onClick={() => setNsfw(!nsfw)}
            tabIndex="0"
            aria-label="Mark as Not Safe For Work"
            className={`${styles.miscOverflow} ${styles.miscAppearance} create--buttonContent create--buttonStyle
            ${
              nsfw === true ? styles.miscNsfwSelected : ""
            }
            `}
          >
            <span className={`${styles.miscIcon} icon icon-add`}>{nsfw === true? <div>&#10003;</div> : <div>&#43;</div>}</span>
            <span>NSFW</span>
          </button>

          {/*<button
            role="button"
            tabIndex="0"
            aria-label="Not available for this community"
            disabled
            className={`${styles.miscOverflow} ${styles.miscAppearance} create--buttonContent create--buttonStyle`}
          >
            <span>
              <span className={` ${styles.icon} ${styles.iconHeaderMargin}`}>🔖</span>
              <div className={`${styles.miscFlairText}`}>Flair</div>
            </span>
          </button>*/}
        
        </div>
      </div>
      <hr className={`${styles.mischr}`} />
      <div className={`${styles.miscBottom}`}>
        <div className={`${styles.miscBottomFlex}`}>
          <div className={`${styles.miscBottomBtns}`}>
            <OutlineButton
              children="Post"
              isInverted={true}
              isDisabled={!ready}
              btnClick={createPost}
            />
            {/*<OutlineButton children="Save Draft" isDisabled={true} />*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderMiscOptions;
