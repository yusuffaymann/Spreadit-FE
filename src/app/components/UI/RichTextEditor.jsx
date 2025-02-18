import React, { useState, useRef, useEffect } from "react";
import styles from "./RichTextEditor.module.css";
import { Editor, EditorState, Modifier, Entity, convertToRaw, convertFromRaw  } from "draft-js";
import MediaArea from "@/app/submit/MediaArea";
import { RichUtils } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import RichToolbarItem from "./RichToolbarItem";


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
      const contentState = convertFromRaw(rawContent);
      return EditorState.createWithContent(contentState);
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

  function convertEditorStateToHTML(editorState) {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
  
    let html = '';
  
    const totalBlocks = blockMap.size;
    let blockIndex = 0;
  
    blockMap.forEach(block => {
      const text = block.getText();
      const characterList = block.getCharacterList();
  
      // Open a new block tag
      html += '<p>';
  
      let lastStyles = [];
  
      // Define style priority
      const stylePriority = [
        'SPOILER',
        'BOLD',
        'ITALIC',
        'UNDERLINE',
        'INLINE_CODE',
        'STRIKETHROUGH',
        'LINK',
        'SUPERSCRIPT',
        'HEADING'
      ];
  
      // Loop through each character in the block
      text.split('').forEach((char, index) => {
        const styles = characterList.get(index).getStyle();
        
        // Detect style changes
        const removedStyles = lastStyles.filter(style => !styles.includes(style));
        const addedStyles = styles.filter(style => !lastStyles.includes(style));
  
        // Close tags for removed styles
        if (removedStyles.size > 0 || addedStyles.size > 0) {
          lastStyles = sortStyles(lastStyles, stylePriority);
          html += closeCurrentTags(lastStyles);
  
          stylePriority.forEach(style => {
            if (styles.includes(style)) {
              html += openTag(style);
            }
          });
        }
  
        // Append character
        html += char;
  
        // Update current styles
        lastStyles = styles;
      });
  
      // Close any remaining tags
      lastStyles = sortStyles(lastStyles, stylePriority);
      html += closeCurrentTags(lastStyles);
  
      // Close the block tag
      html += '</p>';
      
      // Add <br> tag if not the last block
      blockIndex++;
      if (blockIndex !== totalBlocks) {
        html += '<br>';
      }
    });
  
    return html;
  }
  

// Helper function to sort styles based on priority
function sortStyles(styles, stylePriority) {
  return stylePriority.filter(style => styles.includes(style));
}

// Helper function to close current tags
function closeCurrentTags(lastStyles) {
  let closingTags = '';
  lastStyles.reverse().forEach(style => {
    closingTags += closeTag(style);
  });
  return closingTags;
}

// Helper function to open a tag based on style
function openTag(style) {
  if (style === 'SPOILER') {
    return '<span class="spoiler">';
  }
  if (style === 'BOLD') {
    return '<strong>';
  }
  if (style === 'ITALIC') {
    return '<em>';
  }
  if (style === 'UNDERLINE') {
    return '<u>';
  }
  if (style === 'INLINE_CODE') {
    return '<code>';
  }
  if (style === 'STRIKETHROUGH') {
    return '<s>';
  }
  if (style === 'LINK') {
    return `<a href="${hyperlinkUrl}" style="color: var(--brightcolor)">`;
  }
  if (style === 'SUPERSCRIPT') {
    return '<sup>';
  }
  if (style === 'HEADING') {
    return '<h1>';
  }
}

// Helper function to close a tag based on style
function closeTag(style) {
  if (style === 'HEADING') {
    return '</h1>';
  }
  if (style === 'SUPERSCRIPT') {
    return '</sup>';
  }
  if (style === 'LINK') {
    return '</a>';
  }
  if (style === 'STRIKETHROUGH') {
    return '</s>';
  }
  if (style === 'INLINE_CODE') {
    return '</code>';
  }
  if (style === 'UNDERLINE') {
    return '</u>';
  }
  if (style === 'ITALIC') {
    return '</em>';
  }
  if (style === 'BOLD') {
    return '</strong>';
  }
  if (style === 'SPOILER') {
    return '</span>';
  }
}


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
    const html = convertEditorStateToHTML(editorState);
    setContent(html);;
    const contentState = editorState.getCurrentContent();
    const newRawContent = convertToRaw(contentState);
    setRawContent(newRawContent);
}, [editorState]);

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

  console.log(mediaArray)

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
        <RichToolbarItem key={index} {...item} />
      ))}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.DraftEditorroot}>
              <div className={styles.DraftEditoreditorContainer}>
                <div
                  className={styles.publicDraftEditorcontent}
                  role="textbox"
                  placeholder="Text (optional)"
                  spellCheck="true"
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
