import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.scss";

export default function BlogCard({ blog, isDark }) {
  const isInternal = typeof blog.url === "string" && blog.url.startsWith("/blogs");

  const inner = (
    <>
      <h3 className={`blog-title ${isDark ? "small-dark" : ""}`}>{blog.title}</h3>
      <p className={`small ${isDark ? "small-dark" : ""}`}>{blog.description}</p>
      <div className="go-corner">
        <div className="go-arrow">→</div>
      </div>
    </>
  );

  return (
    <div className={`blog-container ${isDark ? "dark-mode" : ""}`}>
      {isInternal ? (
        <Link className={`blog-card blog-card-shadow ${isDark ? "dark-mode" : ""}`} to={blog.url}>
            {inner}
        </Link>
      ) : (
        <a
          className={`blog-card blog-card-shadow ${isDark ? "dark-mode" : ""}`}
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
        >
            {inner}
        </a>
      )}
    </div>
  );
}