import Image from "next/image";
import React, { useState } from "react";
import "./Create.css";
import styles from "./CreateLeftBox.module.css";
import OutlineButton from "../components/UI/OutlineButton";
import BlueButton from "../components/UI/BlueButton";
import Checkbox from "../components/UI/Checkbox";
import MediaArea from "./MediaArea";
import PollCreator from "./PollCreator";
import RichTextEditor from "../components/UI/RichTextEditor";

function RenderMiscOptions({setSpoiler, setNsfw, nsfw, spoiler, ready}) {
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
            />
            {/*<OutlineButton children="Save Draft" isDisabled={true} />*/}
          </div>
        </div>
      </div>
    </div>
  );
}

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

function RenderTitleBox({title,setTitle}) {
  const maxChars = 300;

  function handleInputChange(event) {
    const { value } = event.target;
    const newValue = value.replace(/[\r\n]/g, ' '); // Remove line breaks
  if (newValue.length <= maxChars) {
    setTitle(newValue);
  }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); 
    }
  }

    return (<div className={`${styles.marginBottom8px}`}>
      <div className={`${styles.relativePosition}`}>
        <textarea
          maxLength="300"
          placeholder="Title"
          className={`${styles.textareaStyle} ${styles.textarea}`}
          rows="1"
          value={title}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          data-tribute="true"
          style={{ overflowX: "hidden", overflowWrap: "break-word", height: "38.6px" }}
        ></textarea>
        <div className={`${styles.characterCount}`}>{title.length}/{maxChars}</div>
      </div>
    </div>);
}

function RenderLinkBox({url,setUrl}) {
  function handleInputChange(event) {
    const { value } = event.target;
    const newValue = value.replace(/[\r\n]/g, ' '); // Remove line breaks
    setUrl(newValue);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); 
    }
  }

    return (<div>
      <textarea placeholder="Url"
      className={`${styles.textareaStyle} ${styles.textarea}`}
      value={url}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      rows="1"
      data-tribute="true"
      style={{ overflowX: "hidden", overflowWrap: "break-word", height: "65.6px" }}
      >
      </textarea>
    </div>);
}
function CreateLeftBox({setTitle, title, setUrl, url, spoiler, setSpoiler, nsfw, setNsfw,
  notify, setNotify, length, setLength, options, setOptions, mediaArray, setMediaArray, 
  postMediaArray, setPostMediaArray, selectedOption, setSelectedOption, ready,
  content, setContent}) {
    const [rawContent, setRawContent] = useState("");
  
  

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.mainBoxBorders}>
      <div className={styles.mainBoxHeader}>
        <div className={styles.mainBoxHeaderFlex}>
          <button
            className={`${styles.mainBoxHeaderItem} ${
              selectedOption === "post" ? styles.mainBoxHeaderSelected : ""
            }`}
            onClick={() => handleOptionClick("post")}
          >
            <span className={`${styles.icon} ${styles.iconHeaderMargin}`}>
              📝
            </span>
            Post
          </button>
          <button
            className={`${styles.mainBoxHeaderItem} ${
              selectedOption === "image" ? styles.mainBoxHeaderSelected : ""
            }`}
            onClick={() => handleOptionClick("image")}
          >
            <span className={`${styles.icon} ${styles.iconHeaderMargin}`}>
              📸
            </span>
            Images & Video
          </button>
          <button
            className={`${styles.mainBoxHeaderItem} ${
              selectedOption === "link" ? styles.mainBoxHeaderSelected : ""
            }`}
            onClick={() => handleOptionClick("link")}
          >
            <span className={`${styles.icon} ${styles.iconHeaderMargin}`}>
              🔗
            </span>
            Link
          </button>
          <button
            className={`${styles.mainBoxHeaderItem} ${
              selectedOption === "poll" ? styles.mainBoxHeaderSelected : ""
            }`}
            onClick={() => handleOptionClick("poll")}
          >
            <span className={`${styles.icon} ${styles.iconHeaderMargin}`}>
              📊
            </span>
            Poll
          </button>
        </div>
      </div>
      <div style={{margin: "16px"}}>
        <RenderTitleBox title={title} setTitle={setTitle} />
        { selectedOption === "link" && <RenderLinkBox setUrl={setUrl} url={url}/>}
        { selectedOption === "image" && <MediaArea mediaArray={mediaArray} setMediaArray={setMediaArray}/>}
        { selectedOption === "poll" && <div>
          <RichTextEditor content={content} setContent={setContent} mediaArray={postMediaArray} setMediaArray={setPostMediaArray}
          rawContent={rawContent} setRawContent={setRawContent}/>
          <PollCreator setOptions={setOptions} options={options} setLength={setLength} length={length}/></div>}
        { selectedOption === "post" && 
        <RichTextEditor rawContent={rawContent} setRawContent={setRawContent} content={content}
        setContent={setContent} mediaArray={postMediaArray} setMediaArray={setPostMediaArray}/>}
      </div>

      <RenderMiscOptions setNsfw={setNsfw} nsfw={nsfw} setSpoiler={setSpoiler} spoiler={spoiler} ready={ready}/>
      <RenderNotificationSettings notify={notify} setNotify={setNotify}/>
    </div>
  );
}

export default CreateLeftBox;
