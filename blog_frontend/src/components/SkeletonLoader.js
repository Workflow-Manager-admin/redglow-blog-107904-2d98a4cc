import React from "react";

/**
 * PUBLIC_INTERFACE
 * SkeletonLoader – Soft generic skeleton/surface animation for subtle loading indication.
 * Accepts width, height, borderRadius and className for style customization.
 * Children can be used for more complex skeletons.
 */
function SkeletonLoader({
  width = "100%",
  height = "1.6em",
  borderRadius = 8,
  className = "",
  style = {},
  children
}) {
  // Uses a gentle shimmer animation and theme-aware background.
  return (
    <div
      className={`skeleton-loader ${className}`}
      style={{
        width,
        height,
        borderRadius,
        background: "var(--bg-secondary)",
        overflow: "hidden",
        position: "relative",
        ...style
      }}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="skeleton-shimmer" />
      {children}
      {/* CSS for animation is in App.css */}
    </div>
  );
}

export default SkeletonLoader;
