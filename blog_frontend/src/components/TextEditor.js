import React, { useRef, useEffect, useState } from "react";

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

  // Active formatting state
  const [active, setActive] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // Set initial content on mount or initialContent change
  useEffect(() => {
    if (editorRef.current && initialContent !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = initialContent || "";
    }
  }, [initialContent]);

  // Helper to sync "active" state
  const updateFormattingState = () => {
    // queryCommandState may throw in some browsers if selection is outside a document:
    let bold = false, italic = false, underline = false;
    try {
      bold = document.queryCommandState("bold");
      italic = document.queryCommandState("italic");
      underline = document.queryCommandState("underline");
    } catch { /* no-op */ }
    setActive({ bold, italic, underline });
  };

  // Notify parent when inner HTML changes
  const handleInput = () => {
    if (editorRef.current) {
      if (typeof onContentChange === "function") {
        onContentChange(editorRef.current.innerHTML);
      }
    }
    updateFormattingState();
  };

  // Format and update state immediately after
  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    updateFormattingState();
    handleInput(); // trigger content change (esp. for Safari)
    editorRef.current && editorRef.current.focus();
  };

  // Listen for cursor/selection changes (anywhere in document!) to update active state
  useEffect(() => {
    const selectionHandler = () => {
      if (document.activeElement === editorRef.current) updateFormattingState();
    };
    document.addEventListener("selectionchange", selectionHandler);
    // Initial state sync
    updateFormattingState();
    return () => {
      document.removeEventListener("selectionchange", selectionHandler);
    };
  }, []);

  return (
    <div>
      <div className="toolbar" style={{ marginBottom: 6 }}>
        <button
          type="button"
          className={active.bold ? 'active' : ''}
          title="Bold"
          aria-label="Bold"
          onClick={() => handleFormat('bold')}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className={active.italic ? 'active' : ''}
          title="Italic"
          aria-label="Italic"
          onClick={() => handleFormat('italic')}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          className={active.underline ? 'active' : ''}
          title="Underline"
          aria-label="Underline"
          onClick={() => handleFormat('underline')}
        >
          <u>U</u>
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        aria-label="Editor area"
        className="text-editor-content"
        style={{
          // preserved custom inline styles for border radius etc.
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
