import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import jsyaml from "js-yaml";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import StyleContext from "../../contexts/StyleContext";
import "highlight.js/styles/github.css";
import "./BlogPost.scss";

export default function BlogPost() {
  const { slug } = useParams();
  const { isDark } = useContext(StyleContext);
  const [meta, setMeta] = useState({});
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tryFetch = async () => {
      const candidates = [`/posts/${slug}.md`, `/posts/${slug}/index.md`];
      let lastErr = null;

      for (const path of candidates) {
        try {
          // debug log to browser console to help diagnose 404s
          // eslint-disable-next-line no-console
          console.log("Trying to fetch post:", path);
          const res = await fetch(path);
          // eslint-disable-next-line no-console
          console.log(`Fetch ${path} status:`, res.status);
          if (!res.ok) {
            lastErr = new Error(`Fetch ${path} returned ${res.status}`);
            continue;
          }
          const text = await res.text();
          // lightweight frontmatter parsing to avoid Node-only gray-matter in browser
          const fmMatch = text.match(/^---\n([\s\S]*?)\n---\n?/);
          if (fmMatch) {
            try {
              const data = jsyaml.load(fmMatch[1]) || {};
              const content = text.slice(fmMatch[0].length);
              setMeta(data);
              setContent(content);
              setLoading(false);
              return;
            } catch (e) {
              console.error("YAML parse error", e);
              // fallthrough to treat entire file as content
            }
          }
          setMeta({});
          setContent(text);
          setLoading(false);
          setLoading(false);
          return;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("Error fetching post", path, err);
          lastErr = err;
        }
      }

      // all candidates failed
      console.error("All post fetch attempts failed", lastErr);
      setMeta({ title: "Post not found" });
      setContent("# Post not found\n\nThe requested post does not exist.");
      setLoading(false);
    };

    tryFetch();
  }, [slug]);

  return (
    <div className={`blog-post-main ${isDark ? "dark-mode" : ""}`}>
      <div className="blog-post-inner">
        <div className="blog-post-container">
          <h1 className="blog-post-title">{meta.title}</h1>
          {meta.date && <p className="blog-post-date">{meta.date}</p>}

          <div className="blog-post-content">
            {!loading && (
              <ReactMarkdown
                children={content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
