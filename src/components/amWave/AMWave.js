import React, { useEffect, useRef, useState } from "react";
import "./AMWave.scss";

const FRAME_COUNT = 299;
const FRAME_PATH = "/assets/AM_Trial_000/";
const FRAME_PREFIX = "AM_Trial_";
const FRAME_PAD = 3;
const FPS = 24;

function pad(num, size) {
  let s = String(num);
  while (s.length < size) s = "0" + s;
  return s;
}

export default function AMWave() {
  const imgsRef = useRef([]);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);

  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [tracks, setTracks] = useState(null);
  const [loading, setLoading] = useState(false);

  // animation (UNCHANGED)
  useEffect(() => {
    function tick(time) {
      if (time - lastTimeRef.current >= 1000 / FPS) {
        const prev = frameRef.current;
        const next = (prev + 1) % FRAME_COUNT;

        const prevImg = imgsRef.current[prev];
        const nextImg = imgsRef.current[next];

        if (prevImg) prevImg.style.opacity = "0";
        if (nextImg) nextImg.style.opacity = "1";

        frameRef.current = next;
        lastTimeRef.current = time;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, []);

  // fetch last.fm once
  async function loadTracks() {
    if (tracks || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/lastfm");
      const data = await res.json();
      setTracks(data.tracks || []);
    } catch {
      setTracks([]);
    } finally {
      setLoading(false);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    setOpen(o => !o);
    loadTracks();
  }

  return (
    <div
      className="am-wave"
      aria-hidden="true"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      {/* SVG frames */}
      {Array.from({ length: FRAME_COUNT }).map((_, i) => (
        <img
          key={i}
          ref={el => (imgsRef.current[i] = el)}
          src={`${FRAME_PATH}${FRAME_PREFIX}${pad(i + 1, FRAME_PAD)}.svg`}
          className="am-wave-svg"
          draggable={false}
          alt=""
          style={{ opacity: i === 0 ? 1 : 0 }}
        />
      ))}

      {/* hover hint */}
      {hover && !open && (
        <div className="am-wave-hint">
          🎧 click to see recent music
        </div>
      )}

      {/* music overlay */}
      {open && (
        <div className="am-wave-music">
          {loading && <div>loading…</div>}
          {!loading && tracks?.length === 0 && (
            <div>no recent tracks</div>
          )}
          {tracks?.map((t, i) => (
            <a
              key={i}
              href={t.url}
              target="_blank"
              rel="noreferrer"
              className="am-track"
            >
              {t.image && <img src={t.image} alt="" />}
              <div>
                <strong>{t.name}</strong>
                <span> - {t.artist}</span>
                {t.nowPlaying && <em> · now playing</em>}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
