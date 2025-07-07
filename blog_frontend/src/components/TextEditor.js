import React, { useRef } from 'react';
import './TextEditor.css'; // For optional styling

// PUBLIC_INTERFACE
/**
 * TextEditor component - rich text editor with formatting (bold, italic, underline).
 * @param {string} content - HTML string content of the editor.
 * @param {function} setContent - Callback to update the content.
 */
export default function TextEditor({ content, setContent }) {
  const editorRef = useRef(null);

  // PUBLIC_INTERFACE
  // Format selected text
  const handleFormat = (command) => {
    document.execCommand(command, false, null);
  };

  // Update parent content on input
  // PUBLIC_INTERFACE
  const handleInput = () => {
    setContent(editorRef.current.innerHTML);
  };

  return (
    <div className="editor-container" style={{display: "flex", flexDirection: "column", gap: 4}}>
      <div className="toolbar" style={{display: "flex", gap: 10, marginBottom: 6}}>
        <button type="button" onClick={() => handleFormat('bold')} title="Bold" style={{fontWeight: 'bold'}}>B</button>
        <button type="button" onClick={() => handleFormat('italic')} title="Italic" style={{fontStyle: 'italic'}}>I</button>
        <button type="button" onClick={() => handleFormat('underline')} title="Underline" style={{textDecoration: 'underline'}}>U</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="editor"
        aria-label="Blog content"
        onInput={handleInput}
        style={{
          minHeight: 120,
          border: "1.5px solid var(--border-color)",
          borderRadius: 7,
          fontSize: 17,
          padding: "1.19rem 1rem",
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
          outline: "none"
        }}
        // Controlled value
        dangerouslySetInnerHTML={{ __html: content }}
        tabIndex={0}
        suppressContentEditableWarning
      />
    </div>
  );
}
