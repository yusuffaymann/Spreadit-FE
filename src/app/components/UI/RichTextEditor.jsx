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

  const toolbarItems = [
    {
      onClick: handleBoldToggle,
      ariaLabel: 'Bold',
      ariaSelected: boldToggled,
      className: boldToggled ? styles.ItemSelected : '',
      icon: <strong>&#66;</strong>,
    },
    {
      onClick: handleItalicToggle,
      ariaLabel: 'handleItalicToggle',
      ariaSelected: italicToggled,
      className: italicToggled ? styles.ItemSelected : '',
      icon: <i>&#x69;</i>,
    },
    {
      onClick: handleUnderToggle,
      ariaLabel: 'Underline',
      ariaSelected: underToggled,
      className: underToggled ? styles.ItemSelected : '',
      icon: <u>&#85;</u>,
    },
    {
      onClick: handleLinkToggle,
      ariaLabel: 'Link',
      ariaSelected: linkToggled,
      className: linkToggled ? styles.ItemSelected : '',
      icon: <>&#64;</>,
    },
    {
      onClick: handleStrikeToggle,
      ariaLabel: 'Strikethrough',
      ariaSelected: strikeToggled,
      className: strikeToggled ? styles.ItemSelected : '',
      icon: <del>&#83;</del>,
    },
    {
      onClick: handleInlineToggle,
      ariaLabel: 'Inline Code',
      ariaSelected: inlineToggled,
      className: inlineToggled ? styles.ItemSelected : '',
      icon: <>&#10092;&#99;&#10093;</>,
    },
    {
      onClick: handleSuperToggle,
      ariaLabel: 'Superscript',
      ariaSelected: superToggled,
      className: superToggled ? styles.ItemSelected : '',
      icon: <>A<sup>^</sup></>,
    },
    {
      onClick: handleSpoilerToggle,
      ariaLabel: 'Spoiler',
      ariaSelected: spoilerToggled,
      className: spoilerToggled ? styles.ItemSelected : '',
      icon: <>&#9888;</>,
    },
    {
      onClick: handleHeadingToggle,
      ariaLabel: 'Heading',
      ariaSelected: headingToggled,
      className: headingToggled ? styles.ItemSelected : '',
      icon: <><sub>&#104;</sub>&#72;</>,
    },
    {
      onClick: handleBulletToggle,
      ariaLabel: 'Bulleted List',
      ariaSelected: bulletToggled,
      className: bulletToggled ? styles.ItemSelected : '',
      icon: <>&#8226;</>,
    },
    {
      onClick: handleNumberToggle,
      ariaLabel: 'Numbered List',
      ariaSelected: numberToggled,
      className: numberToggled ? styles.ItemSelected : '',
      icon: <>&#35;</>,
    },
    {
      onClick: handleQuoteToggle,
      ariaLabel: 'Quoted Block',
      ariaSelected: quoteToggled,
      className: quoteToggled ? styles.ItemSelected : '',
      icon: <>&#10078;</>,
    },
    {
      onClick: handleCodeToggle,
      ariaLabel: 'Code Block',
      ariaSelected: codeToggled,
      className: codeToggled ? styles.ItemSelected : '',
      icon: <>&#8865;</>,
    },
    {
      onClick: handleTableToggle,
      ariaLabel: 'Table',
      ariaSelected: tableToggled,
      className: tableToggled ? styles.ItemSelected : '',
      icon: <>&#8862;</>,
    },
    {
      onClick: handleImageToggle,
      ariaLabel: 'Add Image',
      ariaSelected: imageToggled,
      className: imageToggled ? styles.ItemSelected : '',
      icon: <>📷</>,
    },
    {
      onClick: handleVideoToggle,
      ariaLabel: 'Add Video',
      ariaSelected: videoToggled,
      className: videoToggled ? styles.ItemSelected : '',
      icon: <>🎬</>,
    },
  ];

  return (
    <div>
      <div className={styles.RichTextContainerPosition}>
        <div className={styles.RichTextContainerFormatting}>
          <div className={styles.RichTextToolbar}>
            <div className={styles.RichTextToolbarPosition}>
              <div className={styles.RichTextToolbarItemFlex}>
              {toolbarItems.map((item, index) => (
        <ToolbarItem key={index} {...item} />
      ))}
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

function ToolbarItem({ onClick, ariaLabel, ariaSelected, className, icon })
{
  return (
    <span>
      <button
        role="button"
        onClick={onClick}
        tabIndex="-1"
        aria-label={ariaLabel}
        aria-selected={ariaSelected}
        className={`${styles.RichTextToolbarItem} ${className}`}
      >
        <span className={`${styles.miscIcon} icon icon-add`}>
          {icon}
        </span>
      </button>
    </span>
  );
};

export default RichTextEditor;
