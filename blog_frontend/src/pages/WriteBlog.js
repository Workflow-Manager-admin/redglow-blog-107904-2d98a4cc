import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * WriteBlog page: allows logged-in users to compose and submit new blog posts.
 * Layout: title input, author (from user), date, image upload, rich text editor, submit button.
 */
function WriteBlog({ user }) {
  const [title, setTitle] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const fileInputRef = useRef();
  const navigate = useNavigate();

  // System date: current date in YYYY-MM-DD for display
  const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const author = user?.username || "—";

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreviewUrl(reader.result);
    reader.readAsDataURL(file);
  }

  // Rich Text Editor commands
  function format(command) {
    document.execCommand(command, false, null);
  }

  function handleInput(e) {
    setBodyHtml(e.currentTarget.innerHTML);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !bodyHtml.trim()) {
      setFeedback("Title and blog content cannot be empty.");
      return;
    }
    setSubmitting(true);

    // Prepare form data so image can also be sent
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", bodyHtml);
    if (image) formData.append("image", image);

    // Get JWT if present (simple demo: try from local storage)
    const token = window.localStorage.getItem("token");
    try {
      // Try to POST to backend /api/posts; fallback if image field unsupported
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token || ''}`, // If not present, will fail (should redirect to login)
        },
        body: formData,
      });
      if (!response.ok) {
        let data = {};
        try { data = await response.json(); } catch {}
        throw new Error(data.message || "Publish failed. Please try again.");
      }
      setFeedback("Blog published! Redirecting...");
      setTimeout(() => {
        setSubmitting(false);
        // After success, return to home page (or blog list)
        navigate("/");
      }, 1100);
    } catch (err) {
      setFeedback(err.message || "Error! Could not submit blog.");
      setSubmitting(false);
    }
  };

  // Editor toolbar button styles
  const btnStyle = {
    background: "#e6e6e6",
    color: "#444",
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "0 5px",
    padding: "2px 10px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: 700
  };

  return (
    <div
      style={{
        background: "var(--bg-primary)",
        minHeight: "calc(100vh - 72px)",
        padding: "2.4rem 0.8rem 4rem 0.8rem",
        display: "flex", justifyContent: "center", alignItems: "flex-start"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          maxWidth: 520,
          width: "100%",
          borderRadius: 16,
          boxShadow: "0 2px 16px rgba(44,44,53,0.055)",
          padding: "2.3rem 2rem 2.1rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.4rem"
        }}
        encType="multipart/form-data"
      >
        <h2 style={{ color: "#e63946", margin: 0, fontWeight: 800, fontSize: "2rem", letterSpacing: ".01em" }}>
          Write Blog Post
        </h2>
        <label style={{ fontWeight: 700, fontSize: "1.08rem", marginBottom: 2 }}>Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title of your blog..."
          required
          style={{
            padding: "0.85rem 1rem",
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid var(--border-color)",
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
            marginBottom: 5
          }}
        />
        <div style={{ display: "flex", gap: "1rem", fontSize: "0.98rem" }}>
          <div>Author: <b>{author}</b></div>
          <div style={{ color: "var(--text-secondary)" }}>{dateStr}</div>
        </div>
        {/* Image Upload */}
        <label style={{ fontWeight: 700, fontSize: "1.08rem", marginTop: 5 }}>Attach Feature Image:</label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ marginBottom: imagePreviewUrl ? 0 : 15 }}
        />
        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Preview"
            style={{ maxWidth: 150, marginTop: 7, marginBottom: 5, borderRadius: 8, border: "1px solid #eee" }}
          />
        )}
        {/* Rich Text Editor */}
        <label style={{ fontWeight: 700, fontSize: "1.08rem" }}>Blog Content:</label>
        <div style={{ marginBottom: 7 }}>
          <button type="button" style={btnStyle} onClick={() => format("bold")} title="Bold"><b>B</b></button>
          <button type="button" style={btnStyle} onClick={() => format("italic")} title="Italic"><i>I</i></button>
          <button type="button" style={btnStyle} onClick={() => format("underline")} title="Underline"><u>U</u></button>
        </div>
        <div
          contentEditable
          suppressContentEditableWarning
          aria-label="Blog Content"
          style={{
            background: "#fff",
            color: "#23242b",
            border: "1.5px solid var(--border-color)",
            minHeight: "9.5rem",
            borderRadius: 8,
            padding: "0.86rem 1rem",
            fontSize: "1.07rem",
            marginBottom: 18,
            outline: "none",
            maxHeight: 290,
            overflowY: "auto"
          }}
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "0.77rem 2rem",
            border: "none",
            borderRadius: 24,
            background: "#e63946",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.17rem",
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.7 : 1,
            marginTop: 5
          }}
        >
          {submitting ? "Publishing..." : "Publish"}
        </button>
        {feedback && (
          <div style={{ color: feedback.startsWith("Blog") ? "green" : "#e63946", marginTop: 6, fontWeight: 600 }}>
            {feedback}
          </div>
        )}
      </form>
    </div>
  );
}

export default WriteBlog;
