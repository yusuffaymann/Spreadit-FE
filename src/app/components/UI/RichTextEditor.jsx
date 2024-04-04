import React, { useState, useRef  } from "react";
import styles from "./RichTextEditor.module.css";

function RichTextEditor() {
  const [boldToggled, setBoldToggled] = useState(false);
  const [italicToggled, setItalicToggled] = useState(false);
  const [linkToggled, setLinkToggled] = useState(false);
  const [strikeToggled, setStrikeToggled] = useState(false);
  const [inlineToggled, setInlineToggled] = useState(false);
  const [superToggled, setSuperToggled] = useState(false);
  const [spoilerToggled, setSpoilerToggled] = useState(false);
  const [headingToggled, setHeadingToggled] = useState(false);
  const [bulletToggled, setBulletToggled] = useState(false);
  const [numberToggled, setNumberToggled] = useState(false);
  const [quoteToggled, setQuoteToggled] = useState(false);
  const [codeToggled, setCodeToggled] = useState(false);
  const [tableToggled, setTableToggled] = useState(false);
  const [imageToggled, setImageToggled] = useState(false);
  const [videoToggled, setVideoToggled] = useState(false);
  const editorRef = useRef(null);

  const handleBoldToggle = () => {
    setBoldToggled(!boldToggled);
    if (editorRef.current) {
        const selection = window.getSelection();
        const selectedText = selection.toString();
        const range = selection.getRangeAt(0);
        
        if (selectedText) {
          const boldText = document.createElement('strong');
          boldText.textContent = selectedText;
          range.deleteContents();
          range.insertNode(boldText);
        }
      }
  } ;

  const handleItalicToggle = () => {
    setItalicToggled(!italicToggled);
  };

  const handleLinkToggle = () => {
    setLinkToggled(!linkToggled);
  };

  const handleStrikeToggle = () => {
    setStrikeToggled(!strikeToggled);
  };

  const handleInlineToggle = () => {
    setInlineToggled(!inlineToggled);
  };

  const handleSuperToggle = () => {
    setSuperToggled(!superToggled);
  };

  const handleSpoilerToggle = () => {
    setSpoilerToggled(!spoilerToggled);
  };

  const handleHeadingToggle = () => {
    setHeadingToggled(!headingToggled);
  };

  const handleBulletToggle = () => {
    setBulletToggled(!bulletToggled);
  };

  const handleNumberToggle = () => {
    setNumberToggled(!numberToggled);
  };

  const handleQuoteToggle = () => {
    setQuoteToggled(!quoteToggled);
  };

  const handleCodeToggle = () => {
    setCodeToggled(!codeToggled);
  };

  const handleTableToggle = () => {
    setTableToggled(!tableToggled);
  };

  const handleImageToggle = () => {
    setImageToggled(!imageToggled);
  };

  const handleVideoToggle = () => {
    setVideoToggled(!videoToggled);
  };

  return (
    <div>
      <div className={styles.RichTextContainerPosition}>
        <div className={styles.RichTextContainerFormatting}>
          <div className={styles.RichTextToolbar}>
            <div className={styles.RichTextToolbarPosition}>
              <div className={styles.RichTextToolbarItemFlex}>
                <span>
                  <button
                    role="button"
                    onClick={handleBoldToggle}
                    tabindex="-1"
                    aria-label="Bold"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${boldToggled ? styles.ItemSelected : ""}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      <strong>&#66;</strong>
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleItalicToggle}
                    tabindex="-1"
                    aria-label="Italic"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${italicToggled ? styles.ItemSelected : ""}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      <i>&#x69;</i>
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleLinkToggle}
                    tabindex="-1"
                    aria-label="Link"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${linkToggled ? styles.ItemSelected : ""}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      &#64;
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleStrikeToggle}
                    tabindex="-1"
                    aria-label="Strikethrough"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${strikeToggled ? styles.ItemSelected : ""}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      <del>&#83;</del>
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleInlineToggle}
                    tabindex="-1"
                    aria-label="Inline Code"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${inlineToggled ? styles.ItemSelected : ""}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      &#10092;&#99;&#10093;
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleSuperToggle}
                    tabindex="-1"
                    aria-label="Superscript"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${superToggled ? styles.ItemSelected : ""}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      A<sup>^</sup>
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleSpoilerToggle}
                    tabindex="-1"
                    aria-label="Spoiler"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${spoilerToggled ? styles.ItemSelected : ""}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      &#9888;
                    </span>
                  </button>
                </span>
                <span>
                  <div className={styles.divider}></div>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleHeadingToggle}
                    tabindex="-1"
                    aria-label="Heading"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${headingToggled ? styles.ItemSelected : ""}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      <sub>&#104;</sub>&#72;
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleBulletToggle}
                    tabindex="-1"
                    aria-label="Bulleted List"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${bulletToggled ? styles.ItemSelected : ""}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      &#8226;
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleNumberToggle}
                    tabindex="-1"
                    aria-label="Numbered List"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${numberToggled ? styles.ItemSelected : ""}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      &#35;
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleQuoteToggle}
                    tabindex="-1"
                    aria-label="Quoted Block"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${quoteToggled ? styles.ItemSelected : ""}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      &#10078;
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleCodeToggle}
                    tabindex="-1"
                    aria-label="Code Block"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${codeToggled ? styles.ItemSelected : ""}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      &#8865;
                    </span>
                  </button>
                </span>
                <span>
                  <div className={styles.divider}></div>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleTableToggle}
                    tabindex="-1"
                    aria-label="Table"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      &#8862;
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleImageToggle}
                    tabindex="-1"
                    aria-label="Add Image"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      📷
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleVideoToggle}
                    tabindex="-1"
                    aria-label="Add Video"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem}`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      🎬
                    </span>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div>
            <div class={styles.DraftEditorroot}>
              <div class={styles.DraftEditoreditorContainer}>
                <div
                  class={styles.publicDraftEditorcontent}
                  contenteditable="true"
                  role="textbox"
                  spellcheck="true"
                  ref={editorRef}
                >
                  <div data-offset-key="b313d5_initial-0-0">
                    <div
                      data-block="true"
                      data-editor="b313d5"
                      data-offset-key="b313d5_initial-0-0"
                    >
                      <div
                        data-offset-key="b313d5_initial-0-0"
                        className={`${styles.publicDraftStyleDefaultblock} ${styles.publicDraftStyleDefaultltr}`}
                      >
                        <span data-offset-key="b313d5_initial-0-0">
                          <span data-text="true"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Additional features like voting length can be added here */}
    </div>
  );
}

export default RichTextEditor;
