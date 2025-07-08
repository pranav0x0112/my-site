import React from "react";
import "./BlogCard.scss";

export default function BlogCard({ blog, isDark }) {
  return (
    <div className={`blog-container ${isDark ? "dark-mode" : ""}`}>
      <a
        className={`blog-card blog-card-shadow ${isDark ? "dark-mode" : ""}`}
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className={`blog-title ${isDark ? "small-dark" : ""}`}>
          {blog.title}
        </h3>
        <p className={`small ${isDark ? "small-dark" : ""}`}>
          {blog.description}
        </p>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </a>
    </div>
  );
}