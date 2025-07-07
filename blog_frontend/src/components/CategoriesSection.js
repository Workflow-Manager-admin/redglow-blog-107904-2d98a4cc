/**
 * PUBLIC_INTERFACE
 * CategoriesSection renders filter buttons for blog categories.
 * Props:
 *   categories (array of strings): category names
 *   currentCategory (string): active/selected category
 *   onSelect (function): callback when a category is selected
 */
import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * CategoriesSection renders filter buttons for blog categories.
 * Props:
 *   categories (array of strings): category names
 *   currentCategory (string): active/selected category
 *   onSelect (function): callback when a category is selected
 */
function CategoriesSection({ categories, currentCategory, onSelect, loading }) {
  // Mounting logic for entrance animation (slide in from right)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(timeout);
    }
    setMounted(false);
  }, [loading]);

  if (loading) {
    // Soft skeleton loader demo
    return (
      <div style={{
        display: "flex", gap: 15, margin: "2.3rem 0 1.5rem 0", flexWrap: "wrap"
      }}>
        {Array.from({ length: categories.length }).map((_, i) => (
          <div key={i} className="skeleton-loader"
            style={{
              width: 96, height: 36, borderRadius: 24,
              background: "var(--bg-secondary)",
            }} />
        ))}
      </div>
    );
  }
  return (
    <div
      className={
        "categories-section categories-section-entrance" +
        (mounted ? " categories-section-entrance--mounted" : "")
      }
      style={{
        display: "flex",
        gap: 17,
        margin: "2.3rem 0 1.8rem 0",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
      aria-label="Blog categories"
    >
      {categories.map((cat) => {
        const selected = currentCategory === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            style={{
              background: selected ? "#e63946" : "var(--bg-secondary)",
              color: selected ? "#fff" : "#282c34",
              fontWeight: selected ? 800 : 600,
              fontSize: "1.03rem",
              border: selected
                ? "2px solid #e63946"
                : "1.5px solid var(--border-color)",
              borderRadius: 24,
              padding: "0.62em 1.9em",
              boxShadow: selected
                ? "0 2px 8px rgba(230,57,70,0.13)"
                : "0 1px 6px rgba(44,44,53,0.07)",
              marginBottom: 4,
              cursor: "pointer",
              outline: selected ? "2px solid #e63946" : "none",
              transition:
                "all 0.16s cubic-bezier(0.44,0.03,0.21,0.99), outline 0.12s",
              letterSpacing: ".01em",
            }}
            aria-pressed={selected}
            aria-label={`Show ${cat} blogs`}
          >
            {cat === "LifeStyle" ? "Lifestyle" : cat}
          </button>
        );
      })}
    </div>
  );
}

export default CategoriesSection;
