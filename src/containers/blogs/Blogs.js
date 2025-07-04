import React, { useState, useEffect, useContext } from "react";
import "./Blog.scss";
import BlogCard from "../../components/blogCard/BlogCard";
import { blogSection } from "../../portfolio";
import { Fade } from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Blogs({ previewMode = false }) {
  const { isDark } = useContext(StyleContext);
  const [mediumBlogs, setMediumBlogs] = useState([]);

  function extractTextContent(html) {
    return typeof html === "string"
      ? html
          .split(/<\/p>/i)
          .map(part => part.split(/<p[^>]*>/i).pop())
          .filter(el => el.trim().length > 0)
          .map(el => el.replace(/<\/?[^>]+(>|$)/g, "").trim())
          .join(" ")
      : "";
  }

  useEffect(() => {
    if (blogSection.displayMediumBlogs === "true") {
      fetch("/blogs.json")
        .then(result => {
          if (result.ok) return result.json();
        })
        .then(response => {
          setMediumBlogs(response.items);
        })
        .catch(error => {
          console.error(
            `${error} (Blogs section could not be displayed. Reverting to hardcoded blogs)`
          );
          setMediumBlogs("Error");
          blogSection.displayMediumBlogs = "false";
        });
    }
  }, []);

  if (!blogSection.display) return null;

  const displayedBlogs =
    blogSection.displayMediumBlogs !== "true" || mediumBlogs === "Error"
      ? blogSection.blogs
      : mediumBlogs.map(blog => ({
          url: blog.link,
          title: blog.title,
          description: extractTextContent(blog.content)
        }));

  const blogsToShow = previewMode ? displayedBlogs.slice(0, 2) : displayedBlogs;

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="blogs">
        <div className="blog-header">
          <h1 className="blog-header-text">{blogSection.title}</h1>
          <p className={isDark ? "dark-mode blog-subtitle" : "subTitle blog-subtitle"}>
            {blogSection.subtitle}
          </p>
        </div>
        <div className="blog-main-div">
          <div className="blog-text-div">
            {blogsToShow.map((blog, i) => (
              <BlogCard key={i} isDark={isDark} blog={blog} />
            ))}
          </div>
        </div>
        {previewMode && (
  <div className="read-more-button project-button">
    <a className="main-button" href="/blogs">
      Read all blogs →
    </a>
  </div>
)}
      </div>
    </Fade>
  );
}