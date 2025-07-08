import React, { useState, useEffect } from "react";
import "./Guestbook.scss";

export default function Guestbook() {
  const [submitted, setSubmitted] = useState(false);
  const [isAnon, setIsAnon] = useState(false);
  const [entries, setEntries] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  // Load existing entries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("guestbookEntries");
    setEntries(stored ? JSON.parse(stored) : []);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      name: isAnon ? "Anonymous" : formData.name,
      message: formData.message,
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("guestbookEntries", JSON.stringify(updatedEntries));

    setFormData({ name: "", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="guestbook">
      <h1>Guestbook</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {!isAnon && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <label className="anon-toggle">
            <input
              type="checkbox"
              checked={isAnon}
              onChange={() => setIsAnon(!isAnon)}
            />
            Post as anonymous
          </label>

          <textarea
            name="message"
            placeholder="Share your thoughts here..."
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign</button>
        </form>
      ) : (
        <p>Thanks for signing, friend!</p>
      )}

      <h2 className="log-title">Messages from visitors</h2>
      <div className="guestbook-log">
        {entries.map((entry, i) => (
          <div className="guestbook-entry" key={i}>
            <strong>{entry.name}:</strong> {entry.message}
          </div>
        ))}
      </div>
    </div>
  );
}