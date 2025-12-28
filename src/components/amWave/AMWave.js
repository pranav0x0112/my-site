import React, { useEffect, useRef, useState } from "react";
import "./AMWave.scss";

const FRAME_COUNT = 299;
const FRAME_PATH = "/assets/AM_Trial_000/";
const FRAME_PREFIX = "AM_Trial_";
const FRAME_PAD = 3; // Number of digits in the frame number, e.g., 001

function pad(num, size) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export default function AMWave() {
  const [frame, setFrame] = useState(1);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFrame(f => (f % FRAME_COUNT) + 1);
    }, 1000 / 24); // 24 FPS
    return () => clearInterval(intervalRef.current);
  }, []);

  const frameNum = pad(frame, FRAME_PAD);
  const src = `${FRAME_PATH}${FRAME_PREFIX}${frameNum}.svg`;

  return (
    <div className="am-wave" aria-hidden="true">
      <img
        src={src}
        alt="AM Wave Animation"
        className="am-wave-svg"
        draggable={false}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
