import React, { useState } from "react";
import axios from "axios";
import WaveBackground from "./WaveBackground";

import { motion } from "framer-motion";

function FloatingEmojis() {
  const emojis = [
    "😀", "😄", "😁", "🥰", "😍", "😊", "🤩", "😎", "😇", "🙂",
    "😉", "😌", "😢", "😭", "😔", "😞", "😩", "😡", "😤", "🤔",
    "🤯", "🤡", "🥳", "😱", "😴", "😜", "🤗", "🤨", "😏", "🤤",
    "😂", "🤣", "🤓", "🤠", "😈", "👻", "💀", "🤖", "🎃", "🫶"
  ];

  const moods = ["happy", "sad", "angry", "cool", "thinking", "calm", "party"];

  const positions = [];
  const rows = 5;
  const cols = 8;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const top = 10 + r * 15 + Math.random() * 4;
      const left = 5 + c * 11 + Math.random() * 2;
      positions.push({ top, left });
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((emoji, i) => {
        const pos = positions[i % positions.length];
        const delay = Math.random() * 5;
        const duration = 6 + Math.random() * 4;
        const drift = 10 + Math.random() * 6;
        const mood = moods[Math.floor(Math.random() * moods.length)];

        // Hover reactions (framer motion)
        const hoverVariants = {
          happy: { scale: 1.3, y: -15, rotate: 5 },
          sad: { scale: 1.1, y: 8, opacity: 0.8 },
          angry: { rotate: [0, 10, -10, 10, -10, 0], transition: { duration: 0.5 } },
          cool: { rotate: 10, scale: 1.2 },
          thinking: { scale: 1.15, rotate: -5 },
          calm: { scale: 1.1, opacity: 1 },
          party: { rotate: [0, 360], transition: { duration: 0.8 } },
        };

        return (
          <motion.div
            key={i}
            className={`absolute text-6xl sm:text-7xl opacity-90 glow-${mood} animate-float-drift pointer-events-auto`}
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s, ${drift}s`,
            }}
            whileHover={hoverVariants[mood]} // 👈 Physics-based hover animation
            transition={{ type: "spring", stiffness: 150, damping: 10 }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </div>
  );
}




function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const analyzeSentiment = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post("https://social-sentiment-backend.onrender.com/analyze", { text });

      setResult(res.data.sentiment);
    } catch (error) {
      console.error("Error:", error);
      setResult("Server not reachable");
    }
  };

  return (
    <div className="relative h-screen flex flex-col justify-center items-center text-white text-center font-sans">
      <FloatingEmojis />
      <WaveBackground />

      <div className="bg-[#101c4d]/70 backdrop-blur-lg rounded-3xl p-10 w-[90%] sm:w-[600px] shadow-2xl border border-blue-400/30 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 tracking-wide drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400">
          SOCIAL MEDIA SENTIMENT ANALYZER
        </h1>
        <p className="text-sm text-blue-300 mb-8">
          Real-time Social Sentiment Analysis
        </p>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or hashtag..."
          className="w-full px-5 py-3 text-black rounded-full focus:outline-none border border-blue-400 shadow-inner"
        />

        <button
          onClick={analyzeSentiment}
          className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Analyze
        </button>

        {result && (
          <h2 className="mt-6 text-lg">
            Sentiment:{" "}
            <span
              className={
                result === "positive"
                  ? "text-green-400"
                  : result === "negative"
                  ? "text-red-400"
                  : "text-yellow-400"
              }
            >
              {result}
            </span>
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
