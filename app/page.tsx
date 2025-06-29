"use client";
import { useState } from "react";

export default function Home() {
  const [mood, setMood] = useState("");
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");

  const findSong = async () => {
    setError("");
    setVideoUrls([]);
    setCurrentIndex(0);

    if (!mood.trim()) return;  // blank input ignore karega

    const res = await fetch("/api/youtube", {
      method: "POST",
      body: JSON.stringify({ query: mood }),
    });

    const data = await res.json();

    if (data.videoUrls?.length > 0) {
      setVideoUrls(data.videoUrls);
    } else {
      setError("No song found, try another mood.");
    }
  };

  return (
    <div className="container">
      <h2>Type your mood or situation:</h2>
      <input
        type="text"
        placeholder="e.g., Feeling energetic..."
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <button onClick={findSong}>Find Song</button>

      {error && <p style={{ color: "yellow" }}>{error}</p>}

      {videoUrls.length > 0 && (
        <div style={{ marginTop: "20px", position: "relative" }}>
          <button
            style={{ position: "absolute", left: 0, top: "40%", zIndex: 2 }}
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + videoUrls.length) % videoUrls.length)
            }
          >
            {"<"}
          </button>

          <iframe
            width="100%"
            height="300"
            src={`https://www.youtube.com/embed/${new URL(videoUrls[currentIndex]).searchParams.get("v")}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>

          <button
            style={{ position: "absolute", right: 0, top: "40%", zIndex: 2 }}
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % videoUrls.length)
            }
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
}
