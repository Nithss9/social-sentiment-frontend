import React from "react";

function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full h-[400px] opacity-70 animate-wave"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#1e90ff" />
            <stop offset="100%" stopColor="#8a2be2" />
          </linearGradient>
        </defs>
        <path
          fill="url(#waveGradient)"
          fillOpacity="0.6"
          d="M0,160L60,149.3C120,139,240,117,360,122.7C480,128,600,160,720,170.7C840,181,960,171,1080,154.7C1200,139,1320,117,1380,106.7L1440,96V320H0Z"
        ></path>
      </svg>
    </div>
  );
}

export default WaveBackground;
