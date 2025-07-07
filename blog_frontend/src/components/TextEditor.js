import React, { useRef, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * TextEditor: A reusable rich text editor component with basic formatting buttons.
 * Allows bold, italic, and underline, and notifies parent of HTML changes.
 * 
 * Props:
 *   - initialContent (string): HTML string to initialize content.
 *   - onContentChange (function): called with the latest HTML whenever content changes.
 */
function TextEditor({ initialContent = "", onContentChange }) {
  const editorRef = useRef(null);

  // Set initial content on mount or initialContent change
  useEffect(() => {
    if (editorRef.current && initialContent !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = initialContent || "";
    }
  }, [initialContent]);

  // Notify parent when inner HTML changes
  const handleInput = () => {
    if (editorRef.current) {
      if (typeof onContentChange === "function") {
        onContentChange(editorRef.current.innerHTML);
      }
    }
  };

  // Rich text formatting commands
  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    handleInput(); // trigger content change (esp. for Safari)
    editorRef.current && editorRef.current.focus();
  };

  const btnStyle = {
    background: "#e6e6e6",
    color: "#444",
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "0 5px 6px 0",
    padding: "2px 8px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: 700
  };

  return (
    <div>
      <div style={{ marginBottom: 6 }}>
        <button
          type="button"
          style={btnStyle}
          title="Bold"
          aria-label="Bold"
          onClick={() => handleFormat("bold")}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          style={btnStyle}
          title="Italic"
          aria-label="Italic"
          onClick={() => handleFormat("italic")}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          style={btnStyle}
          title="Underline"
          aria-label="Underline"
          onClick={() => handleFormat("underline")}
        >
          <u>U</u>
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        aria-label="Editor area"
        style={{
          background: "#fff",
          color: "#23242b",
          border: "1.5px solid var(--border-color)",
          minHeight: "9.3rem",
          borderRadius: 8,
          padding: "0.82rem 1rem",
          fontSize: "1.08rem",
          outline: "none",
          maxHeight: 290,
          overflowY: "auto"
        }}
        onInput={handleInput}
      ></div>
    </div>
  );
}

export default TextEditor;
