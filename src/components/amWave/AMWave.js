import React, { useEffect, useRef } from "react";
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

  return (
    <div className="am-wave" aria-hidden="true">
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
    </div>
  );
}
