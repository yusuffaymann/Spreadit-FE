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

import RenderLinkBox from "./RenderLinkBox";
import RenderMiscOptions from "./RenderMiscOptions";
import RenderNotificationSettings from "./RenderNotificationSettings";
import RenderTitleBox from "./RenderTitleBox";
import { create } from "@mui/material/styles/createTransitions";

function CreateLeftBox({setTitle, title, setUrl, url, spoiler, setSpoiler, nsfw, setNsfw,
  notify, setNotify, length, setLength, options, setOptions, mediaArray, setMediaArray, 
  postMediaArray, setPostMediaArray, selectedOption, setSelectedOption, ready,
  content, setContent, createPost}) {
    const [rawContent, setRawContent] = useState("");
  
  

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  console.log(mediaArray)
  return (
    <div className={styles.mainBoxBorders}>
      <div className={styles.mainBoxHeader}>
        <div className={styles.mainBoxHeaderFlex}>
          <button
            className={`${styles.mainBoxHeaderItem} ${styles.mainBoxHeaderItemFirst} ${
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
            className={`${styles.mainBoxHeaderItem} ${styles.mainBoxHeaderItemLast} ${
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

      <RenderMiscOptions setNsfw={setNsfw} nsfw={nsfw} setSpoiler={setSpoiler} spoiler={spoiler} ready={ready} createPost={createPost}/>
      <RenderNotificationSettings notify={notify} setNotify={setNotify}/>
    </div>
  );
}

export default CreateLeftBox;
