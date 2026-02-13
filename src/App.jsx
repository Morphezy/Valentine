import "./App.css";
import Hearts from "./Hearts";
import Place from "./Place";
import { useEffect, useRef, useState } from "react";
function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/CAS.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.1;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((error) => console.log("Error:", error));
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <button
        onClick={toggleMusic}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "10px 15px",
          fontSize: "16px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        {isPlaying ? "🔊 Музыка вкл" : "🔇 Музыка выкл"}
      </button>
      <Place></Place>

      <Hearts />
    </>
  );
}

export default App;
