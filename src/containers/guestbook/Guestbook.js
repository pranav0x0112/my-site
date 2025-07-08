import React, { useState, useEffect } from "react";
import "./Guestbook.scss";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function Guestbook() {
  const [submitted, setSubmitted] = useState(false);
  const [isAnon, setIsAnon] = useState(false);
  const [entries, setEntries] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  // 🔄 Fetch guestbook entries from Firestore
  useEffect(() => {
    const fetchEntries = async () => {
      const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map((doc) => doc.data());
      setEntries(fetched);
    };

    fetchEntries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      name: isAnon ? "Anonymous" : formData.name,
      message: formData.message,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "guestbook"), newEntry);
      setEntries((prev) => [newEntry, ...prev]);
      setFormData({ name: "", message: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    } catch (err) {
      console.error("Failed to submit entry:", err);
    }
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