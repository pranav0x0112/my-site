import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import amWave from "./am-wave.json";

export default function AMWaveLottie() {
  return (
    <div style={{ background: "#171c28", width: 400, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Player
        autoplay
        loop
        src={amWave}
        style={{ height: "100px", width: "400px" }}
      />
    </div>
  );
}
