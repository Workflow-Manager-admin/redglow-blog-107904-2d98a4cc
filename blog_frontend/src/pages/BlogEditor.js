import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * BlogEditor: Page to write a new blog post (only for authenticated users).
 * Shows fields for title, author (from session), auto-filled date, upload image,
 * and a rich text editor for content (bold, italic, underline). On submit,
 * posts form data to backend.
 */
function BlogEditor({ currentUser }) {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState(currentUser?.username || "");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const contentRef = useRef();
  const navigate = useNavigate();

  // Use current date as ISO formatted date string
  const todayStr = new Date().toISOString().slice(0, 10);

  // Handle simple formatting commands for selection
  const applyFormatting = (cmd) => {
    document.execCommand(cmd, false);
    setContent(contentRef.current.innerHTML);
  };

  // Images: Convert file to base64 for preview and POST
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Image must be a valid image file.");
      setImage(null);
      return;
    }
    setError("");
    setImage(file);
  }

  // Send data as multipart/form-data (for image upload)
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccessMsg("");

    if (!title.trim() || !content.trim()) {
      setError("Title and blog content are required.");
      setSubmitting(false);
      return;
    }
    // Build form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", authorName || (currentUser && currentUser.username) || "");
    formData.append("date", todayStr);
    formData.append("content", contentRef.current.innerHTML || content);
    if (image) formData.append("image", image);

    // Retrieve JWT (assume in localStorage for demo)
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Failed to submit blog post.");
      }
      setSuccessMsg("Blog post submitted!");
      setTitle("");
      setContent("");
      setImage(null);
      setTimeout(() => navigate("/"), 1600); // Go back after a bit
    } catch (err) {
      setError(err.message || "Failed to submit blog.");
    } finally {
      setSubmitting(false);
    }
  }

  // Keep content state synced with visual editor
  function handleContentInput() {
    setContent(contentRef.current.innerHTML);
  }

  return (
    <main style={{
      maxWidth: 780,
      margin: "2.5rem auto",
      padding: "2.3rem 1.2rem 2.9rem 1.2rem",
      background: "var(--bg-primary)",
      borderRadius: 16,
      border: "1px solid var(--border-color)",
      boxShadow: "0 8px 32px rgba(44,44,53,0.05)"
    }}>
      <h1 style={{
        fontSize: "2.25rem",
        fontWeight: 750,
        color: "#e63946",
        marginBottom: "1.2rem"
      }}>
        Write a New Blog
      </h1>
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.3rem"
      }} encType="multipart/form-data">
        <div>
          <label style={labelStyle}>
            Blog Title
            <input
              type="text"
              value={title}
              maxLength={120}
              onChange={e => setTitle(e.target.value)}
              required
              style={inputStyle}
              placeholder="Enter blog title"
              autoFocus
            />
          </label>
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <label style={labelStyle}>
            Author Name
            <input
              type="text"
              value={authorName}
              required
              disabled={!!currentUser}
              onChange={e => setAuthorName(e.target.value)}
              style={{ ...inputStyle, width: 190, marginRight: 12 }}
              placeholder="Your Name"
            />
          </label>
          <label style={labelStyle}>
            Date
            <input
              type="text"
              disabled
              value={todayStr}
              style={{
                ...inputStyle,
                width: 120,
                background: "var(--bg-secondary)",
                color: "var(--text-secondary)",
                fontWeight: 600,
                cursor: "not-allowed"
              }}
            />
          </label>
        </div>
        <div>
          <label style={labelStyle}>
            Image Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: 6, marginLeft: 0 }}
            />
            {image &&
              <img
                alt="Preview"
                src={URL.createObjectURL(image)}
                style={{
                  width: 120, height: "auto", marginTop: 10, borderRadius: 6, boxShadow: "0 2px 8px #e6394622"
                }}
              />
            }
          </label>
        </div>
        {/* Rich Text Editor */}
        <div>
          <label style={{ ...labelStyle, marginBottom: 8 }}>Blog Details</label>
          {/* Formatting toolbar */}
          <div style={{
            display: "flex",
            gap: 10,
            marginBottom: 7,
            flexWrap: "wrap"
          }}>
            <button type="button" title="Bold" onClick={() => applyFormatting("bold")} style={toolBtnStyle}><b>B</b></button>
            <button type="button" title="Italic" onClick={() => applyFormatting("italic")} style={toolBtnStyle}><i>I</i></button>
            <button type="button" title="Underline" onClick={() => applyFormatting("underline")} style={toolBtnStyle}><u>U</u></button>
          </div>
          <div
            contentEditable
            ref={contentRef}
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
            aria-label="Blog content"
            onInput={handleContentInput}
            suppressContentEditableWarning={true}
            tabIndex={0}
          >{content}</div>
        </div>
        {error && (
          <div style={{ color: "#e63946", fontWeight: 600, marginBottom: 1 }}>{error}</div>
        )}
        <button
          type="submit"
          disabled={submitting}
          style={{
            backgroundColor: "#e63946",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 18,
            padding: "0.81rem 2.2rem",
            cursor: submitting ? "not-allowed" : "pointer",
            marginTop: 12,
            alignSelf: "flex-start",
            boxShadow: "0 1px 6px rgba(44,44,53,0.10)",
            opacity: submitting ? 0.7 : 1
          }}
        >
          {submitting ? "Submitting..." : "Submit Blog"}
        </button>
        {successMsg && (
          <div
            style={{
              color: "#43b57a",
              background: "#7febd564",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 17,
              marginTop: 10,
              padding: "0.55rem 1.5rem"
            }}
          >
            {successMsg}
          </div>
        )}
      </form>
    </main>
  );
}

const labelStyle = {
  display: "block",
  fontWeight: 650,
  color: "var(--text-primary)",
  fontSize: 16,
  marginBottom: 5
};

const inputStyle = {
  width: "100%",
  padding: "0.65rem 1.0rem",
  marginTop: 4,
  borderRadius: 7,
  border: "1.5px solid var(--border-color)",
  fontSize: 15,
  background: "var(--bg-secondary)",
  color: "var(--text-primary)",
  fontWeight: 500
};

const toolBtnStyle = {
  background: "#ececec",
  color: "#222",
  border: "1px solid #ececec",
  borderRadius: 6,
  width: 32,
  height: 32,
  fontWeight: 700,
  fontSize: 18,
  cursor: "pointer",
  outline: "none",
  transition: "background 0.1s"
};

export default BlogEditor;
