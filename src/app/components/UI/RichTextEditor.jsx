import React, { useState, useRef, useEffect } from "react";
import styles from "./RichTextEditor.module.css";
import { Editor, EditorState, Modifier, Entity, convertToRaw, convertFromRaw  } from "draft-js";
import MediaArea from "@/app/submit/MediaArea";
import { RichUtils } from "draft-js";
import draftToHtml from 'draftjs-to-html';


const DEBOUNCE_DELAY = 600;

function RichTextEditor({ mediaArray, setMediaArray, content, setContent, rawContent, setRawContent }) {
  const [boldToggled, setBoldToggled] = useState(false);
  const [italicToggled, setItalicToggled] = useState(false);
  const [underToggled, setUnderToggled] = useState(false);
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


  const [editorState, setEditorState] = useState(() => {
    // Initialize editor state with the content passed as a prop
    if (rawContent) {
      return EditorState.createWithContent(rawContent);
    }
    return EditorState.createEmpty();
  });

  const [hyperlinkUrl, setHyperlinkUrl] = useState("");

  

  const [editorHistory, setEditorHistory] = useState([]);

  useEffect(() => {
    const selection = editorState.getSelection();
    const currentStyle = editorState.getCurrentInlineStyle();
    setBoldToggled(currentStyle.has("BOLD"));
    setItalicToggled(currentStyle.has("ITALIC"));
    setUnderToggled(currentStyle.has("UNDERLINE"));
    setStrikeToggled(currentStyle.has("STRIKETHROUGH"));
    setSpoilerToggled(currentStyle.has("SPOILER"));
    setLinkToggled(currentStyle.has("LINK"));
    setInlineToggled(currentStyle.has("INLINE_CODE"));
    setSuperToggled(currentStyle.has("SUPERSCRIPT"));
    setHeadingToggled(currentStyle.has("HEADING"));
  }, [editorState]);

  const customStyleMap = {
    INLINE_CODE: {
      fontFamily: "monospace",
      backgroundColor: "#f0f0f0",
      color: "#ff006d",
      padding: "2px 4px",
      borderRadius: "4px",
    },
    SPOILER: {
      backgroundColor: "black", // Comma was missing here
    },
    LINK: {
      color: "var(--brightcolor)", // Comma was missing here
    },
    SUPERSCRIPT: {
      verticalAlign: 'super',
      fontSize: 'smaller'
    },
    HEADING: {
        marginBottom: '8px',
        marginTop: '1.4em',
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '26px',
    },
  };

  const styleToComponent = {
    LINK: (props) => {
      const { contentState, entityKey, children } = props;
      const { url } = contentState.getEntity(entityKey).getData();
      return <a href={hyperlinkUrl}>{children}</a>;
    },
  };

  const handleUndo = () => {
    setEditorState(EditorState.undo(editorState));

    /*if (editorHistory.length >= 2) {
      const previousContent = editorHistory[editorHistory.length - 2];
      setEditorHistory(editorHistory.slice(0, -1));
      editorRef.current.innerHTML = previousContent;
    } else {
      // Clear the editor content
      setEditorHistory([]);
      editorRef.current.innerHTML = "";
    }*/
  };

  const editorStyle = {
    minHeight: "122px",
  };

  const handleInputChange = () => {
    // const text = editorRef.current.innerHTML;
    // const unformattedtext = editorRef.current.innerText;
    //setContent(text);
    //setUnformatted(unformattedtext);
  };

  useEffect(() => {
    console.log("content: " + content);
    //console.log("unformatted content: " + unformatted);
  }, [content]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setEditorHistory([...editorHistory, content]);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(delay);
  }, [content]);

  useEffect(() => {
   // console.log("history: " + editorHistory);
  }, [editorHistory]);

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      setEditorHistory([...editorHistory, content]);
    }
    if (event.ctrlKey && event.key === "z") {
      event.preventDefault();
      handleUndo();
    }
    if (event.ctrlKey && event.key === "b") {
      event.preventDefault();
      handleBoldToggle();
    }
    if (event.ctrlKey && event.key === "i") {
      event.preventDefault();
      handleItalicToggle();
    }
    if (event.ctrlKey && event.key === "u") {
      event.preventDefault();
      handleUnderToggle();
    }
  };

  useEffect(() => {
    // Get the current content state from the editor state
    const contentState = editorState.getCurrentContent();
    // Convert the content state to raw JSON
    setRawContent(contentState);
    const contentStateJson = convertToRaw(contentState);
    // Convert raw JSON to HTML with custom styles
    const text = draftToHtml(contentStateJson, {
      inlineStyles: {
        // Map your custom style names to their respective CSS styles
        'INLINE_CODE': {
          style: {
            fontFamily: "monospace",
            backgroundColor: "#f0f0f0",
            color: "#ff006d",
            padding: "2px 4px",
            borderRadius: "4px",
          }
        },
        'SPOILER': {
          style: {
            backgroundColor: "black",
            color: "black",
          }
        },
        'LINK': {
          style: {
            color: "var(--brightcolor)",
          }
        },
        'SUPERSCRIPT': {
          style: {
            verticalAlign: 'super',
            fontSize: 'smaller'
          }
        },
        'HEADING': {
          style: {
            marginBottom: '8px',
            marginTop: '1.4em',
            fontWeight: '500',
            fontSize: '24px',
            lineHeight: '26px',
          }
        },
        // Add mappings for other custom styles as needed
      }
    });
    // Update the formatted text state
    setContent(text);
}, [editorState]);


  const convertToHtml = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
  
    // Function to apply style based on the type
    const applyStyle = (text, styles) => {
      // Sort styles by priority if needed
      styles.forEach(style => {
        switch (style) {
          case 'BOLD':
            text = `<strong>${text}</strong>`;
            break;
          case 'ITALIC':
            text = `<em>${text}</em>`;
            break;
          case 'UNDERLINE':
            text = `<u>${text}</u>`;
            break;
          case 'SUPERSCRIPT':
            text = `<sup>${text}</sup>`;
            break;
          case 'INLINE_CODE':
            text = `<span style="font-family: monospace; background-color: #f0f0f0; color: #ff006d; padding: 2px 4px; border-radius: 4px;">${text}</span>`;
            break;
          case 'SPOILER':
            text = `<span style="background-color: black; color: black;">${text}</span>`;
            break;
          case 'LINK':
            text = `<a href="${hyperlinkUrl}" style="color: var(--brightcolor);">${text}</a>`;
            break;
          case 'HEADING':
            text = `<h1 style="margin-bottom: 8px; margin-top: 1.4em; font-weight: 500; font-size: 24px; line-height: 26px;">${text}</h1>`;
            break;
          // Add cases for other custom styles if needed
        }
      });
      return text;
    };
  
    // Iterate over blocks and convert to HTML
    const htmlContent = rawContentState.blocks.map(block => {
      let html = '';
      let lastIndex = 0;
      let activeStyles = [];
  
      // Sort ranges by offset
      const sortedRanges = block.inlineStyleRanges.sort((a, b) => a.offset - b.offset);
  
      // Iterate over inline style ranges and apply HTML formatting
      sortedRanges.forEach(range => {
        const { offset, length, style } = range;
        const textSlice = block.text.slice(offset, offset + length);
  
        // Close any active styles if needed
        while (activeStyles.length > 0 && lastIndex < offset) {
          const lastStyle = activeStyles.pop();
          html += `</${lastStyle}>`;
        }
  
        // Append the unstyled text before the current range
        html += block.text.slice(lastIndex, offset);
  
        // Open new style tag
        html += `<${style.toLowerCase()}>`;
        activeStyles.push(style);
  
        // Apply HTML formatting for each style
        html += applyStyle(textSlice, activeStyles);
  
        lastIndex = offset + length;
      });
  
      // Close any remaining active styles
      while (activeStyles.length > 0) {
        const lastStyle = activeStyles.pop();
        html += `</${lastStyle}>`;
      }
  
      // Append the remaining unstyled text
      html += block.text.slice(lastIndex);
  
      // Wrap the block in a paragraph tag
      return `<p>${html}</p>`;
    });
  
    // Join the HTML content and log or use it as needed
    const finalHtml = htmlContent.join('');
    setContent(finalHtml);
    console.log(finalHtml);
  };

  


  const handleBoldToggle = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleItalicToggle = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleUnderToggle = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleStrikeToggle = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  const handleInlineToggle = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "INLINE_CODE"));
  };

  const handleLinkToggle = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "LINK"));
    
  };

  const handleSuperToggle = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'SUPERSCRIPT'));
  };

  const handleSpoilerToggle = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "SPOILER"));
  };

  const handleHeadingToggle = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "HEADING"));
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
                    tabIndex="-1"
                    aria-label="Bold"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      boldToggled ? styles.ItemSelected : ""
                    }`}
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
                    tabIndex="-1"
                    aria-label="Italic"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      italicToggled ? styles.ItemSelected : ""
                    }`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      <i>&#x69;</i>
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleUnderToggle}
                    tabIndex="-1"
                    aria-label="Underline"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      underToggled ? styles.ItemSelected : ""
                    }`}
                  >
                    <span className={`${styles.miscIcon} icon icon-add`}>
                      <u>&#85;</u>
                    </span>
                  </button>
                </span>
                <span>
                  <button
                    role="button"
                    onClick={handleLinkToggle}
                    tabIndex="-1"
                    aria-label="Link"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      linkToggled ? styles.ItemSelected : ""
                    }`}
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
                    tabIndex="-1"
                    aria-label="Strikethrough"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      strikeToggled ? styles.ItemSelected : ""
                    }`}
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
                    tabIndex="-1"
                    aria-label="Inline Code"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      inlineToggled ? styles.ItemSelected : ""
                    }`}
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
                    tabIndex="-1"
                    aria-label="Superscript"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      superToggled ? styles.ItemSelected : ""
                    }`}
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
                    tabIndex="-1"
                    aria-label="Spoiler"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      spoilerToggled ? styles.ItemSelected : ""
                    }`}
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
                    tabIndex="-1"
                    aria-label="Heading"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      headingToggled ? styles.ItemSelected : ""
                    }`}
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
                    tabIndex="-1"
                    aria-label="Bulleted List"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      bulletToggled ? styles.ItemSelected : ""
                    }`}
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
                    tabIndex="-1"
                    aria-label="Numbered List"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      numberToggled ? styles.ItemSelected : ""
                    }`}
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
                    tabIndex="-1"
                    aria-label="Quoted Block"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      quoteToggled ? styles.ItemSelected : ""
                    }`}
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
                    tabIndex="-1"
                    aria-label="Code Block"
                    aria-selected="false"
                    className={`${styles.RichTextToolbarItem} ${
                      codeToggled ? styles.ItemSelected : ""
                    }`}
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
                    tabIndex="-1"
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
                    tabIndex="-1"
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
                    tabIndex="-1"
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
                  role="textbox"
                  placeholder="Text (optional)"
                  spellcheck="true"
                  onInput={handleInputChange}
                  onKeyDown={handleKeyDown} // Add keydown event listener
                >
                  <div>
                    <Editor
                      editorState={editorState}
                      onChange={setEditorState}
                      customStyleMap={customStyleMap}
                      customStyleFn={(style, block) => {
                        return styleToComponent[style];
                      }}
                    />
                    {
                      // XOR logic
                      ((imageToggled && !videoToggled) ||
                        (!imageToggled && videoToggled)) && (
                        <MediaArea
                          mediaArray={mediaArray}
                          setMediaArray={setMediaArray}
                        />
                      )
                    }
                  </div>
                  {linkToggled && (
                    <input
                      type="text"
                      value={hyperlinkUrl}
                      onChange={(e) => setHyperlinkUrl(e.target.value)}
                      placeholder="Enter URL"
                    />
                  )}
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
