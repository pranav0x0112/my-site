import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ScrollToTopButton from "../topbutton/Top";
import images from "./images";
import "./Gallery.scss";


export default function Gallery() {
  useEffect(() => {
    // add a body class so the background is uniform for this route
    document.body.classList.add("gallery-bg");
    return () => document.body.classList.remove("gallery-bg");
  }, []);

  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const openLightbox = useCallback(index => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(-1), []);

  const showPrev = useCallback(
    e => {
      e && e.stopPropagation();
      setLightboxIndex(i => (i <= 0 ? images.length - 1 : i - 1));
    },
    []
  );

  const showNext = useCallback(
    e => {
      e && e.stopPropagation();
      setLightboxIndex(i => (i >= images.length - 1 ? 0 : i + 1));
    },
    []
  );

  useEffect(() => {
    if (lightboxIndex >= 0) {
      const onKey = e => {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <>
      <Header />
      <div className="gallery-page main">
        <div className="gallery-inner">
          <h1 className="gallery-title">Gallery</h1>
          <p className="gallery-sub">A small collection of images.</p>

          <div className="gallery-grid">
            {images.map((src, i) => (
              <figure
                key={i}
                className="gallery-item"
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && openLightbox(i)}
              >
                <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>

          {lightboxIndex >= 0 && (
            <div className="lightbox" onClick={closeLightbox} role="presentation">
              <button className="lightbox-close" onClick={e => { e.stopPropagation(); closeLightbox(); }} aria-label="Close">×</button>
              <button className="lightbox-prev" onClick={e => { e.stopPropagation(); showPrev(e); }} aria-label="Previous">‹</button>
              <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
                <img src={images[lightboxIndex]} alt={`Full ${lightboxIndex + 1}`} />
                <div className="lightbox-caption">{`Image ${lightboxIndex + 1}`}</div>
              </div>
              <button className="lightbox-next" onClick={e => { e.stopPropagation(); showNext(e); }} aria-label="Next">›</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
